// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IPumpPair.sol";

contract PumpPair is IPumpPair, ERC20, ReentrancyGuard, Ownable {
    address public factory;
    address public token;
    address public creator;

    uint256 public reserveOKB;
    uint256 public reserveToken;

    uint256 public constant CREATION_FEE = 1 * 10**18; // 1 OKB
    uint256 public constant MIGRATION_THRESHOLD = 80 * 10**18; // 80 OKB
    uint256 public constant LOCKED_LIQUIDITY = 36 * 10**18; // 36 OKB permanently locked

    bool public migrated = false;
    address public dexRouter;

    // Bonding curve parameters
    uint256 public constant INITIAL_PRICE = 0.0001 * 10**18; // 0.0001 OKB per token
    uint256 public constant PRICE_MULTIPLIER = 1000000; // For exponential curve

    event TokenPurchase(address indexed buyer, uint256 amountIn, uint256 amountOut);
    event TokenSale(address indexed seller, uint256 amountIn, uint256 amountOut);
    event DEXMigration(address indexed token, uint256 okbAmount, uint256 tokenAmount);

    constructor() ERC20("Pump Token", "PUMP") {}

    function initialize(
        string memory name,
        string memory symbol,
        address _creator,
        address _factory
    ) external {
        require(factory == address(0), "PumpPair: ALREADY_INITIALIZED");
        factory = _factory;
        creator = _creator;

        // Mint initial supply to the pair
        _mint(address(this), 1000000 * 10**18); // 1M tokens
        reserveToken = 1000000 * 10**18;
    }

    function getTokenPrice(uint256 amount) public view returns (uint256) {
        if (reserveToken == 0) return INITIAL_PRICE;
        uint256 currentSupply = totalSupply() - balanceOf(address(this));
        return (currentSupply * currentSupply * INITIAL_PRICE) / (PRICE_MULTIPLIER * PRICE_MULTIPLIER);
    }

    function getOKBPrice(uint256 amount) public view returns (uint256) {
        if (reserveOKB == 0) return INITIAL_PRICE;
        uint256 currentSupply = totalSupply() - balanceOf(address(this));
        return (currentSupply * currentSupply * INITIAL_PRICE) / (PRICE_MULTIPLIER * PRICE_MULTIPLIER);
    }

    function buy(uint256 minAmountOut) external payable nonReentrant returns (uint256 amountOut) {
        require(!migrated, "PumpPair: MIGRATED_TO_DEX");
        require(msg.value > 0, "PumpPair: INSUFFICIENT_INPUT");

        uint256 okbAmount = msg.value;
        uint256 fee = (okbAmount * 5) / 100; // 5% fee
        uint256 okbAfterFee = okbAmount - fee;

        // Calculate tokens to mint based on bonding curve
        uint256 currentSupply = totalSupply() - balanceOf(address(this));
        uint256 newSupply = currentSupply + (okbAfterFee * PRICE_MULTIPLIER) / INITIAL_PRICE;
        amountOut = newSupply - currentSupply;

        require(amountOut >= minAmountOut, "PumpPair: INSUFFICIENT_OUTPUT");
        require(amountOut <= balanceOf(address(this)), "PumpPair: INSUFFICIENT_LIQUIDITY");

        // Update reserves
        reserveOKB += okbAfterFee;
        reserveToken -= amountOut;

        // Transfer tokens to buyer
        _transfer(address(this), msg.sender, amountOut);

        // Distribute fee
        payable(IPumpFactory(factory).feeTo()).transfer(fee);

        emit TokenPurchase(msg.sender, okbAmount, amountOut);
    }

    function sell(uint256 amountIn, uint256 minAmountOut) external nonReentrant returns (uint256 amountOut) {
        require(!migrated, "PumpPair: MIGRATED_TO_DEX");
        require(amountIn > 0, "PumpPair: INSUFFICIENT_INPUT");
        require(balanceOf(msg.sender) >= amountIn, "PumpPair: INSUFFICIENT_BALANCE");

        // Calculate OKB to return based on bonding curve
        uint256 currentSupply = totalSupply() - balanceOf(address(this));
        uint256 newSupply = currentSupply - amountIn;
        uint256 totalValue = (currentSupply * currentSupply * INITIAL_PRICE) / (PRICE_MULTIPLIER * PRICE_MULTIPLIER);
        uint256 newValue = (newSupply * newSupply * INITIAL_PRICE) / (PRICE_MULTIPLIER * PRICE_MULTIPLIER);
        amountOut = totalValue - newValue;

        uint256 fee = (amountOut * 5) / 100; // 5% fee
        amountOut = amountOut - fee;

        require(amountOut >= minAmountOut, "PumpPair: INSUFFICIENT_OUTPUT");

        // Update reserves
        reserveOKB -= amountOut;
        reserveToken += amountIn;

        // Transfer tokens from seller
        _transfer(msg.sender, address(this), amountIn);

        // Send OKB to seller
        payable(msg.sender).transfer(amountOut);

        // Distribute fee
        payable(IPumpFactory(factory).feeTo()).transfer(fee);

        emit TokenSale(msg.sender, amountIn, amountOut);
    }

    function canMigrate() public view returns (bool) {
        return !migrated && reserveOKB >= MIGRATION_THRESHOLD;
    }

    function migrateToDEX() external nonReentrant returns (bool) {
        require(canMigrate(), "PumpPair: CANNOT_MIGRATE");
        require(msg.sender == creator || msg.sender == owner(), "PumpPair: UNAUTHORIZED");

        migrated = true;

        uint256 okbToMigrate = reserveOKB - LOCKED_LIQUIDITY;
        uint256 tokenToMigrate = reserveToken;

        // Here we would integrate with DEX (OkieSwap/Uniswap)
        // For now, we'll emit the event and lock the liquidity

        emit DEXMigration(address(this), okbToMigrate, tokenToMigrate);

        return true;
    }

    function emergencyWithdraw() external {
        require(msg.sender == creator || msg.sender == owner(), "PumpPair: UNAUTHORIZED");
        require(!migrated, "PumpPair: ALREADY_MIGRATED");

        // Emergency withdrawal of remaining OKB
        uint256 withdrawAmount = reserveOKB;
        reserveOKB = 0;

        payable(creator).transfer(withdrawAmount);
    }

    receive() external payable {}
}
