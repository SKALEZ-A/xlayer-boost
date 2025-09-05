const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PumpPair", function () {
  let PumpPair;
  let pumpPair;
  let owner;
  let addr1;
  let addr2;

  const INITIAL_OKB_PRICE = ethers.utils.parseEther("0.0001");
  const CREATION_FEE = ethers.utils.parseEther("1");

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    PumpPair = await ethers.getContractFactory("PumpPair");
    pumpPair = await PumpPair.deploy();
    await pumpPair.deployed();

    // Initialize the pair
    await pumpPair.initialize("Test Token", "TEST", owner.address, owner.address);
  });

  describe("Initialization", function () {
    it("Should initialize with correct parameters", async function () {
      expect(await pumpPair.name()).to.equal("Test Token");
      expect(await pumpPair.symbol()).to.equal("TEST");
      expect(await pumpPair.creator()).to.equal(owner.address);
      expect(await pumpPair.totalSupply()).to.equal(ethers.utils.parseEther("1000000"));
    });
  });

  describe("Bonding Curve", function () {
    it("Should calculate correct initial price", async function () {
      const price = await pumpPair.getTokenPrice(ethers.utils.parseEther("1"));
      expect(price).to.be.gt(0);
    });

    it("Should allow buying tokens", async function () {
      const buyAmount = ethers.utils.parseEther("1");

      await expect(
        pumpPair.connect(addr1).buy(0, { value: buyAmount })
      ).to.emit(pumpPair, "TokenPurchase");

      expect(await pumpPair.reserveOKB()).to.equal(buyAmount);
      expect(await pumpPair.balanceOf(addr1.address)).to.be.gt(0);
    });

    it("Should allow selling tokens", async function () {
      // First buy some tokens
      const buyAmount = ethers.utils.parseEther("1");
      await pumpPair.connect(addr1).buy(0, { value: buyAmount });

      const tokenBalance = await pumpPair.balanceOf(addr1.address);
      expect(tokenBalance).to.be.gt(0);

      // Approve and sell
      await pumpPair.connect(addr1).approve(pumpPair.address, tokenBalance);

      await expect(
        pumpPair.connect(addr1).sell(tokenBalance, 0)
      ).to.emit(pumpPair, "TokenSale");

      expect(await pumpPair.balanceOf(addr1.address)).to.equal(0);
    });

    it("Should apply 5% fee on transactions", async function () {
      const buyAmount = ethers.utils.parseEther("1");
      const fee = buyAmount.mul(5).div(100);
      const amountAfterFee = buyAmount.sub(fee);

      await pumpPair.connect(addr1).buy(0, { value: buyAmount });

      expect(await pumpPair.reserveOKB()).to.equal(amountAfterFee);
    });
  });

  describe("DEX Migration", function () {
    it("Should not allow migration before threshold", async function () {
      expect(await pumpPair.canMigrate()).to.equal(false);

      await expect(
        pumpPair.connect(owner).migrateToDEX()
      ).to.be.revertedWith("PumpPair: CANNOT_MIGRATE");
    });

    it("Should allow migration after threshold", async function () {
      // Buy enough tokens to reach 80 OKB threshold
      const threshold = ethers.utils.parseEther("80");
      await pumpPair.connect(addr1).buy(0, { value: threshold });

      expect(await pumpPair.canMigrate()).to.equal(true);

      await expect(
        pumpPair.connect(owner).migrateToDEX()
      ).to.emit(pumpPair, "DEXMigration");

      expect(await pumpPair.migrated()).to.equal(true);
    });

    it("Should prevent trading after migration", async function () {
      // Migrate first
      const threshold = ethers.utils.parseEther("80");
      await pumpPair.connect(addr1).buy(0, { value: threshold });
      await pumpPair.connect(owner).migrateToDEX();

      // Try to buy after migration
      await expect(
        pumpPair.connect(addr2).buy(0, { value: ethers.utils.parseEther("1") })
      ).to.be.revertedWith("PumpPair: MIGRATED_TO_DEX");
    });
  });

  describe("Emergency Functions", function () {
    it("Should allow creator to withdraw emergency funds", async function () {
      const depositAmount = ethers.utils.parseEther("10");
      await pumpPair.connect(addr1).buy(0, { value: depositAmount });

      const initialBalance = await ethers.provider.getBalance(owner.address);

      await pumpPair.connect(owner).emergencyWithdraw();

      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("Should not allow non-creator to emergency withdraw", async function () {
      await expect(
        pumpPair.connect(addr1).emergencyWithdraw()
      ).to.be.revertedWith("PumpPair: UNAUTHORIZED");
    });
  });
});
