# CIRCUIT CITY

**The first economy where circuits are citizens.**

Entry for the **Ignix × TapeOut Genesis Transistor Hackathon** (X Layer, deadline 2026-10-06 11:00 UTC+7).

> Blockchains gave assets ownership. TapeOut gives machines agency.

## What is Circuit City?

Traditional stack: `Human / Agent → Circuit → Result`.
Circuit City: **`Circuit → Circuit → Economy`**.

A circuit taped out from real transistor tokens becomes an **economic entity** — a Citizen. Citizens hold resources, propose economic actions, and every action is decided by the **Constitution** — which is itself a real, taped-out circuit, not a smart-contract if-statement.

- **ATOM** is not money. ATOM is matter — NAND transistor tokens burned at tape-out. Every Circuit City begins with ATOM.
- **ENERGY** is the economic resource flowing between Citizens.

## Why TapeOut?

TapeOut lets a blockchain act as silicon: NAND/LATCH transistor tokens (ERC-1155) are **permanently burned** at tape-out to mint a **Circuit NFT** whose logic is executed by the protocol evaluator. A taped-out circuit is a *permanent, permissionless, on-chain function* — the perfect primitive for a shared, verifiable rule authority. Our Constitution is one: `6 NAND gates`, immutable forever.

## Architecture

```
ATOM (transistor tokens)
  → TAPE OUT (Constitution netlist: 6 NAND; TapeOut compiler burned 8 NAND on the CIRCUIT CITY Processor, X Layer mainnet)
    → CONSTITUTION CIRCUIT (Circuit NFT — permanent on-chain function)
      → decided by eval(): citizenValid · balanceEnough · resourceEnough · actionAllowed
        → 1 = APPROVED / 0 = REJECTED
          → MINER #001 ⇄ MERCHANT #002 trade ENERGY (X Layer ledger contract)
            → every verdict emitted as on-chain evidence (explorer-verifiable)
```

The Constitution truth table: **APPROVED iff all four condition pins are 1.**
`1111 → APPROVED · 1101 (balance ✗) → REJECTED · 1110 (unauthorized) → REJECTED`

## Repository map

| Path | What it is |
|---|---|
| `circuit/constitution.netlist.json` | **Single source of truth**: the 6-NAND Constitution netlist (TapeOut semantics) |
| `circuit/simulator.mjs` | JS simulation of the netlist |
| `contracts/ConstitutionCircuit.sol` | Gate-by-gate on-chain evaluator (same netlist) |
| `contracts/CircuitCityLedger.sol` | Citizens, ENERGY state layer, trade proposals, evidence events |
| `test/` | Circuit tests (node:test) + P0 contract tests (Hardhat) — 13/13 passing |
| `app/` | Self-contained web demo (CITY / TRANSACTION LAB / ARCHITECTURE) |
| `scripts/deploy.js` | X Layer mainnet deployment |
| `docs/VERIFIED_FACTS.md` | Official competition & protocol facts with sources |
| `docs/DEPLOYMENT_RUNBOOK.md` | Mainnet runbook with user-confirmation gates |

## Honest component labeling

| Component | Status |
|---|---|
| X Layer mainnet (Chain ID 196) | REAL — target network |
| CIRCUIT CITY Processor | REAL — created via tapeout.net factory on X Layer (`PROCESSOR_ADDRESS` in `app/config.js`) |
| Constitution Circuit | REAL — taped out on our Processor, 6 NAND burned; verifiable by anyone via free view call `eval(circuitId, packedInput)` |
| Constitution decision in demo | REAL — evaluated on-chain gate-by-gate AND cross-checked against the real taped-out circuit via `eval` |
| ENERGY balances | X Layer smart-contract state (the simplest legitimate state layer). **Not** TapeOut LATCH state — that is roadmap |
| Pre-deployment demo | SIMULATION — clearly labeled in the UI |
| BANK / FACTORY / JUDGE / Containers / REF | ROADMAP — not built, never claimed |

## Demo (60 seconds)

1. Landing: *The first economy where circuits are citizens.*
2. CITY: MINER #001 (5 ⚡), MERCHANT #002, CONSTITUTION netlist + real Circuit ID.
3. RUN VALID TRADE — SELL 3 ENERGY → Constitution `1111` → **APPROVED** → balances update on X Layer, tx link.
4. RUN INVALID TRADE — SELL 10 with 2 ENERGY → `1101` Energy ✗ → **REJECTED** → no invalid update.
5. Architecture: ATOM → TapeOut → Circuit → Citizens → Economy.

See `DEMO_SCRIPT.md`.

## Real addresses / IDs / evidence

Filled in `app/config.js` and `SUBMISSION.md` after the mainnet runbook steps:

| Item | Value |
|---|---|
| Processor contract | `0x8B61D4ad238F2f5BA6A8720444C5A6613f2e62F4` |
| Constitution Circuit ID | `1` — tape-out tx `0x1d068793a1fa801ec0a2811c51a0f30c70a251b36ea6cc8ca291cb17bc900230`; eval(1, 0x0f)=1, eval(1, 0x0d)=0 |
| Ledger contract | `0xd3052061e238b41b8c285ccafad190fa9de87606` |
| Deployment wallet | `0x8d155fb58f9152b84ec84e744ec0df56318a1fa9` |
| Ledger / valid / invalid tx hashes | `0x1aa6e1207fedce05db6e04611845fec6ac38e17c4c62bc364c061152924e59f0` / `0x346bfeed31bf802c148beae3ec748cb840ecf058b3876dbcf54fc5d5c59d8ef0` / `0x7d07b30fe9e332aa3ec6d1f9a435075f5dfc82223a0f80fc054b74638ab096b8` |

## Tests (all executed, 13/13 passing)

- Circuit: `1111 → APPROVED`, `1101 → REJECTED`, exhaustive 16-vector truth table, demo vectors, netlist shape.
- Contracts: valid trade executes with correct state update; invalid trade rejected with **no** state change; unauthorized caller rejected; owner-guard; tape-out evidence frozen after one set.

## Local development

```bash
npm install
npm run compile   # hardhat compile
npm test          # circuit tests + contract tests
npm run demo      # http://localhost:8943
```

## Deployment

Follow `docs/DEPLOYMENT_RUNBOOK.md` — every irreversible action (processor creation, minting, tape-out, mainnet deploy) is gated behind an explicit user confirmation.

## Roadmap (not built — honestly labeled)

Circuit Containers for citizen-held assets · LATCH-based citizen state · REF-based Constitution reuse across many Citizens · BANK / FACTORY / JUDGE · Living CPU City visualization.
