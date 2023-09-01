
const { ethers } = require("hardhat");
const Contract_Address="0xBb0CE5D51bE734EDc5DF7a63746271fD1C72EF78"
const Streak_Private_Key="410ffc91fae09a6bff025a1e56eec76987b97334c1843fc37c20ce23925388c2"
const bridgegemma=require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json")


const provider=new ethers.providers.JsonRpcProvider("http://44.236.234.203:8545")

const signer=new ethers.Wallet(Streak_Private_Key,provider);
const BridgeStreak=new ethers.Contract(Contract_Address,bridgegemma.abi,signer)

async function main() {
    const user=await ethers.getSigner()
    locked_balance= await BridgeStreak.lockedBalance("0x4E95Db6F99900C94a09E2F27Ee0D36e6fb81d71e")
    total_balance= await BridgeStreak.getBalance()
    console.log("locked balance : ",locked_balance.toString(),"ASTREAKK")
    console.log("total balance : ",total_balance.toString(),"ASTREAKK")
}
main()