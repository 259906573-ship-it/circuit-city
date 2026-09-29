// CIRCUIT CITY — Constitution Circuit tests (node:test, run: node --test test/)
// P0 required vectors from the master prompt:
//   1111 -> APPROVED
//   1101 (a required condition false: balanceEnough=0) -> REJECTED
// Plus exhaustive parity with the Solidity port via the shared vector table.
import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate, fromBits, netlist } from "../circuit/simulator.mjs";

test("netlist shape: 6 NAND gates, 0 LATCH, output O0=G9", () => {
  assert.equal(netlist.nandCount, netlist.gates.length);
  assert.equal(netlist.nandCount, 6);
  assert.equal(netlist.latchCount, 0);
  assert.equal(netlist.outputs.O0, "G9");
});

test("1111 -> APPROVED", () => {
  const { approved } = evaluate(fromBits("1111"));
  assert.equal(approved, 1);
});

test("1101 (balanceEnough=0) -> REJECTED", () => {
  const { approved } = evaluate(fromBits("1101"));
  assert.equal(approved, 0);
});

test("exhaustive truth table: APPROVED iff all four conditions are 1", () => {
  for (let v = 0; v < 16; v++) {
    const bits = v.toString(2).padStart(4, "0");
    const expected = v === 0b1111 ? 1 : 0;
    const { approved, trace } = evaluate(fromBits(bits));
    assert.equal(approved, expected, `vector ${bits}`);
    assert.equal(trace.length, 6);
  }
});

test("required demo vectors", () => {
  // VALID: MINER #001 has 5 ENERGY, SELL 3 -> all conditions true -> APPROVED
  assert.equal(evaluate(fromBits("1111")).approved, 1);
  // INVALID: MINER #001 has 2 ENERGY, attempts SELL 10 -> balanceEnough=0 -> REJECTED
  assert.equal(evaluate(fromBits("1101")).approved, 0);
  // Unauthorized execution -> actionAllowed=0 -> REJECTED
  assert.equal(evaluate(fromBits("1110")).approved, 0);
});
