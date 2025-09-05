# Technical Context: XLayer Pump.fun Launchpad

## Blockchain Infrastructure
- **Network**: X Layer (OKX zkEVM L2)
- **Framework**: Polygon CDK (Chain Development Kit)
- **Consensus**: Polygon Pessimistic Consensus
- **Gas Token**: OKB (fixed supply: 21M)
- **TPS**: Up to 5,000
- **Finality**: Pessimistic Proofs for cross-chain

## Smart Contract Architecture

### Core Contracts
1. **PumpFactory.sol**: Main factory for creating token pairs
2. **PumpPair.sol**: Individual token pair with bonding curve
3. **PumpRouter.sol**: Router for token swaps and liquidity
4. **FeeDistributor.sol**: Handles fee collection and distribution
5. **LiquidityLocker.sol**: Time-locked liquidity mechanism

### Token Standard
- ERC-20 compatible
- 1 billion total supply (standard for meme tokens)
- 18 decimals
- Burn mechanism for deflationary pressure

## Bonding Curve Mechanics
- **Type**: Exponential bonding curve
- **Formula**: Price = (Supply / 1000000) ^ 2 * 0.0001 OKB
- **Threshold**: 80 OKB accumulated triggers DEX migration
- **Locked Liquidity**: 36 OKB permanently locked

## Frontend Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Web3 Integration**: ethers.js + wagmi
- **Wallet Support**: MetaMask, OKX Wallet

## Development Environment
- **Node.js**: v18+
- **Solidity**: ^0.8.20
- **Hardhat**: Latest
- **Testing**: Chai + Mocha
- **Deployment**: Hardhat scripts

## Network Configuration
- **Testnet RPC**: https://rpc.xlayer.tech
- **Mainnet RPC**: https://rpc.xlayer.tech/mainnet
- **Chain ID**: 196 (testnet), 197 (mainnet)
- **Block Explorer**: https://www.oklink.com/xlayer

## Environment Variables
```bash
# Network Configuration
X_LAYER_RPC_URL=https://rpc.xlayer.tech
X_LAYER_CHAIN_ID=196

# Contract Addresses
FACTORY_ADDRESS=0x...
ROUTER_ADDRESS=0x...
FEE_DISTRIBUTOR=0x...

# Wallet Configuration
WALLET_PRIVATE_KEY=your_private_key_here
OKB_TOKEN_ADDRESS=0x...

# DEX Integration
OKIESWAP_ROUTER=0x...
UNISWAP_ROUTER=0x...
```

## API Endpoints
- **Bridge Service**: For cross-chain operations
- **AggLayer**: For proof generation
- **Prover Service**: For ZK proofs
- **RPC Endpoints**: Standard Ethereum JSON-RPC

## Security Considerations
- Reentrancy guards
- Access control (Ownable)
- Input validation
- Emergency pause functionality
- Timelock for critical operations
- Multi-sig for admin functions

## Testing Strategy
- Unit tests for all contracts
- Integration tests for bonding curve
- Frontend component tests
- End-to-end user flow tests
- Security audit preparation
