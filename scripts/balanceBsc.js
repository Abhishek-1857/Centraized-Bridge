
const { ethers } = require("hardhat");
const Contract_Address="0x848b9e164BDF704D8896bd281ec2B68470a7Eac3"
const Gemma_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const bridgeBsc=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")


const provider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

const signer=new ethers.Wallet(Gemma_Private_Key,provider);
const BridgeBsc=new ethers.Contract(Contract_Address,bridgeBsc.abi,signer)

async function main() {
    balance= await BridgeBsc.getBalance("0xb0276982D8F85A530D10A09208b08D9C1b3A7F7d")
    console.log("Wrapped Astreakk : ",balance.toString(),"W_AESTREAKK")
}
main()


