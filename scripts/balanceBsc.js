
const { ethers } = require("hardhat");
const Contract_Address="0xc09A6029Aa5D8Be52601D7cBf73368a5D0F977Ab"
const Gemma_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const bridgeBsc=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")


const provider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

const signer=new ethers.Wallet(Gemma_Private_Key,provider);
const BridgeBsc=new ethers.Contract(Contract_Address,bridgeBsc.abi,signer)

async function main() {
    balance= await BridgeBsc.getBalance("0x4F1536FC181C541f3eF766D227373f55d03CE0bA")
    console.log("Wrapped Astreakk : ",balance.toString(),"W_AESTREAKK")
}
main()


