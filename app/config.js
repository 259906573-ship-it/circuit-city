// CIRCUIT CITY — deployment config.
// Values here are REAL once filled; empty string = not yet deployed (UI shows honest PENDING state).
// NEVER put private keys in this file.
window.CIRCUIT_CITY_CONFIG = {
  NETWORK: {
    chainIdHex: "0xc4", // 196
    chainId: 196,
    name: "X Layer mainnet",
    rpcUrls: ["https://rpc.xlayer.tech", "https://xlayerrpc.okx.com"],
    explorer: "https://www.okx.com/web3/explorer/xlayer",
    currency: { name: "OKB", symbol: "OKB", decimals: 18 },
  },
  // CircuitCityLedger contract on X Layer mainnet (fill after deploy.js)
  LEDGER_ADDRESS: "",
  // Real TapeOut evidence (fill after Processor creation + Constitution tape-out on tapeout.net)
  PROCESSOR_ADDRESS: "",
  CONSTITUTION_CIRCUIT_ID: "",
  // Citizen wallet addresses (MINER #001 / MERCHANT #002), fill after wallet setup
  MINER_ADDRESS: "",
  MERCHANT_ADDRESS: "",
  DEMO: {
    VALID_SELL_AMOUNT: 3,   // MINER #001 has 5 ENERGY -> SELL 3 -> APPROVED
    INVALID_SELL_AMOUNT: 10, // MINER #001 has 2 ENERGY -> SELL 10 -> REJECTED
  },
};
