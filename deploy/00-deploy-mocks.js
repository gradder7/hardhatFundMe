const { network } = require("hardhat");
const {
  developmentChain,
  DECIMALS,
  INITIAL_ANSWERS,
} = require("../helper-hardhat-config");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  //   const chainId = networks.config;
  if (developmentChain.includes(network.name)) {
    log("------------------------------------------");
    log("local network detected deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWERS],
    });
    log("MOCKS DEPLOYED!");
    log("-------------------------------------------");
  }
};
module.exports.tags = ["all", "mocks"];
