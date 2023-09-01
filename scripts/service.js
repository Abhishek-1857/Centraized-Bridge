const { ethers } = require("hardhat");

const bridgEth=require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json")
const bridgeBsc=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")

const Contract_Address_Bsc="0x37e2E3371e1086358821F6B866aEFc821aB5D123"
const Contract_Address_Streak="0xfdda63EAB54cB0F2A7471014cC8Ea9ad666553Fc"

// const Bsc_Private_Key = "e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const Bsc_Private_Key = "dcb8b8242c7de5bbbb4f21711061e681811825a0d7215d5eede4d0df3bb6a7cd"
const Streak_Private_Key = "e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"

const BscProvider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
const StreakProvider = new ethers.providers.JsonRpcProvider("http://44.236.234.203:8545")

const BscSigner = new ethers.Wallet(Bsc_Private_Key,BscProvider);
const StreakSigner = new ethers.Wallet(Streak_Private_Key,StreakProvider);

// console.log(ServiceSigner.address)
const BridgeStreak=new ethers.Contract(Contract_Address_Streak,bridgEth.abi,StreakSigner)
const BridgeBsc=new ethers.Contract(Contract_Address_Bsc,bridgeBsc.abi,BscSigner)
// console.log("done")
async function main()
{
   
    BridgeStreak.on("Locked", (from,to,amount) => {
        console.log(amount)
         const tx=BridgeBsc.mint_wrapped(to,amount,{ gasPrice: ethers.utils.parseUnits('6','gwei').toString(),
         gasLimit: 177302});
        console.log(`${ from } locked ${amount.toString()} on STREAK Chain`);
    });
    BridgeBsc.on("BurnWrapped", (to, amount) => {
        console.log(amount)
        const tx=BridgeStreak.unlock(to,{value:amount,  gasPrice: ethers.utils.parseUnits('6','gwei').toString(),
        gasLimit: 177302});
       console.log(`Unlocked ${amount} on ${to} address on STREAK Chain`);
   });
}
main()