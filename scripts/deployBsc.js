const { ethers } = require("hardhat");
async function main() {

	const [deployer] = await ethers.getSigners();

	console.log(
	"Deploying contracts with the account:",
	deployer.address
	);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	const HelloWorld = await ethers.getContractFactory("BridgeBsc");
	const contract = await HelloWorld.deploy("Wrapped Astreakk","W_AESTREAKK");

	console.log("Contract deployed at:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });