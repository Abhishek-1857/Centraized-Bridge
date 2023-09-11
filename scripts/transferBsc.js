require('dotenv').config();

const BSC_API_URL=process.env.BSC_API_URL;
const PRIVATE_KEY = "dcb8b8242c7de5bbbb4f21711061e681811825a0d7215d5eede4d0df3bb6a7cd";
const CONTRACT_ADDRESS = process.env.BSC_CONTRACT_ADDRESS;
const {
  ethers
} = require("ethers");
const contract = require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json");

// console.log(JSON.stringify(contract.abi));

const provider = new ethers.JsonRpcProvider(BSC_API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const BridgeBsc = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    console.log("Transfering your Assets....")
    const amount  =  1
  const tx = await BridgeBsc.burnWrapped("0x4E95Db6F99900C94a09E2F27Ee0D36e6fb81d71e", amount,{gasPrice: ethers.parseUnits('6','gwei').toString(),
  gasLimit: 177302})
  // const tx=await BridgeBsc.mintWrapped("0x4E95Db6F99900C94a09E2F27Ee0D36e6fb81d71e","0xb0276982D8F85A530D10A09208b08D9C1b3A7F7d",amount,{ gasPrice: ethers.utils.parseUnits('6','gwei').toString(),
  // gasLimit: 177302});
  // const tx=await BridgeBsc.mint(amount,{ gasPrice: ethers.parseUnits('6','gwei').toString(),
  // gasLimit: 177302});
    console.log("Wait while transaction is processing....")
    await tx.wait()
    console.log(tx.hash)
}
main();