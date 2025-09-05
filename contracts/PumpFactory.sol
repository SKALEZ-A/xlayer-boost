// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPumpFactory.sol";
import "./PumpPair.sol";

contract PumpFactory is IPumpFactory {
    address public feeTo;
    address public feeToSetter;
    bytes32 public constant pairCodeHash = keccak256(type(PumpPair).creationCode);

    mapping(address => address) public getPair;
    address[] public allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }

    function createPair(
        string memory name,
        string memory symbol,
        address creator
    ) external returns (address pair) {
        require(getPair[creator] == address(0), "PumpFactory: PAIR_EXISTS");

        bytes memory bytecode = type(PumpPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(name, symbol, creator, block.timestamp));

        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        IPumpPair(pair).initialize(name, symbol, creator, address(this));

        getPair[creator] = pair;
        allPairs.push(pair);

        emit PairCreated(address(0), pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "PumpFactory: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "PumpFactory: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }
}
