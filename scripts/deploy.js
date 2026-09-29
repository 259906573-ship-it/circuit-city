// Deploy CircuitCityLedger to X Layer mainnet.
// Requires: DEPLOYER_PRIVATE_KEY in env (never commit), OKB for gas.
// Run: npx hardhat run scripts/deploy.js --network xlayer
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying CircuitCityLedger with", deployer.address);
  console.log("Network:", hre.network.name, "chainId", hre.network.config.chainId);
  if (hre.network.config.chainId !== 196 && hre.network.name === "xlayer") {
    throw new Error("Refusing to deploy: X Layer mainnet must be chainId 196");
  }

  const Ledger = await hre.ethers.getContractFactory("CircuitCityLedger");
  const ledger = await Ledger.deploy();
  await ledger.waitForDeployment();
  const addr = await ledger.getAddress();
  console.log("CircuitCityLedger deployed at:", addr);
  console.log("Explorer:", `https://www.okx.com/web3/explorer/xlayer/address/${addr}`);

  // Register the two demo citizens (runbook step; kept here for one-shot deploy)
  const [miner, merchant] = await hre.ethers.getSigners();
  if (miner.address !== deployer.address) {
    console.log("NOTE: register MINER/MERCHANT with the SAME deployer wallet or adjust script.");
  }
  await (await ledger.registerCitizen(deployer.address, 1, "MINER", 5)).wait();
  // MERCHANT needs a second wallet address; pass via env MERCHANT_ADDRESS
  const merchantAddr = process.env.MERCHANT_ADDRESS;
  if (merchantAddr) {
    await (await ledger.registerCitizen(merchantAddr, 2, "MERCHANT", 0)).wait();
    console.log("MERCHANT registered:", merchantAddr);
  } else {
    console.log("MERCHANT_ADDRESS not set — register MERCHANT later via registerCitizen().");
  }
  console.log("MINER #001 registered:", deployer.address, "with 5 ENERGY");
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
