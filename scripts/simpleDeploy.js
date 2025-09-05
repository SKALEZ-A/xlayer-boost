const ethers = require('ethers');
require('dotenv').config();

async function main() {
  console.log("🚀 Starting simple deployment to X Layer Testnet...");

  // Connect to X Layer Testnet
  const provider = new ethers.providers.JsonRpcProvider('https://xlayertestrpc.okx.com/terigon');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deployer address:", wallet.address);

  // Check balance
  const balance = await wallet.getBalance();
  console.log("OKB Balance:", ethers.utils.formatEther(balance));

  if (balance.lt(ethers.utils.parseEther("5"))) {
    console.log("❌ Insufficient OKB balance for deployment!");
    console.log("💡 Get OKB from: https://www.okx.com/web3/faucet");
    process.exit(1);
  }

  // Contract deployment addresses will be saved here
  const deployedContracts = {};

  console.log("\n✅ Ready for deployment!");
  console.log("💡 Use this information for your DoraHacks submission:");
  console.log("- Network: X Layer Testnet (Chain ID: 195)");
  console.log("- RPC: https://xlayertestrpc.okx.com/terigon");
  console.log("- Explorer: https://www.oklink.com/xlayer-test");
  console.log("- Deployer:", wallet.address);

  // Since we can't compile with current Hardhat/Node.js setup,
  // provide manual deployment instructions
  console.log("\n📋 Manual Deployment Steps:");
  console.log("1. Use Remix IDE: https://remix.ethereum.org");
  console.log("2. Connect to X Layer Testnet in MetaMask");
  console.log("3. Copy contract code from contracts/ folder");
  console.log("4. Deploy in this order:");
  console.log("   a. FeeDistributor.sol");
  console.log("   b. PumpFactory.sol");
  console.log("   c. PumpRouter.sol");
  console.log("   d. LiquidityLocker.sol");
  console.log("5. Save all deployment addresses");
  console.log("6. Update frontend/lib/contracts.ts with addresses");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
