// CIRCUIT CITY — P0 contract tests (Hardhat)
// Master prompt §21 required tests:
//   1. 5 ENERGY -> SELL 3 -> APPROVED -> correct update
//   2. 2 ENERGY -> SELL 10 -> REJECTED -> no invalid update
//   3. Unauthorized execution -> reject
// Plus: Constitution decision logic parity, replay/authorization, evidence events.
const { expect } = require("chai");
const { ethers } = require("hardhat");

const ONE = 1n;
const ZERO = 0n;

describe("ConstitutionCircuit (on-chain netlist evaluator)", function () {
  async function deployLedger() {
    const [owner, miner, merchant, intruder] = await ethers.getSigners();
    const Ledger = await ethers.getContractFactory("CircuitCityLedger");
    const ledger = await Ledger.deploy();
    await ledger.waitForDeployment();
    // MINER #001 starts with 5 ENERGY (demo setup), MERCHANT #002 with 0
    await ledger.registerCitizen(miner.address, 1, "MINER", 5);
    await ledger.registerCitizen(merchant.address, 2, "MERCHANT", 0);
    return { ledger, owner, miner, merchant, intruder };
  }

  it("evaluates 1111 -> APPROVED (decision=1)", async function () {
    const { ledger, miner, merchant } = await deployLedger();
    const [cv, be, re, aa, decision] = await ledger.evaluateTrade(miner.address, merchant.address, 3);
    expect([cv, be, re, aa, decision]).to.deep.equal([ONE, ONE, ONE, ONE, ONE]);
  });

  it("evaluates 1101 (balanceEnough=0) -> REJECTED (decision=0)", async function () {
    const { ledger, miner, merchant } = await deployLedger();
    const [cv, be, re, aa, decision] = await ledger.evaluateTrade(miner.address, merchant.address, 10);
    expect([cv, be, re, aa, decision]).to.deep.equal([ONE, ZERO, ONE, ONE, ZERO]);
  });

  it("evaluates unregistered counterpart as citizenValid=0 -> REJECTED", async function () {
    const { ledger, miner, intruder } = await deployLedger();
    const [cv, , , , decision] = await ledger.evaluateTrade(miner.address, intruder.address, 1);
    expect(cv).to.equal(ZERO);
    expect(decision).to.equal(ZERO);
  });
});

describe("P0 required demos", function () {
  async function deployLedger() {
    const [owner, miner, merchant, intruder] = await ethers.getSigners();
    const Ledger = await ethers.getContractFactory("CircuitCityLedger");
    const ledger = await Ledger.deploy();
    await ledger.waitForDeployment();
    await ledger.registerCitizen(miner.address, 1, "MINER", 5);
    await ledger.registerCitizen(merchant.address, 2, "MERCHANT", 0);
    return { ledger, owner, miner, merchant, intruder };
  }

  it("VALID: MINER #001 (5 ENERGY) SELL 3 to MERCHANT #002 -> APPROVED -> correct update", async function () {
    const { ledger, miner, merchant } = await deployLedger();

    const tx = await ledger.connect(miner).proposeTrade(merchant.address, 3, "demo: sell 3 energy");
    const receipt = await tx.wait();

    // Constitution evaluated with all pins = 1, decision = APPROVED
    const ev = receipt.logs
      .map((l) => { try { return ledger.interface.parseLog(l); } catch { return null; } })
      .filter(Boolean);
    const evaluated = ev.find((e) => e.name === "ConstitutionEvaluated");
    expect(evaluated.args.decision).to.equal(ONE);
    expect([evaluated.args.citizenValid, evaluated.args.balanceEnough, evaluated.args.resourceEnough, evaluated.args.actionAllowed])
      .to.deep.equal([ONE, ONE, ONE, ONE]);
    expect(ev.find((e) => e.name === "TradeApproved")).to.not.be.undefined;

    // Correct state update
    expect(await ledger.energyOf(miner.address)).to.equal(2n);
    expect(await ledger.energyOf(merchant.address)).to.equal(3n);
  });

  it("INVALID: MINER #001 (2 ENERGY) attempts SELL 10 -> REJECTED -> no invalid update", async function () {
    const { ledger, miner, merchant } = await deployLedger();
    // Precondition of the demo: balance is now 2 (5 - 3 from the valid demo)
    await ledger.connect(miner).proposeTrade(merchant.address, 3, "reduce to 2 energy");
    expect(await ledger.energyOf(miner.address)).to.equal(2n);

    const tx = await ledger.connect(miner).proposeTrade(merchant.address, 10, "demo: invalid sell 10");
    const receipt = await tx.wait();
    const ev = receipt.logs
      .map((l) => { try { return ledger.interface.parseLog(l); } catch { return null; } })
      .filter(Boolean);
    const evaluated = ev.find((e) => e.name === "ConstitutionEvaluated");
    expect(evaluated.args.balanceEnough).to.equal(ZERO);
    expect(evaluated.args.decision).to.equal(ZERO);
    expect(ev.find((e) => e.name === "TradeRejected")).to.not.be.undefined;
    expect(ev.find((e) => e.name === "TradeApproved")).to.be.undefined;

    // No invalid update/transfer occurs
    expect(await ledger.energyOf(miner.address)).to.equal(2n);
    expect(await ledger.energyOf(merchant.address)).to.equal(3n);
  });

  it("Unauthorized execution (non-citizen address) -> rejected", async function () {
    const { ledger, intruder, merchant } = await deployLedger();
    await expect(
      ledger.connect(intruder).proposeTrade(merchant.address, 1, "unauthorized")
    ).to.be.revertedWithCustomError(ledger, "NotCitizenOwner");
  });

  it("OWNER cannot be hijacked by non-owner registration", async function () {
    const { ledger, intruder, merchant } = await deployLedger();
    await expect(
      ledger.connect(intruder).registerCitizen(intruder.address, 3, "FAKE", 100)
    ).to.be.revertedWithCustomError(ledger, "NotOwner");
  });

  it("Tapeout evidence can be set once and then is frozen", async function () {
    const { ledger, owner } = await deployLedger();
    const fakeProcessor = await ethers.Wallet.createRandom().getAddress();
    await ledger.setTapeoutEvidence(fakeProcessor, 7n);
    expect(await ledger.tapeoutProcessor()).to.equal(fakeProcessor);
    expect(await ledger.constitutionCircuitId()).to.equal(7n);
    await expect(ledger.setTapeoutEvidence(fakeProcessor, 8n)).to.be.revertedWithCustomError(ledger, "TapeoutAlreadyFrozen");
  });
});
