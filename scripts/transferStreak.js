const Streak_Private_Key = "410ffc91fae09a6bff025a1e56eec76987b97334c1843fc37c20ce23925388c2"
const Contract_Address="0xd714324747cf731dEc41Fd6BAc74595FD0F852F4"
// const Contract_Address_to="0xf2a6E0CF77AB7Dc47782d149057233342DA059FB"

const { ethers } = require("hardhat");


const contract = require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json")


const provider = new ethers.providers.JsonRpcProvider("http://44.236.234.203:8545")

const signer = new ethers.Wallet(Streak_Private_Key, provider);

const BridgeStreak = new ethers.Contract(Contract_Address, contract.abi, signer)
async function main() {

  console.log("Transfering your Assets....")
  const tx = await BridgeStreak.send("0xb0276982D8F85A530D10A09208b08D9C1b3A7F7d",{ value: 1, gasLimit: 3000000 })
  console.log("Wait while transaction is processing....")
  await tx.wait()
  console.log("Transaction processed with Transaction hash ",tx.hash)
}
main()
