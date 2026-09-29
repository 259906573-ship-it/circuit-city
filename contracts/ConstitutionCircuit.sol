// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ConstitutionCircuit
 * @notice On-chain evaluator for the CIRCUIT CITY Constitution Circuit.
 *
 * This is a literal Solidity port of the single-source-of-truth netlist
 * `circuit/constitution.netlist.json` (TapeOut semantics: every gate is a NAND,
 * inputs are pointers to other element outputs). The same netlist is:
 *   1. simulated in JS       (circuit/simulator.mjs)
 *   2. evaluated here        (this contract, on X Layer)
 *   3. drawn on tapeout.net and taped out on the CIRCUIT CITY Processor,
 *      burning 6 real NAND transistor tokens into a real Circuit NFT.
 *
 * The gate ids below match the netlist ids exactly so any auditor can compare
 * the on-chain evaluation to the taped-out circuit gate by gate.
 */
abstract contract ConstitutionCircuit {
    /// @notice Evaluate the Constitution netlist for the 4 condition inputs.
    /// @return approved 1 = APPROVED, 0 = REJECTED (output pin O0 = G9)
    function _evaluateConstitution(
        bool citizenValid,    // I0
        bool balanceEnough,   // I1
        bool resourceEnough,  // I2
        bool actionAllowed    // I3
    ) internal pure returns (uint8 approved) {
        // G4 = NAND(I0, I1)
        uint8 g4 = _nand(citizenValid, balanceEnough);
        // G5 = NAND(G4, G4)  -> I0 AND I1
        uint8 g5 = _nand(g4, g4);
        // G6 = NAND(I2, I3)
        uint8 g6 = _nand(resourceEnough, actionAllowed);
        // G7 = NAND(G6, G6)  -> I2 AND I3
        uint8 g7 = _nand(g6, g6);
        // G8 = NAND(G5, G7)
        uint8 g8 = _nand(g5, g7);
        // G9 = NAND(G8, G8)  -> O0 = APPROVED
        uint8 g9 = _nand(g8, g8);
        approved = g9;
    }

    function _nand(uint8 a, uint8 b) internal pure returns (uint8) {
        return (a == 1 && b == 1) ? 0 : 1;
    }

    function _nand(bool a, bool b) internal pure returns (uint8) {
        return (a && b) ? 0 : 1;
    }
}
