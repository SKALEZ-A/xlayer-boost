// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPumpFactory {
    event PairCreated(address indexed token, address indexed pair, uint256);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);
    function getPair(address token) external view returns (address pair);
    function allPairs(uint256) external view returns (address pair);
    function allPairsLength() external view returns (uint256);
    function pairCodeHash() external pure returns (bytes32);

    function createPair(
        string memory name,
        string memory symbol,
        address creator
    ) external returns (address pair);

    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}
