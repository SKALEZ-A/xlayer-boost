# 🚀 Quick Manual Deployment Guide - XLAYER BOOST

## ⚡ Fast Track Deployment (5-10 minutes)

Since we're having Node.js compatibility issues, let's use **Remix IDE** for instant deployment!

### Step 1: Setup MetaMask for X Layer Testnet
1. **Open MetaMask** and click the network dropdown
2. **Add Network**:
   - Network Name: `X Layer testnet`
   - RPC URL: `https://testrpc.xlayer.tech/terigon`
   - Chain ID: `1952`
   - Currency Symbol: `OKB`
   - Block Explorer: `https://www.okx.com/web3/explorer/xlayer-test`

3. **Import your private key**:
   - Private Key: `0xe948605a8a79da4e29c2cafbe7d54e55bb2d9410041bc7f319f413d024f53fb7`

### Step 2: Open Remix IDE
**Go to: https://remix.ethereum.org**

### Step 3: Deploy Contracts (Copy-Paste Method)

#### A. Deploy FeeDistributor.sol First
1. **Create new file**: `FeeDistributor.sol`
2. **Copy the entire contract code** from your `contracts/FeeDistributor.sol`
3. **Compile**: Select `0.8.20` compiler
4. **Deploy**:
   - Environment: `Injected Provider - MetaMask`
   - Constructor: Your address `0x5230b89d6728a10b34b8EC1C740a7A7a1C4afe94`
   - Click "Deploy"
5. **Save the deployed address** as `FEE_DISTRIBUTOR_ADDRESS`

#### B. Deploy PumpFactory.sol
1. **Create new file**: `PumpFactory.sol`
2. **Copy the entire contract code** from your `contracts/PumpFactory.sol`
3. **Compile & Deploy**:
   - Constructor: Your address `0x5230b89d6728a10b34b8EC1C740a7A7a1C4afe94`
4. **Save address** as `FACTORY_ADDRESS`

#### C. Deploy PumpRouter.sol
1. **Create new file**: `PumpRouter.sol`
2. **Copy the entire contract code** from your `contracts/PumpRouter.sol`
3. **Deploy**:
   - Constructor parameters:
     - `_factory`: `FACTORY_ADDRESS`
     - `_feeDistributor`: `FEE_DISTRIBUTOR_ADDRESS`
4. **Save address** as `ROUTER_ADDRESS`

#### D. Deploy LiquidityLocker.sol
1. **Create new file**: `LiquidityLocker.sol`
2. **Copy the entire contract code** from your `contracts/LiquidityLocker.sol`
3. **Deploy** (no constructor parameters needed)
4. **Save address** as `LIQUIDITY_LOCKER_ADDRESS`

### Step 4: Update Frontend Configuration

**Create file**: `frontend/lib/contracts.ts`

```typescript
export const CONTRACT_ADDRESSES = {
  FACTORY: "PASTE_YOUR_FACTORY_ADDRESS_HERE",
  ROUTER: "PASTE_YOUR_ROUTER_ADDRESS_HERE",
  FEE_DISTRIBUTOR: "PASTE_YOUR_FEE_DISTRIBUTOR_ADDRESS_HERE",
  LIQUIDITY_LOCKER: "PASTE_YOUR_LIQUIDITY_LOCKER_ADDRESS_HERE",
} as const;

export const NETWORK_CONFIG = {
  chainId: 1952,
  name: 'X Layer testnet',
  rpcUrl: 'https://testrpc.xlayer.tech/terigon',
  blockExplorer: 'https://www.okx.com/web3/explorer/xlayer-test',
} as const;
```

### Step 5: Test Your Deployment

1. **Start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Connect MetaMask** to your deployed app

3. **Test token creation**:
   - Create a new meme token
   - Buy some tokens
   - Verify bonding curve works

### 📋 Your Contract Addresses (Fill After Deployment)

```javascript
// Copy these to frontend/lib/contracts.ts
const CONTRACT_ADDRESSES = {
  FACTORY: "0x...",           // From PumpFactory deployment
  ROUTER: "0x...",            // From PumpRouter deployment
  FEE_DISTRIBUTOR: "0x...",   // From FeeDistributor deployment
  LIQUIDITY_LOCKER: "0x...",  // From LiquidityLocker deployment
};
```

### 🎯 Quick Test Commands

After deployment, test these on Remix:

1. **Create Token**:
   ```javascript
   // Call createPair("TestToken", "TEST", yourAddress) on PumpRouter
   ```

2. **Buy Tokens**:
   ```javascript
   // Send 1 OKB to buyTokens function on PumpRouter
   ```

3. **Check Balance**:
   ```javascript
   // Call balanceOf(yourAddress) on the token contract
   ```

### 🚨 Troubleshooting

- **"Insufficient funds"**: Get more OKB from faucet
- **"Contract deployment failed"**: Check gas limit in MetaMask
- **"Network error"**: Ensure MetaMask is connected to X Layer Testnet

### ⏱️ Time Estimate
- **MetaMask Setup**: 2 minutes
- **Contract Deployment**: 5-8 minutes
- **Frontend Update**: 2 minutes
- **Testing**: 3 minutes

**Total: ~12-15 minutes to full deployment!**

### 🎉 Ready for DoraHacks Submission

Once deployed, you'll have:
- ✅ Working pump.fun on X Layer
- ✅ All contract addresses
- ✅ Functional frontend
- ✅ Testable token creation & trading

**Deploy now and submit to win the $5,000 prize! 🚀**
