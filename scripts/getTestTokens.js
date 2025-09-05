import { ethers } from "hardhat";

async function main() {
  console.log("🚰 Getting OKB test tokens on X Layer Testnet...");

  const [deployer] = await ethers.getSigners();
  console.log("Account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Current OKB Balance:", ethers.utils.formatEther(balance));

  if (balance.lt(ethers.utils.parseEther("1"))) {
    console.log("\n❌ Insufficient OKB balance for deployment!");
    console.log("💡 Get OKB test tokens from:");
    console.log("   - OKX Testnet Faucet: https://www.okx.com/web3/faucet");
    console.log("   - X Layer Discord faucet");
    console.log("   - Bridge from OKX mainnet to X Layer testnet");
    process.exit(1);
  } else {
    console.log("✅ Sufficient OKB balance for deployment!");
  }

  // Check network
  const network = await ethers.provider.getNetwork();
  console.log("Network:", network.name, "(Chain ID:", network.chainId, ")");

  if (network.chainId !== 195) {
    console.log("❌ Not connected to X Layer Testnet!");
    console.log("💡 Switch to X Layer Testnet in your wallet");
    process.exit(1);
  }

  console.log("\n🎉 Ready for deployment on X Layer Testnet!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
