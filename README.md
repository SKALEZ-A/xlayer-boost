# 🚀 XLAYER BOOST - Revolutionary Meme Token Launchpad

> The ultimate pump.fun-style meme token launchpad built on X Layer (OKX zkEVM L2) with advanced bonding curves, automatic liquidity provision, and comprehensive anti-rug protection.

## 🎯 Hackathon Submission for DoraHacks XLayer Challenge

**Prize Pool: $5,000 USD** | **Deadline: September 5, 2025**

## 🌟 Key Features

- ✅ **Fair Launch**: No pre-allocations, equal opportunity for all participants
- ✅ **Bonding Curve**: Exponential pricing with automatic price discovery
- ✅ **Automatic Liquidity**: 80 OKB threshold triggers DEX migration
- ✅ **Anti-Rug Pull**: Time-locked liquidity and transparent mechanisms
- ✅ **Fee Distribution**: Platform (20%), Creator (30%), Referrer (10%), Liquidity (40%)
- ✅ **Multi-Wallet Support**: MetaMask, OKX Wallet integration
- ✅ **Mobile-First**: Responsive design for all devices

## 🏗️ Architecture

### Smart Contracts
- **PumpFactory.sol**: Main factory for creating token pairs
- **PumpPair.sol**: Individual token pair with bonding curve logic
- **PumpRouter.sol**: Handles token swaps and fee distribution
- **FeeDistributor.sol**: Manages fee collection and distribution
- **LiquidityLocker.sol**: Time-locked liquidity mechanism

### Frontend Stack
- **Next.js 14**: React framework with TypeScript
- **Tailwind CSS**: Utility-first CSS framework
- **Wagmi + RainbowKit**: Web3 wallet integration
- **Recharts**: Data visualization for bonding curves

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or OKX Wallet
- Some OKB tokens for gas and token creation

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd XLayer_pumpfun
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Compile smart contracts**
   ```bash
   npx hardhat compile
   ```

5. **Run tests**
   ```bash
   npx hardhat test
   ```

6. **Deploy to testnet**
   ```bash
   npx hardhat run scripts/deploy.js --network xlayer
   ```

7. **Start frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## 🧪 Testing

### Smart Contract Tests
```bash
npm test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### Manual Testing
1. Connect wallet (MetaMask/OKX) to X Layer Testnet
2. Create a new token (1 OKB fee)
3. Buy tokens using bonding curve
4. Monitor progress to 80 OKB threshold
5. Automatic DEX migration

### Check Balance
```bash
npm run check:balance
```

## 🔧 Configuration

### Network Configuration
- **Testnet**: X Layer testnet (Chain ID: 1952)
- **Mainnet**: X Layer (Chain ID: 197)
- **Testnet RPC**: https://testrpc.xlayer.tech/terigon
- **Mainnet RPC**: https://rpc.xlayer.tech/mainnet
- **Block Explorer**: https://www.okx.com/web3/explorer/xlayer-test

### Environment Variables
```bash
X_LAYER_RPC_URL=https://testrpc.xlayer.tech/terigon
X_LAYER_CHAIN_ID=1952
PRIVATE_KEY=your_private_key_here
WOKB_ADDRESS=0xe538905cf8410324e03a5a23c1c177a474d59b2b
```

## 📊 Bonding Curve Mechanics

### Price Calculation
```
Price = (Supply / 1,000,000)² × 0.0001 OKB
```

### Migration Threshold
- **80 OKB** accumulated triggers DEX migration
- **36 OKB** permanently locked for base liquidity
- **44 OKB** added to DEX pool

### Fee Structure
- **5%** transaction fee
- **20%** to platform
- **30%** to token creator
- **10%** to referrer (if applicable)
- **40%** to liquidity pool

## 🎨 User Interface

### Landing Page
- Hero section with key features
- Wallet connection
- Feature highlights

### Token Creation
- Name and symbol input
- OKB fee display
- One-click deployment

### Token Trading
- Real-time price charts
- Buy/sell interface
- Progress to DEX migration
- Portfolio tracking

### DEX Integration
- Automatic migration at threshold
- Liquidity provision
- Pool creation on OkieSwap

## 🔒 Security Features

### Smart Contract Security
- ReentrancyGuard on all external calls
- Input validation on all parameters
- Emergency pause functionality
- Access control with Ownable

### Anti-Rug Pull Mechanisms
- Time-locked liquidity (30+ days)
- Gradual unlock schedules
- Transparent fee distribution
- Emergency withdrawal functions

### Frontend Security
- Input sanitization
- Error boundary components
- Loading states for all async operations
- Clear error messages

## 🚀 Deployment

### Get Test Tokens First
```bash
npm run check:balance
# Get OKB from: https://www.okx.com/web3/faucet
```

### Deploy DEX (Optional)
```bash
npm run deploy:dex
```

### Testnet Deployment
```bash
npm run deploy:testnet
```

### Mainnet Deployment
```bash
npm run deploy:mainnet
```

### Contract Verification
```bash
npm run verify:testnet CONTRACT_ADDRESS
npm run verify:mainnet CONTRACT_ADDRESS
```

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core smart contracts
- ✅ Basic frontend
- ✅ Wallet integration
- ✅ Bonding curve implementation

### Phase 2 (Next)
- 🔄 DEX integration
- 🔄 Referral system
- 🔄 Advanced analytics
- 🔄 Mobile optimization

### Phase 3 (Future)
- 🔄 Governance token
- 🔄 Multi-chain support
- 🔄 Advanced trading features
- 🔄 NFT integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **X Layer Team**: For the amazing L2 infrastructure
- **OKX**: For OKB and ecosystem support
- **DoraHacks**: For the hackathon opportunity
- **OpenZeppelin**: For secure smart contract libraries

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Join our Discord community
- Check the documentation

---

**Built with ❤️ for the DoraHacks XLayer Hackathon**

*Submission for the "Develop a pump.fun on the xlayer chain" challenge*
# xlayer-boost
