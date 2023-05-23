require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const Private_Key = "410ffc91fae09a6bff025a1e56eec76987b97334c1843fc37c20ce23925388c2"
const Bsc_Private_Key="e30c4dd594eecba7e0eb5abcb4c0ac59e152db66dbfecf1949d571cef0e687d0"

module.exports = {
  solidity: "0.8.17",
  networks: {
  	streak: {
  		url: `http://44.236.234.203:8545`,
  		accounts: [`0x${Private_Key}`],
      
      
  	},
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [`0x${Bsc_Private_Key}`]
       
  }
}
};
