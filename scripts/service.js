require('dotenv').config();

const STREAK_API_URL=process.env.STREAK_API_URL;
const STREAK_PRIVATE_KEY = process.env.STREAK_PRIVATE_KEY;
const STREAK_CONTRACT_ADDRESS = process.env.STREAK_CONTRACT_ADDRESS;
const BSC_API_URL=process.env.BSC_API_URL;
const BSC_PRIVATE_KEY = process.env.BSC_PRIVATE_KEY;
const BSC_CONTRACT_ADDRESS = process.env.BSC_CONTRACT_ADDRESS;
const {
  ethers
} = require("ethers");
const streakcontract = require("../artifacts/contracts/BridgeStreak.sol/BridgeStreak.json");


const bsccontract = require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json");

// console.log("module: ", ethers);

const bscprovider = new ethers.JsonRpcProvider(BSC_API_URL);
bscprovider.pollingInterval=100;
const bscsigner = new ethers.Wallet(BSC_PRIVATE_KEY, bscprovider);
const BridgeBsc = new ethers.Contract(BSC_CONTRACT_ADDRESS, bsccontract.abi, bscsigner);


const streakprovider = new ethers.JsonRpcProvider(STREAK_API_URL);
streakprovider.pollingInterval=200
const streaksigner = new ethers.Wallet(STREAK_PRIVATE_KEY, streakprovider);
const BridgeStreak = new ethers.Contract(STREAK_CONTRACT_ADDRESS, streakcontract.abi, streaksigner);

async function main() {
    BridgeStreak.on("Locked", async (from,to,amount) => {
        console.log(amount)
         const tx=await BridgeBsc.mintWrapped(from,to,amount,{ gasPrice: ethers.parseUnits('6','gwei').toString(),
         gasLimit: 177302});
         tx.wait();
        console.log(`${ from } locked ${amount.toString()} on STREAK Chain`);
    });
    BridgeBsc.on("BurnWrappedStreak", async(from, to,amount) => {
        console.log(amount)
        const tx= await BridgeStreak.unlock(to,{value:amount,  gasPrice: ethers.parseUnits('6','gwei').toString(),
        gasLimit: 177302});
        tx.wait()
       console.log(`Unlocked ${amount} on ${to} address on STREAK Chain`);
   });
     
   BridgeStreak.on("Unlocked", (to,amount,data) => {
    console.log("data : ", data)
});
BridgeBsc.on("MintWrappedStreak", (from,to, amount,data) => {
    console.log("data : ", data)
});
}
main();