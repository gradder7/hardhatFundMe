const hardhat = require("hardhat");
async function main() {
  const [deployer] = await hardhat.ethers.getSigners();
  console.log("deploying contract to:", deployer.address);
  const SimpleStorageFactory = await hardhat.ethers.getContractFactory(
    "FundMe"
  );
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  const address = await simpleStorage.getAddress();
  console.log("address", address);

  const TransactionResponse = await simpleStorage.fund({
    value: hardhat.ethers.utils.parseEther("0.1"),
  });
  await TransactionResponse.wait(2);
  console.log("funded!");
}

main()
  .then(() => process.exit(0))
  .catch((errors) => {
    console.log(errors);
    process.exit(1);
  });
