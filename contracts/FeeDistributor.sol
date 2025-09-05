// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeeDistributor is ReentrancyGuard, Ownable {
    // Fee distribution percentages (in basis points, 100 = 1%)
    uint256 public constant PLATFORM_FEE = 2000; // 20%
    uint256 public constant CREATOR_FEE = 3000;  // 30%
    uint256 public constant REFERRER_FEE = 1000; // 10%
    uint256 public constant LIQUIDITY_FEE = 4000; // 40%

    uint256 public constant TOTAL_FEE = 10000; // 100%

    address public router;
    address public platformWallet;

    // Mapping of creators to their accumulated fees
    mapping(address => uint256) public creatorFees;
    // Mapping of referrers to their accumulated fees
    mapping(address => uint256) public referrerFees;

    // Mapping of token pairs to their creators
    mapping(address => address) public pairCreators;
    // Mapping of users to their referrers
    mapping(address => address) public userReferrers;

    event FeeDistributed(
        address indexed pair,
        uint256 totalFee,
        uint256 platformFee,
        uint256 creatorFee,
        uint256 referrerFee,
        uint256 liquidityFee
    );

    event FeeWithdrawn(address indexed user, uint256 amount, uint8 feeType);
    event ReferrerSet(address indexed user, address indexed referrer);

    modifier onlyRouter() {
        require(msg.sender == router, "FeeDistributor: ONLY_ROUTER");
        _;
    }

    constructor(address _platformWallet) {
        platformWallet = _platformWallet;
    }

    function distributeFees(
        address pair,
        uint256 totalFee
    ) external payable onlyRouter nonReentrant {
        require(totalFee > 0, "FeeDistributor: ZERO_FEE");
        require(msg.value >= totalFee, "FeeDistributor: INSUFFICIENT_FUNDS");

        address creator = pairCreators[pair];
        require(creator != address(0), "FeeDistributor: UNKNOWN_CREATOR");

        // Calculate fee distribution
        uint256 platformFee = (totalFee * PLATFORM_FEE) / TOTAL_FEE;
        uint256 creatorFee = (totalFee * CREATOR_FEE) / TOTAL_FEE;
        uint256 liquidityFee = (totalFee * LIQUIDITY_FEE) / TOTAL_FEE;

        // Platform fee goes directly to platform wallet
        payable(platformWallet).transfer(platformFee);

        // Creator fee accumulates
        creatorFees[creator] += creatorFee;

        // Liquidity fee is kept for DEX migration
        // (will be used when migrating to DEX)

        emit FeeDistributed(
            pair,
            totalFee,
            platformFee,
            creatorFee,
            0, // referrer fee (handled separately)
            liquidityFee
        );
    }

    function distributeReferralFee(
        address user,
        uint256 totalFee
    ) external payable onlyRouter nonReentrant {
        address referrer = userReferrers[user];
        if (referrer == address(0)) return;

        uint256 referrerFee = (totalFee * REFERRER_FEE) / TOTAL_FEE;
        referrerFees[referrer] += referrerFee;
    }

    function setPairCreator(address pair, address creator) external onlyRouter {
        pairCreators[pair] = creator;
    }

    function setReferrer(address user, address referrer) external {
        require(userReferrers[user] == address(0), "FeeDistributor: REFERRER_ALREADY_SET");
        require(referrer != user, "FeeDistributor: CANNOT_REFER_SELF");
        require(referrer != address(0), "FeeDistributor: INVALID_REFERRER");

        userReferrers[user] = referrer;
        emit ReferrerSet(user, referrer);
    }

    function withdrawCreatorFees() external nonReentrant {
        uint256 amount = creatorFees[msg.sender];
        require(amount > 0, "FeeDistributor: NO_FEES_AVAILABLE");

        creatorFees[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit FeeWithdrawn(msg.sender, amount, 1); // 1 = creator fee
    }

    function withdrawReferrerFees() external nonReentrant {
        uint256 amount = referrerFees[msg.sender];
        require(amount > 0, "FeeDistributor: NO_FEES_AVAILABLE");

        referrerFees[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit FeeWithdrawn(msg.sender, amount, 2); // 2 = referrer fee
    }

    function getPendingFees(address user) external view returns (uint256 creatorFee, uint256 referrerFee) {
        return (creatorFees[user], referrerFees[user]);
    }

    function setPlatformWallet(address _platformWallet) external onlyOwner {
        platformWallet = _platformWallet;
    }

    function setRouter(address _router) external onlyOwner {
        router = _router;
    }

    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "FeeDistributor: NO_FUNDS");

        payable(owner()).transfer(balance);
    }

    receive() external payable {}
}
