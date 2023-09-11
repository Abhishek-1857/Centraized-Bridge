require('dotenv').config();

const STREAK_API_URL=process.env.STREAK_API_URL;
const CONTRACT_ADDRESS = process.env.STREAK_CONTRACT_ADDRESS;
const {
  ethers
} = require("ethers");
const contract = require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json");

// console.log(JSON.stringify(contract.abi));

const provider = new ethers.JsonRpcProvider(STREAK_API_URL);
const BridgeStreak = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, provider);

async function main() {
    locked_balance= await BridgeStreak.lockedBalance("0x4E95Db6F99900C94a09E2F27Ee0D36e6fb81d71e")
    console.log("locked balance : ",locked_balance.toString(),"ASTREAKK")
}
main()