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
  LEDGER_ADDRESS: "0xd3052061e238b41b8c285ccafad190fa9de87606",
  // Real TapeOut evidence (fill after Processor creation + Constitution tape-out on tapeout.net)
  PROCESSOR_ADDRESS: "0x8B61D4ad238F2f5BA6A8720444C5A6613f2e62F4", // verified on-chain: name=CIRCUIT CITY, symbol=CONSTITUTION CPU
  CONSTITUTION_CIRCUIT_ID: "1", // X Layer tape-out tx 0x1d068793a1fa801ec0a2811c51a0f30c70a251b36ea6cc8ca291cb17bc900230
  // Citizen wallet addresses (MINER #001 / MERCHANT #002)
  MINER_ADDRESS: "0x8d155fb58f9152b84ec84e744ec0df56318a1fa9",
  MERCHANT_ADDRESS: "0x93bf59d2128a1f7c8366d8091c31efa3f62842d3",
  DEMO: {
    VALID_SELL_AMOUNT: 3,   // MINER #001 has 5 ENERGY -> SELL 3 -> APPROVED
    INVALID_SELL_AMOUNT: 10, // MINER #001 has 2 ENERGY -> SELL 10 -> REJECTED
  },
};
