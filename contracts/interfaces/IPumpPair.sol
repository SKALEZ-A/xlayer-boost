// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPumpPair {
    event TokenPurchase(address indexed buyer, uint256 amountIn, uint256 amountOut);
    event TokenSale(address indexed seller, uint256 amountIn, uint256 amountOut);
    event DEXMigration(address indexed token, uint256 okbAmount, uint256 tokenAmount);

    function factory() external view returns (address);
    function token() external view returns (address);
    function creator() external view returns (address);

    function totalSupply() external view returns (uint256);
    function reserveOKB() external view returns (uint256);
    function reserveToken() external view returns (uint256);

    function getTokenPrice(uint256 amount) external view returns (uint256);
    function getOKBPrice(uint256 amount) external view returns (uint256);

    function buy(uint256 minAmountOut) external payable returns (uint256 amountOut);
    function sell(uint256 amountIn, uint256 minAmountOut) external returns (uint256 amountOut);

    function migrateToDEX() external returns (bool);
    function canMigrate() external view returns (bool);

    // Emergency functions
    function emergencyWithdraw() external;
}
