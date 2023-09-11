require('dotenv').config();

const BSC_API_URL=process.env.BSC_API_URL;
const CONTRACT_ADDRESS = process.env.BSC_CONTRACT_ADDRESS;
const {
  ethers
} = require("ethers");
const contract = require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json");

// console.log(JSON.stringify(contract.abi));

const provider = new ethers.JsonRpcProvider(BSC_API_URL);
const BridgeBsc = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, provider);
async function main() {
    balance= await BridgeBsc.balanceOf("0xb0276982D8F85A530D10A09208b08D9C1b3A7F7d")
    console.log("Wrapped Astreakk : ",balance.toString(),"W_AESTREAKK")
}
main()