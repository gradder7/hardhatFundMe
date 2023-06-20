const networkConfig = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
  //add more like this
  //31337
};
const developmentChain = ["hardhat", "localHost"];
const DECIMALS = 8;
const INITIAL_ANSWERS = 20000000000;

module.exports = {
  networkConfig,
  developmentChain,
  DECIMALS,
  INITIAL_ANSWERS,
};
