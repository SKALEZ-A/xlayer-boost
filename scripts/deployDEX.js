const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Uniswap V2 style DEX to X Layer Testnet...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying DEX contracts with account:", deployer.address);

  // Deploy WETH9 (Wrapped OKB for X Layer)
  console.log("\n📄 Deploying WOKB (Wrapped OKB)...");
  const WOKB = await ethers.getContractFactory("WOKB");
  const wokb = await WOKB.deploy();
  await wokb.deployed();
  console.log("✅ WOKB deployed to:", wokb.address);

  // Deploy UniswapV2Factory
  console.log("\n🏭 Deploying UniswapV2Factory...");
  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const factory = await UniswapV2Factory.deploy(deployer.address);
  await factory.deployed();
  console.log("✅ UniswapV2Factory deployed to:", factory.address);

  // Deploy UniswapV2Router02
  console.log("\n🛣️ Deploying UniswapV2Router02...");
  const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
  const router = await UniswapV2Router02.deploy(factory.address, wokb.address);
  await router.deployed();
  console.log("✅ UniswapV2Router02 deployed to:", router.address);

  console.log("\n🎉 DEX Deployment completed successfully!");
  console.log("\n📋 DEX Contract Addresses:");
  console.log("WOKB:", wokb.address);
  console.log("UniswapV2Factory:", factory.address);
  console.log("UniswapV2Router02:", router.address);

  console.log("\n💡 Next steps:");
  console.log("1. Update .env file with these addresses");
  console.log("2. Create initial liquidity pools");
  console.log("3. Test DEX functionality");

  // Create initial OKB-WOKB pair
  console.log("\n🔄 Creating WOKB-OKB pair...");
  const tx = await factory.createPair(wokb.address, "0x0000000000000000000000000000000000000000");
  await tx.wait();
  const pairAddress = await factory.getPair(wokb.address, "0x0000000000000000000000000000000000000000");
  console.log("✅ OKB-WOKB pair created at:", pairAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ DEX Deployment failed:", error);
    process.exit(1);
  });
