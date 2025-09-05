// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityLocker is ReentrancyGuard, Ownable {
    struct LockInfo {
        address token;
        address beneficiary;
        uint256 amount;
        uint256 lockTime;
        uint256 unlockTime;
        bool released;
    }

    mapping(uint256 => LockInfo) public locks;
    uint256 public nextLockId = 1;

    // Minimum lock duration (30 days)
    uint256 public constant MIN_LOCK_DURATION = 30 days;
    // Maximum lock duration (2 years)
    uint256 public constant MAX_LOCK_DURATION = 730 days;

    event LiquidityLocked(
        uint256 indexed lockId,
        address indexed token,
        address indexed beneficiary,
        uint256 amount,
        uint256 unlockTime
    );

    event LiquidityReleased(
        uint256 indexed lockId,
        address indexed beneficiary,
        uint256 amount
    );

    function lockLiquidity(
        address token,
        address beneficiary,
        uint256 amount,
        uint256 lockDuration
    ) external nonReentrant returns (uint256 lockId) {
        require(amount > 0, "LiquidityLocker: ZERO_AMOUNT");
        require(beneficiary != address(0), "LiquidityLocker: INVALID_BENEFICIARY");
        require(
            lockDuration >= MIN_LOCK_DURATION && lockDuration <= MAX_LOCK_DURATION,
            "LiquidityLocker: INVALID_DURATION"
        );

        // Transfer tokens to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        uint256 unlockTime = block.timestamp + lockDuration;

        lockId = nextLockId++;
        locks[lockId] = LockInfo({
            token: token,
            beneficiary: beneficiary,
            amount: amount,
            lockTime: block.timestamp,
            unlockTime: unlockTime,
            released: false
        });

        emit LiquidityLocked(lockId, token, beneficiary, amount, unlockTime);
    }

    function releaseLiquidity(uint256 lockId) external nonReentrant {
        LockInfo storage lockInfo = locks[lockId];
        require(lockInfo.amount > 0, "LiquidityLocker: LOCK_NOT_EXISTS");
        require(!lockInfo.released, "LiquidityLocker: ALREADY_RELEASED");
        require(block.timestamp >= lockInfo.unlockTime, "LiquidityLocker: STILL_LOCKED");
        require(
            msg.sender == lockInfo.beneficiary || msg.sender == owner(),
            "LiquidityLocker: UNAUTHORIZED"
        );

        lockInfo.released = true;
        IERC20(lockInfo.token).transfer(lockInfo.beneficiary, lockInfo.amount);

        emit LiquidityReleased(lockId, lockInfo.beneficiary, lockInfo.amount);
    }

    function getLockInfo(uint256 lockId) external view returns (
        address token,
        address beneficiary,
        uint256 amount,
        uint256 lockTime,
        uint256 unlockTime,
        bool released
    ) {
        LockInfo memory lockInfo = locks[lockId];
        return (
            lockInfo.token,
            lockInfo.beneficiary,
            lockInfo.amount,
            lockInfo.lockTime,
            lockInfo.unlockTime,
            lockInfo.released
        );
    }

    function getRemainingTime(uint256 lockId) external view returns (uint256) {
        LockInfo memory lockInfo = locks[lockId];
        if (block.timestamp >= lockInfo.unlockTime) {
            return 0;
        }
        return lockInfo.unlockTime - block.timestamp;
    }

    function emergencyRelease(uint256 lockId) external onlyOwner {
        LockInfo storage lockInfo = locks[lockId];
        require(lockInfo.amount > 0, "LiquidityLocker: LOCK_NOT_EXISTS");
        require(!lockInfo.released, "LiquidityLocker: ALREADY_RELEASED");

        lockInfo.released = true;
        IERC20(lockInfo.token).transfer(lockInfo.beneficiary, lockInfo.amount);

        emit LiquidityReleased(lockId, lockInfo.beneficiary, lockInfo.amount);
    }

    function extendLock(uint256 lockId, uint256 additionalTime) external {
        LockInfo storage lockInfo = locks[lockId];
        require(lockInfo.amount > 0, "LiquidityLocker: LOCK_NOT_EXISTS");
        require(!lockInfo.released, "LiquidityLocker: ALREADY_RELEASED");
        require(
            msg.sender == lockInfo.beneficiary || msg.sender == owner(),
            "LiquidityLocker: UNAUTHORIZED"
        );
        require(
            additionalTime > 0 && lockInfo.unlockTime + additionalTime <= block.timestamp + MAX_LOCK_DURATION,
            "LiquidityLocker: INVALID_EXTENSION"
        );

        lockInfo.unlockTime += additionalTime;
    }

    function batchLockLiquidity(
        address[] memory tokens,
        address[] memory beneficiaries,
        uint256[] memory amounts,
        uint256[] memory lockDurations
    ) external returns (uint256[] memory lockIds) {
        require(
            tokens.length == beneficiaries.length &&
            tokens.length == amounts.length &&
            tokens.length == lockDurations.length,
            "LiquidityLocker: ARRAY_LENGTH_MISMATCH"
        );

        lockIds = new uint256[](tokens.length);

        for (uint256 i = 0; i < tokens.length; i++) {
            lockIds[i] = lockLiquidity(
                tokens[i],
                beneficiaries[i],
                amounts[i],
                lockDurations[i]
            );
        }
    }

    function batchReleaseLiquidity(uint256[] memory lockIds) external {
        for (uint256 i = 0; i < lockIds.length; i++) {
            releaseLiquidity(lockIds[i]);
        }
    }
}

// Minimal ERC20 interface
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}
