// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IPumpFactory.sol";
import "./interfaces/IPumpPair.sol";

contract PumpRouter is ReentrancyGuard, Ownable {
    address public factory;
    address public feeDistributor;

    uint256 public constant FEE_PERCENTAGE = 500; // 5% = 500/10000
    uint256 public constant FEE_DENOMINATOR = 10000;

    event Swap(address indexed user, address indexed pair, uint256 amountIn, uint256 amountOut, bool isBuy);

    constructor(address _factory, address _feeDistributor) {
        factory = _factory;
        feeDistributor = _feeDistributor;
    }

    function buyTokens(
        address pair,
        uint256 minAmountOut
    ) external payable nonReentrant returns (uint256 amountOut) {
        require(msg.value > 0, "PumpRouter: INSUFFICIENT_INPUT");

        IPumpPair pumpPair = IPumpPair(pair);
        require(!pumpPair.migrated(), "PumpRouter: PAIR_MIGRATED");

        // Calculate fee
        uint256 fee = (msg.value * FEE_PERCENTAGE) / FEE_DENOMINATOR;
        uint256 amountIn = msg.value - fee;

        // Execute buy on the pair
        amountOut = pumpPair.buy{value: amountIn}(minAmountOut);

        // Transfer fee to distributor
        payable(feeDistributor).transfer(fee);

        emit Swap(msg.sender, pair, msg.value, amountOut, true);
    }

    function sellTokens(
        address pair,
        uint256 amountIn,
        uint256 minAmountOut
    ) external nonReentrant returns (uint256 amountOut) {
        require(amountIn > 0, "PumpRouter: INSUFFICIENT_INPUT");

        IPumpPair pumpPair = IPumpPair(pair);
        require(!pumpPair.migrated(), "PumpRouter: PAIR_MIGRATED");

        // Check allowance
        require(pumpPair.allowance(msg.sender, address(this)) >= amountIn, "PumpRouter: INSUFFICIENT_ALLOWANCE");

        // Transfer tokens to router
        pumpPair.transferFrom(msg.sender, address(this), amountIn);

        // Approve pair to spend tokens
        pumpPair.approve(pair, amountIn);

        // Execute sell on the pair
        amountOut = IPumpPair(pair).sell(amountIn, minAmountOut);

        emit Swap(msg.sender, pair, amountIn, amountOut, false);
    }

    function getBuyPrice(address pair, uint256 okbAmount) external view returns (uint256) {
        IPumpPair pumpPair = IPumpPair(pair);
        uint256 fee = (okbAmount * FEE_PERCENTAGE) / FEE_DENOMINATOR;
        uint256 amountAfterFee = okbAmount - fee;

        return pumpPair.getTokenPrice(amountAfterFee);
    }

    function getSellPrice(address pair, uint256 tokenAmount) external view returns (uint256) {
        IPumpPair pumpPair = IPumpPair(pair);
        return pumpPair.getOKBPrice(tokenAmount);
    }

    function createToken(
        string memory name,
        string memory symbol
    ) external returns (address pair) {
        IPumpFactory pumpFactory = IPumpFactory(factory);
        pair = pumpFactory.createPair(name, symbol, msg.sender);
    }

    function migrateToDEX(address pair) external returns (bool) {
        IPumpPair pumpPair = IPumpPair(pair);
        require(pumpPair.creator() == msg.sender, "PumpRouter: UNAUTHORIZED");

        return pumpPair.migrateToDEX();
    }

    function canMigrate(address pair) external view returns (bool) {
        return IPumpPair(pair).canMigrate();
    }

    function getPairInfo(address pair) external view returns (
        address token,
        address creator,
        uint256 reserveOKB,
        uint256 reserveToken,
        bool migrated
    ) {
        IPumpPair pumpPair = IPumpPair(pair);
        return (
            pumpPair.token(),
            pumpPair.creator(),
            pumpPair.reserveOKB(),
            pumpPair.reserveToken(),
            pumpPair.migrated()
        );
    }

    function setFeeDistributor(address _feeDistributor) external onlyOwner {
        feeDistributor = _feeDistributor;
    }

    function setFactory(address _factory) external onlyOwner {
        factory = _factory;
    }

    receive() external payable {}
}
