import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🚀 Manual deployment to X Layer Testnet...");

  // Connect to X Layer Testnet
  const provider = new ethers.providers.JsonRpcProvider("https://testrpc.xlayer.tech/terigon");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deployer address:", wallet.address);

  // Check balance
  const balance = await provider.getBalance(wallet.address);
  console.log("OKB Balance:", ethers.utils.formatEther(balance));

  if (balance.lt(ethers.utils.parseEther("3"))) {
    console.log("❌ Insufficient OKB balance for deployment!");
    console.log("💡 Get more OKB from: https://www.okx.com/web3/faucet");
    process.exit(1);
  }

  const deployedAddresses = {};

  try {
    // Read contract artifacts (you'll need to compile contracts first)
    console.log("\n📄 Reading contract artifacts...");

    // For now, let's just show the deployment addresses template
    // In a real scenario, you'd read the compiled contract JSON files

    console.log("\n🎉 Deployment ready!");
    console.log("Your deployer address:", wallet.address);
    console.log("Network: X Layer testnet (Chain ID: 1952)");

    // Save deployment info
    const deploymentInfo = {
      network: "X Layer testnet",
      chainId: 1952,
      deployer: wallet.address,
      balance: ethers.utils.formatEther(balance),
      timestamp: new Date().toISOString(),
      rpcUrl: "https://testrpc.xlayer.tech/terigon",
      blockExplorer: "https://www.okx.com/web3/explorer/xlayer-test"
    };

    fs.writeFileSync('./deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("📄 Deployment info saved to: deployment-info.json");

    console.log("\n📋 Next steps:");
    console.log("1. Use Remix IDE to deploy contracts: https://remix.ethereum.org");
    console.log("2. Copy contract code from contracts/ folder");
    console.log("3. Deploy in order:");
    console.log("   a. FeeDistributor.sol");
    console.log("   b. PumpFactory.sol");
    console.log("   c. PumpRouter.sol");
    console.log("   d. LiquidityLocker.sol");
    console.log("4. Save addresses and update frontend");

  } catch (error) {
    console.error("❌ Deployment preparation failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
