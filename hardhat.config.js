require("@nomicfoundation/hardhat-toolbox");

// CIRCUIT CITY — target network is X Layer mainnet (Chain ID 196).
// NEVER put private keys in this file or any committed file.
// For deployment the user runs with --network xlayer and a key from env:
//   export DEPLOYER_PRIVATE_KEY=...   (local only, never commit)
const XLAYER = {
  chainId: 196,
  urls: ["https://rpc.xlayer.tech", "https://xlayerrpc.okx.com"],
  explorer: "https://www.okx.com/web3/explorer/xlayer",
  currency: "OKB",
};

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    xlayer: {
      url: XLAYER.urls[0],
      chainId: XLAYER.chainId,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
  },
};
