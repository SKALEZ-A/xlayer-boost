# 🚀 XLayer Pump.fun Deployment Guide

## Prerequisites

### 1. Get OKB Test Tokens
```bash
# Check your balance
npm run check:balance

# Get OKB test tokens from:
# - OKX Testnet Faucet: https://www.okx.com/web3/faucet
# - X Layer Discord faucet
# - Bridge from OKX mainnet to X Layer testnet
```

### 2. Configure Environment
Update your `.env` file with your private key:
```bash
PRIVATE_KEY=0x_your_private_key_here
```

## Deployment Steps

### Step 1: Compile Contracts
```bash
npm run compile
```

### Step 2: Run Tests
```bash
npm test
```

### Step 3: Deploy DEX (Optional - if needed)
```bash
npm run deploy:dex
```
This deploys Uniswap V2 style contracts for liquidity migration.

### Step 4: Deploy Pump.fun Contracts
```bash
npm run deploy:testnet
```

### Step 5: Update Frontend Configuration
After deployment, update the contract addresses in:
- `frontend/lib/contracts.ts` (create this file)
- Update wagmi configuration if needed

### Step 6: Deploy Frontend
```bash
cd frontend
npm run build
npm run start
```

## X Layer Testnet Configuration

### Network Details
- **Network Name**: X Layer Testnet
- **RPC URL**: https://xlayertestrpc.okx.com/terigon
- **Chain ID**: 195
- **Token Symbol**: OKB
- **Block Explorer**: https://www.oklink.com/xlayer-test

### Important Addresses
- **Wrapped OKB (WOKB)**: `0xe538905cf8410324e03a5a23c1c177a474d59b2b`
- **Native OKB**: `0x0000000000000000000000000000000000000000`

## Contract Addresses (After Deployment)

Update these in your `.env` file and frontend:

```bash
FACTORY_ADDRESS=0x...
ROUTER_ADDRESS=0x...
FEE_DISTRIBUTOR_ADDRESS=0x...
LIQUIDITY_LOCKER_ADDRESS=0x...
```

## Testing the Deployment

### 1. Contract Interaction
```javascript
// Example: Create a token
const tx = await pumpFactory.createPair("MyToken", "MTK", userAddress);
await tx.wait();
```

### 2. Frontend Testing
- Connect wallet to X Layer Testnet
- Create a new token
- Buy/sell tokens
- Monitor DEX migration progress

### 3. Full User Flow
1. Connect MetaMask/OKX Wallet
2. Switch to X Layer Testnet
3. Create token (1 OKB fee)
4. Buy tokens using bonding curve
5. Wait for 80 OKB threshold
6. Automatic DEX migration

## Troubleshooting

### Common Issues

1. **Insufficient Balance**
   ```bash
   npm run check:balance
   # Get more OKB from faucet
   ```

2. **Wrong Network**
   - Ensure MetaMask is connected to X Layer Testnet (Chain ID: 195)
   - Update RPC URL if needed

3. **Contract Deployment Failed**
   - Check gas price in hardhat.config.js
   - Ensure sufficient OKB balance
   - Verify private key is correct

4. **Frontend Not Loading**
   - Check contract addresses are updated
   - Verify network configuration in wagmi.ts
   - Clear browser cache

### Gas Optimization
- Current gas price: 20 gwei
- Adjust in hardhat.config.js if needed
- Monitor gas usage during deployment

## Verification

### Contract Verification
```bash
npm run verify:testnet CONTRACT_ADDRESS
```

### Block Explorer
- View contracts on: https://www.oklink.com/xlayer-test
- Verify transactions and contract interactions

## Production Deployment

When ready for mainnet:
```bash
npm run deploy:mainnet
npm run verify:mainnet CONTRACT_ADDRESS
```

## Support

For issues:
1. Check X Layer documentation: https://web3.okx.com/xlayer/docs/
2. Join X Layer Discord for community support
3. Check OKX Web3 documentation for wallet integration

---

**🎉 Ready to launch your XLayer Pump.fun launchpad!**
