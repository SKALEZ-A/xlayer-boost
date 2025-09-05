# 🚀 XLayer Pump.fun Deployment Addresses & Guide

## 📋 Deployment Status
**Status**: Ready for Manual Deployment
**Network**: X Layer Testnet (Chain ID: 195)
**Your Address**: `0x5230b89d6728a10b34b8EC1C740a7A7a1C4afe94`

## 🎯 Manual Deployment Instructions

Since we're experiencing Node.js/Hardhat compatibility issues, please deploy manually using Remix IDE:

### Step 1: Setup MetaMask for X Layer Testnet
1. Add X Layer Testnet to MetaMask:
   - Network Name: `X Layer Testnet`
   - RPC URL: `https://xlayertestrpc.okx.com/terigon`
   - Chain ID: `195`
   - Currency Symbol: `OKB`
   - Block Explorer: `https://www.oklink.com/xlayer-test`

2. Import your private key: `0xe948605a8a79da4e29c2cafbe7d54e55bb2d9410041bc7f319f413d024f53fb7`

### Step 2: Get OKB Test Tokens
- Visit: https://www.okx.com/web3/faucet
- Request OKB tokens for X Layer Testnet
- Minimum needed: 5 OKB for deployment

### Step 3: Deploy Contracts in Remix IDE

1. **Open Remix IDE**: https://remix.ethereum.org
2. **Connect MetaMask** to X Layer Testnet
3. **Deploy in this order**:

#### A. Deploy FeeDistributor.sol
```solidity
// Copy the entire FeeDistributor.sol contract code
// Deploy with constructor parameter: your_address
constructor(address _platformWallet)
```
**Expected Address**: Save this address as `FEE_DISTRIBUTOR_ADDRESS`

#### B. Deploy PumpFactory.sol
```solidity
// Copy the entire PumpFactory.sol contract code
// Deploy with constructor parameter: your_address
constructor(address _feeToSetter)
```
**Expected Address**: Save this address as `FACTORY_ADDRESS`

#### C. Deploy PumpRouter.sol
```solidity
// Copy the entire PumpRouter.sol contract code
// Deploy with constructor parameters:
// _factory: FACTORY_ADDRESS
// _feeDistributor: FEE_DISTRIBUTOR_ADDRESS
constructor(address _factory, address _feeDistributor)
```
**Expected Address**: Save this address as `ROUTER_ADDRESS`

#### D. Deploy LiquidityLocker.sol
```solidity
// Copy the entire LiquidityLocker.sol contract code
// No constructor parameters needed
```
**Expected Address**: Save this address as `LIQUIDITY_LOCKER_ADDRESS`

### Step 4: Update Contract Relationships

After deployment, call these functions to set up relationships:

1. **Set Router in FeeDistributor**:
   ```javascript
   // Call setRouter(ROUTER_ADDRESS) on FeeDistributor contract
   ```

2. **Set Fee Recipient in Factory**:
   ```javascript
   // Call setFeeTo(FEE_DISTRIBUTOR_ADDRESS) on PumpFactory contract
   ```

### Step 5: Test Token Creation

1. **Create a test token**:
   ```javascript
   // Call createPair("Test Token", "TEST", your_address) on PumpRouter
   // This should create a new token pair
   ```

2. **Buy tokens**:
   ```javascript
   // Send OKB to the buyTokens function on PumpRouter
   ```

## 📝 Save These Addresses

After deployment, create a file with your addresses:

```javascript
// deployedAddresses.js
export const CONTRACT_ADDRESSES = {
  FACTORY: "0x...",           // PumpFactory address
  ROUTER: "0x...",            // PumpRouter address
  FEE_DISTRIBUTOR: "0x...",   // FeeDistributor address
  LIQUIDITY_LOCKER: "0x...",  // LiquidityLocker address
  DEPLOYER: "0x5230b89d6728a10b34b8EC1C740a7A7a1C4afe94"
};
```

## 🔧 Update Frontend Configuration

1. **Create/Update**: `frontend/lib/contracts.ts`
```typescript
export const CONTRACT_ADDRESSES = {
  FACTORY: "0x...",
  ROUTER: "0x...",
  FEE_DISTRIBUTOR: "0x...",
  LIQUIDITY_LOCKER: "0x...",
};
```

2. **Update**: `frontend/lib/wagmi.ts`
```typescript
// Make sure X Layer testnet is configured
```

## 🧪 Testing Checklist

After deployment, test these features:

- ✅ **Token Creation**: Create a new meme token
- ✅ **Token Purchase**: Buy tokens with OKB
- ✅ **Bonding Curve**: Verify price increases with purchases
- ✅ **Token Sale**: Sell tokens back
- ✅ **Fee Distribution**: Check fee collection
- ✅ **DEX Migration**: Test at 80 OKB threshold

## 📊 DoraHacks Submission Requirements

**Required Information:**
- ✅ **Project Demo**: Deployed frontend URL
- ✅ **Contract Addresses**: All deployed contract addresses
- ✅ **Network**: X Layer Testnet (Chain ID: 195)
- ✅ **GitHub Repo**: This repository
- ✅ **Video Demo**: Record a walkthrough
- ✅ **Technical Documentation**: This README

## 🎯 Winning Features to Highlight

1. **✅ Anti-Rug Pull Mechanisms**
   - Time-locked liquidity (30+ days)
   - Emergency withdrawal functions
   - Transparent fee distribution

2. **✅ Advanced Bonding Curve**
   - Exponential pricing: `Price = (Supply / 1M)² × 0.0001 OKB`
   - Automatic DEX migration at 80 OKB threshold
   - 36 OKB permanently locked for base liquidity

3. **✅ Fair Fee Distribution**
   - Platform (20%), Creator (30%), Referrer (10%), Liquidity (40%)
   - Automated distribution system
   - Referral rewards program

4. **✅ Security First**
   - ReentrancyGuard on all functions
   - Input validation and access control
   - Emergency pause functionality

## 🚀 Next Steps

1. **Deploy contracts** using Remix IDE
2. **Save all addresses** in the format above
3. **Update frontend** with contract addresses
4. **Test all features** thoroughly
5. **Record demo video** for submission
6. **Submit to DoraHacks** with all required information

**Good luck with your DoraHacks submission! 🎉**
