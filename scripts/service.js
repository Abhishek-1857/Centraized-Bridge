const { ethers } = require("hardhat");

const bridgEth=require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json")
const bridgeBsc=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")

const Contract_Address_Streak="0x7181941d9D110d0eF5D60aE95EE6383b8E46579b"
const Contract_Address_Bsc="0xc09A6029Aa5D8Be52601D7cBf73368a5D0F977Ab"

const Private_Key = "e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const Bsc_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"

const StreakProvider=new ethers.providers.JsonRpcProvider("http://44.236.234.203:8545")
const BscProvider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")

const StreakSigner=new ethers.Wallet(Private_Key,StreakProvider);
const BscSigner=new ethers.Wallet(Bsc_Private_Key,BscProvider);
// console.log(ServiceSigner.address)
const BridgeStreak=new ethers.Contract(Contract_Address_Streak,bridgEth.abi,StreakSigner)
const BridgeBsc=new ethers.Contract(Contract_Address_Bsc,bridgeBsc.abi,BscSigner)
// console.log("done")
async function main()
{
    BridgeStreak.on("Locked", (from,to,amount) => {
        console.log(amount)
         const tx=BridgeBsc.mint(to,amount);
        console.log(`${ from } locked ${amount.toString()} on STREAK Chain`);
    });
    BridgeBsc.on("Burn", (to, amount) => {
        console.log(amount)
        const tx=BridgeStreak.unlock(to,{value:amount});
       console.log(`Unlocked ${amount} on ${to} address on STREAK Chain`);
   });
}
main()