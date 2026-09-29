// CIRCUIT CITY — Constitution Circuit simulator
// Faithful to TapeOut semantics: every gate is a NAND; inputs are pointers to other element outputs.
// This same netlist file is the single source of truth for: JS simulation, Solidity parity port,
// and the canvas wiring that will be taped out on the CIRCUIT CITY Processor (X Layer).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const netlist = JSON.parse(readFileSync(join(__dirname, "constitution.netlist.json"), "utf8"));

/**
 * Evaluate the Constitution netlist.
 * @param {{citizenValid:0|1, balanceEnough:0|1, resourceEnough:0|1, actionAllowed:0|1}} inputs
 * @returns {{approved:0|1, trace:Array<{id:string,type:string,a:0|1,b:0|1,out:0|1}>}}
 */
export function evaluate(inputs) {
  const pins = {
    I0: inputs.citizenValid ? 1 : 0,
    I1: inputs.balanceEnough ? 1 : 0,
    I2: inputs.resourceEnough ? 1 : 0,
    I3: inputs.actionAllowed ? 1 : 0,
  };
  const trace = [];
  for (const g of netlist.gates) {
    if (g.type !== "NAND") throw new Error(`unsupported element ${g.type} — TapeOut v1 netlist uses NAND only`);
    const a = pins[g.a];
    const b = pins[g.b];
    if (a === undefined || b === undefined) throw new Error(`dangling input pointer on ${g.id}`);
    const out = a && b ? 0 : 1; // NAND
    pins[g.id] = out;
    trace.push({ id: g.id, type: "NAND", a, b, out });
  }
  const approved = pins[netlist.outputs.O0];
  return { approved, trace };
}

/** Bit order: citizenValid,balanceEnough,resourceEnough,actionAllowed (matches master prompt vectors like 1101). */
export function fromBits(bits) {
  const s = String(bits).padStart(4, "0").split("").map(Number);
  if (s.some((b) => b !== 0 && b !== 1)) throw new Error("bits must be 0/1");
  return { citizenValid: s[0], balanceEnough: s[1], resourceEnough: s[2], actionAllowed: s[3] };
}

export { netlist };
