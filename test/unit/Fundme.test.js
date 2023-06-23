const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");

describe("FundMe", async () => {
  let fundMe;
  let deployer;
  let mockV3Aggreator;
  beforeEach(async () => {
    //deploy  our fund me contract using hardhat deploy
    deployer = (await getNamedAccounts()).deployer;
    // run our entire folder as many as tags we want
    await deployments.fixture(["all"]);
    // get the recent deployment what we have done
    fundMe = await ethers.getContract("FundMe", deployer);
    mockV3Aggreator = await ethers.getContract("MockV3Aggregator", deployer);
  });
  describe("constructor", async () => {
    it("sets the aggregator address correctly", async () => {
      const response = await fundMe.getPriceFeed();
      assert.equal(response, mockV3Aggreator.address);
    });
  });
});
