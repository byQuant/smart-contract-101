import { ethers } from "hardhat";

const deployContract = async (ethers: any, provider: any, root: any) => {
  const ops = {
    gasLimit: 10000000,
    maxFeePerGas: "1000000000000",
    maxPriorityFeePerGas: "1000000000000",
  };
  const BinCoinContract = await ethers.getContractFactory("BinCoin");
  const binCoinContract = await BinCoinContract.connect(root).deploy(
    root.address,
    ops
  );


  console.log("BinCoin:", binCoinContract.address);
  console.log(await binCoinContract.totalSupply());
};

const main = async () => {
  const rootPrivateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545",
    31337
  );
  const root = new ethers.Wallet(rootPrivateKey).connect(provider);
  await deployContract(ethers, provider, root);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});