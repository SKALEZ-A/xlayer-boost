const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PumpFactory", function () {
  let PumpFactory;
  let pumpFactory;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    PumpFactory = await ethers.getContractFactory("PumpFactory");
    pumpFactory = await PumpFactory.deploy(owner.address);
    await pumpFactory.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await pumpFactory.feeToSetter()).to.equal(owner.address);
    });

    it("Should have zero pairs initially", async function () {
      expect(await pumpFactory.allPairsLength()).to.equal(0);
    });
  });

  describe("Pair Creation", function () {
    it("Should create a new pair", async function () {
      const tx = await pumpFactory.connect(addr1).createPair(
        "Test Token",
        "TEST",
        addr1.address
      );

      await tx.wait();

      expect(await pumpFactory.allPairsLength()).to.equal(1);
      const pairAddress = await pumpFactory.getPair(addr1.address);
      expect(pairAddress).to.not.equal(ethers.constants.AddressZero);
    });

    it("Should not allow duplicate pairs for same creator", async function () {
      await pumpFactory.connect(addr1).createPair(
        "Test Token",
        "TEST",
        addr1.address
      );

      await expect(
        pumpFactory.connect(addr1).createPair(
          "Another Token",
          "ANOTHER",
          addr1.address
        )
      ).to.be.revertedWith("PumpFactory: PAIR_EXISTS");
    });

    it("Should emit PairCreated event", async function () {
      await expect(
        pumpFactory.connect(addr1).createPair(
          "Test Token",
          "TEST",
          addr1.address
        )
      ).to.emit(pumpFactory, "PairCreated");
    });
  });

  describe("Fee Management", function () {
    it("Should allow fee setter to change fee recipient", async function () {
      await pumpFactory.setFeeTo(addr1.address);
      expect(await pumpFactory.feeTo()).to.equal(addr1.address);
    });

    it("Should not allow non-fee-setter to change fee recipient", async function () {
      await expect(
        pumpFactory.connect(addr1).setFeeTo(addr2.address)
      ).to.be.revertedWith("PumpFactory: FORBIDDEN");
    });

    it("Should allow fee setter to change fee setter", async function () {
      await pumpFactory.setFeeToSetter(addr1.address);
      expect(await pumpFactory.feeToSetter()).to.equal(addr1.address);
    });
  });
});
