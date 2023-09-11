require('dotenv').config();

const STREAK_API_URL=process.env.STREAK_API_URL;
const PRIVATE_KEY = "410ffc91fae09a6bff025a1e56eec76987b97334c1843fc37c20ce23925388c2";
const CONTRACT_ADDRESS = process.env.STREAK_CONTRACT_ADDRESS;
const {
  ethers
} = require("ethers");
const contract = require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json");

// console.log(JSON.stringify(contract.abi));

const provider = new ethers.JsonRpcProvider(STREAK_API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const BridgeStreak = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    console.log("Transfering your Assets....")
    const tx = await BridgeStreak.send("0xb0276982D8F85A530D10A09208b08D9C1b3A7F7d",{ value: 20, gasPrice: ethers.parseUnits('6','gwei').toString(),
    gasLimit: 177302})
    console.log("Wait while transaction is processing....")
    await tx.wait()
    console.log(tx.hash)
}
main();