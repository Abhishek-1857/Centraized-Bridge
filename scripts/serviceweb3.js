
const { Web3 } = require("web3")

const { ethers } = require("ethers")

const provider = new ethers.WebSocketProvider("wss://testnet.binance.vision/ws-api/v3")

// provider.on("block", async (n) => {

//     const block = await provider.getBlock(n);

//     console.log(block.number.toString());
// });

// provider.on("BurnWrappedStreak", (dd) => {
//     console.log("event data", dd)
// })

// provider.on("block", async (n) => {

//     const block = await provider.getBlock(n);

//     console.log(block.number.toString());
// });