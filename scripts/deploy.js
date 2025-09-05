import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment to X Layer...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy FeeDistributor first
  console.log("\n📄 Deploying FeeDistributor...");
  const FeeDistributor = await ethers.getContractFactory("FeeDistributor");
  const feeDistributor = await FeeDistributor.deploy(deployer.address);
  await feeDistributor.deployed();
  console.log("✅ FeeDistributor deployed to:", feeDistributor.address);

  // Deploy PumpFactory
  console.log("\n🏭 Deploying PumpFactory...");
  const PumpFactory = await ethers.getContractFactory("PumpFactory");
  const pumpFactory = await PumpFactory.deploy(deployer.address);
  await pumpFactory.deployed();
  console.log("✅ PumpFactory deployed to:", pumpFactory.address);

  // Deploy PumpRouter
  console.log("\n🛣️ Deploying PumpRouter...");
  const PumpRouter = await ethers.getContractFactory("PumpRouter");
  const pumpRouter = await PumpRouter.deploy(
    pumpFactory.address,
    feeDistributor.address
  );
  await pumpRouter.deployed();
  console.log("✅ PumpRouter deployed to:", pumpRouter.address);

  // Deploy LiquidityLocker
  console.log("\n🔒 Deploying LiquidityLocker...");
  const LiquidityLocker = await ethers.getContractFactory("LiquidityLocker");
  const liquidityLocker = await LiquidityLocker.deploy();
  await liquidityLocker.deployed();
  console.log("✅ LiquidityLocker deployed to:", liquidityLocker.address);

  // Set up relationships
  console.log("\n⚙️ Setting up contract relationships...");

  // Set router in FeeDistributor
  await feeDistributor.setRouter(pumpRouter.address);
  console.log("✅ Router set in FeeDistributor");

  // Set fee recipient
  await pumpFactory.setFeeTo(feeDistributor.address);
  console.log("✅ Fee recipient set in PumpFactory");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("FeeDistributor:", feeDistributor.address);
  console.log("PumpFactory:", pumpFactory.address);
  console.log("PumpRouter:", pumpRouter.address);
  console.log("LiquidityLocker:", liquidityLocker.address);

  console.log("\n💡 Next steps:");
  console.log("1. Update contract addresses in frontend");
  console.log("2. Test the contracts on testnet");
  console.log("3. Verify contracts on block explorer");

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    deployer: deployer.address,
    contracts: {
      FeeDistributor: feeDistributor.address,
      PumpFactory: pumpFactory.address,
      PumpRouter: pumpRouter.address,
      LiquidityLocker: liquidityLocker.address,
    },
    timestamp: new Date().toISOString(),
  };

  console.log("\n📄 Deployment Info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
