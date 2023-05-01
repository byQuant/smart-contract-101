import { ethers } from "hardhat";

const deployContract = async (
  ethers: any,
  provider: any,
  root: any,
  user1: any,
  user2: any,
  user3: any
) => {
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

  console.log("BinCoin Address: ", binCoinContract.address);
  console.log("Total Supply: ", await binCoinContract.totalSupply());

  await binCoinContract.connect(root).transfer(user1.address, "1000000000000000000");
  await binCoinContract.connect(root).transfer(user2.address, "2000000000000000000");
  await binCoinContract.connect(root).transfer(user3.address, "3000000000000000000");

  console.log("User1 Balance: ", await binCoinContract.balanceOf(user1.address));
  console.log("User2 Balance: ", await binCoinContract.balanceOf(user2.address));
  console.log("User3 Balance: ", await binCoinContract.balanceOf(user3.address));

  await binCoinContract
    .connect(user1)
    .issueLottery(12908, "1000000000000000000", "10000000000000000");
  // console.log(issueLottery);
  console.log("Reward: ", await binCoinContract.getReward());
  console.log("User1 Balance: ", await binCoinContract.balanceOf(user1.address));


  await binCoinContract.connect(user2).guessLottery(4483);
  console.log("User2 Balance: ", await binCoinContract.balanceOf(user2.address));


  await binCoinContract.connect(user2).guessLottery(8021);
  console.log("User2 Balance: ", await binCoinContract.balanceOf(user2.address));

  await binCoinContract.connect(user3).guessLottery(4493);
  console.log("User3 Balance: ", await binCoinContract.balanceOf(user3.address));

  console.log("Stake ", await binCoinContract.getStake());

  await binCoinContract.connect(user3).guessLottery(12908);
  console.log("User3 Balance: ", await binCoinContract.balanceOf(user3.address));
  console.log("User1 Balance: ", await binCoinContract.balanceOf(user1.address));

  console.log("Reward ", await binCoinContract.getReward());
  console.log("Stake ", await binCoinContract.getStake());


};

const main = async () => {
  const rootPrivateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const user1PrivateKey =
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
  const user2PrivateKey =
    "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
  const user3PrivateKey =
    "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6";
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545",
    31337
  );
  const root = new ethers.Wallet(rootPrivateKey).connect(provider);
  const user1 = new ethers.Wallet(user1PrivateKey).connect(provider);
  const user2 = new ethers.Wallet(user2PrivateKey).connect(provider);
  const user3 = new ethers.Wallet(user3PrivateKey).connect(provider);

  await deployContract(ethers, provider, root, user1, user2, user3);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
