const Bsc_Private_Key = "dcb8b8242c7de5bbbb4f21711061e681811825a0d7215d5eede4d0df3bb6a7cd"
const Contract_Address="0xd13581d7Fa8aD187E597C4b02579E433dCB0e21F"
// const Contract_Address_to="0xf2a6E0CF77AB7Dc47782d149057233342DA059FB"

const { keccak256, arrayify } = require("ethers/lib/utils");
const { ethers } = require("hardhat");


const contract = require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")

const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

const signer = new ethers.Wallet(Bsc_Private_Key, provider);

const BridgeBsc = new ethers.Contract(Contract_Address,contract.abi,signer)
async function main() {
  const recipient = "0x4E95Db6F99900C94a09E2F27Ee0D36e6fb81d71e"
  const amount  =  1
//  const message =  ethers.utils.solidityKeccak256(["address","address","uint"],[from.address,recipient.address,amount]).toString("hex")
//   // console.log(message)
//   const signature = await signer.signMessage(arrayify(message))
  console.log('addr:', await signer.getAddress())
const gas = await BridgeBsc.estimateGas.send(recipient, amount);
console.log("Transfering your Assets...., gas:", gas)
  const tx = await BridgeBsc.send(recipient, amount, { gas })
  console.log("Wait while transaction is processing....")
  // console.log(tx.hash);
  await tx.wait()
  console.log("Transaction processed with Transaction hash ",tx.hash)
}
main()
