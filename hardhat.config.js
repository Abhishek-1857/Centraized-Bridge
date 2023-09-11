require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
const Bsc_Private_Key="dcb8b8242c7de5bbbb4f21711061e681811825a0d7215d5eede4d0df3bb6a7cd"
const Streak_Private_Key = "e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"

module.exports = {
  solidity: "0.8.17",
  networks: {
  	streakTestnet: {
  		url: `http://44.236.234.203:8545`,
  		accounts: [`0x${Streak_Private_Key}`],
      
      
  	},
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [`0x${Bsc_Private_Key}`]
       
  }
}
};