//imports
//main function
//calling of main function
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

// either do this
// function deployFunc() {
//   console.log("first");
// }

// module.exports.default = deployFunc;

//or
const { networkConfig, developmentChain } = require("../helper-hardhat-config");

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //   if chainid x use address y
  //   let ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  //if the contract not exist we deploy a minimal version of for out local testing

  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    // get recent recent deployement using .get() command
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } //if not deployed the mock
  else {
    // [][]caliing objects
    //aave
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  console.log("==>", chainId);

  log("----------------------------------------------------");
  log("Deploying FundMe and waiting for confirmations...");
  //   args for verify
  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, //put price feed address
    log: true,
    // wait for confirmation
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`FundMe deployed at ${fundMe.address}`);
  //what  happens when we whant to chaange chains
  // when going for local host or hardhat network we want to use mock

  // verification of deployed contract
  if (
    !developmentChain.includes(network.name) &&
    process.env.EATHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }
  log("------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
