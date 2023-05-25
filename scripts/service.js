const { ethers } = require("hardhat");

const bridgEth=require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json")
const bridgeBsc=require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json")

const Contract_Address_Bsc="0xd13581d7Fa8aD187E597C4b02579E433dCB0e21F"
const Contract_Address_Streak="0xd714324747cf731dEc41Fd6BAc74595FD0F852F4"

// const Bsc_Private_Key = "e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"
const Bsc_Private_Key = "dcb8b8242c7de5bbbb4f21711061e681811825a0d7215d5eede4d0df3bb6a7cd"
const Streak_Private_Key = "410ffc91fae09a6bff025a1e56eec76987b97334c1843fc37c20ce23925388c2"

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
    const cid1 = await BscSigner.getChainId();
    const bal1 = await BscSigner.getBalance();
    const addr1 = await BscSigner.getAddress();
    console.log('bsc balance:', bal1, 'addr:', addr1, 'cid:', cid1);
    const cid2 = await StreakSigner.getChainId();
    const bal2 = await StreakSigner.getBalance();
    const addr2 = await StreakSigner.getAddress();
    console.log('streak balance:', bal2, 'addr:', addr2, 'cid:', cid2);
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
main().then()