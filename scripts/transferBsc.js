const Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const Contract_Address="0xc09A6029Aa5D8Be52601D7cBf73368a5D0F977Ab"
// const Contract_Address_to="0xf2a6E0CF77AB7Dc47782d149057233342DA059FB"

const { keccak256, arrayify } = require("ethers/lib/utils");
const { ethers } = require("hardhat");


const contract=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")


const provider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

const signer=new ethers.Wallet(Private_Key,provider);

const BridgeBsc=new ethers.Contract(Contract_Address,contract.abi,signer)
async function main() {
  const recipient="0x4E95Db6F99900C94a09E2F27Ee0D36e6fb81d71e"
  const amount=1
//  const message= ethers.utils.solidityKeccak256(["address","address","uint"],[from.address,recipient.address,amount]).toString("hex")
//   // console.log(message)
//   const signature=await signer.signMessage(arrayify(message))
//   // console.log(signature)
  console.log("Transfering your Assets....")
  const tx=await BridgeBsc.send(recipient,amount)
  console.log("Wait while transaction is processing....")
  // console.log(tx.hash);
  await tx.wait()
  console.log("Transaction processed with Transaction hash ",tx.hash)
}
main()
