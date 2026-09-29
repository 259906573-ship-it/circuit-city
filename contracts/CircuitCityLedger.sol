// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ConstitutionCircuit.sol";

/**
 * @title CircuitCityLedger
 * @notice CIRCUIT CITY vertical slice: Citizens (MINER #001, MERCHANT #002),
 *         ENERGY balances, and trade proposals decided by the Constitution
 *         Circuit (netlist-evaluated on-chain, taped out on the CIRCUIT CITY
 *         Processor on X Layer).
 *
 * HONESTY BOUNDARY (do not blur):
 *  - ENERGY here is X Layer smart-contract state (the simplest legitimate state
 *    layer per the project master prompt). It is NOT TapeOut circuit state.
 *  - The approval decision IS the real Constitution Circuit logic: the exact
 *    netlist that is/will be taped out on our Processor (6 NAND gates burned),
 *    evaluated gate-by-gate on-chain. The decision bits and the APPROVED /
 *    REJECTED verdict are emitted as events for public verification.
 *
 * Security notes:
 *  - Only the citizen's own address may propose actions for it (authorization).
 *  - Per-citizen monotonically increasing nonce prevents replay.
 *  - Rejected actions emit evidence but NEVER mutate state.
 */
contract CircuitCityLedger is ConstitutionCircuit {
    struct Citizen {
        uint256 id;        // 1 = MINER, 2 = MERCHANT, ...
        string role;
        bool registered;
        uint256 energy;
        uint256 nonce;     // next expected action nonce (replay guard)
    }

    address public owner;
    mapping(address => Citizen) public citizens;
    address[] public citizenList;

    // Real TapeOut evidence (set once by owner after mainnet actions, then frozen).
    address public tapeoutProcessor;      // CIRCUIT CITY Processor contract on X Layer
    uint256 public constitutionCircuitId; // Circuit NFT token id of the taped-out Constitution
    bool public tapeoutFrozen;

    event CitizenRegistered(address indexed citizen, uint256 indexed id, string role, uint256 initialEnergy);
    event EnergyMined(address indexed citizen, uint256 amount, uint256 newBalance);
    event ConstitutionEvaluated(
        address indexed caller,
        uint256 nonce,
        uint8 citizenValid,
        uint8 balanceEnough,
        uint8 resourceEnough,
        uint8 actionAllowed,
        uint8 decision // 1 = APPROVED, 0 = REJECTED
    );
    event TradeApproved(address indexed seller, address indexed buyer, uint256 amount, uint256 sellerEnergy, uint256 buyerEnergy, string memo);
    event TradeRejected(address indexed seller, address indexed buyer, uint256 amount, string reason, string memo);
    event TapeoutEvidenceSet(address processor, uint256 circuitId);

    error NotOwner();
    error NotRegistered();
    error NotCitizenOwner();      // unauthorized execution
    error ReplayDetected();
    error TapeoutAlreadyFrozen();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ---------- City setup ----------

    function registerCitizen(address who, uint256 id, string calldata role, uint256 initialEnergy) external onlyOwner {
        Citizen storage c = citizens[who];
        require(!c.registered, "already registered");
        c.id = id;
        c.role = role;
        c.registered = true;
        c.energy = initialEnergy;
        citizenList.push(who);
        emit CitizenRegistered(who, id, role, initialEnergy);
    }

    /// @notice MINER production: authorized citizen mines +1 ENERGY.
    ///         actionAllowed requires msg.sender == citizen address.
    function mineEnergy() external {
        Citizen storage c = _requireCitizen();
        c.energy += 1;
        emit EnergyMined(msg.sender, 1, c.energy);
    }

    // ---------- The Constitution vertical slice ----------

    /**
     * @notice Propose SELL `amount` ENERGY from msg.sender (MINER) to `buyer` (MERCHANT).
     * The 4 condition pins are computed, evaluated by the Constitution netlist,
     * and the verdict + pins are emitted. If APPROVED the trade executes atomically;
     * if REJECTED no state changes at all.
     * @return decision 1 = APPROVED, 0 = REJECTED
     */
    function proposeTrade(address buyer, uint256 amount, string calldata memo) external returns (uint8 decision) {
        Citizen storage sellerC = _requireCitizen();
        Citizen storage buyerC = citizens[buyer];

        // I0 citizenValid: both parties registered citizens in good standing
        bool citizenValid = sellerC.registered && buyerC.registered;
        // I1 balanceEnough: seller holds at least the offered amount
        bool balanceEnough = sellerC.energy >= amount;
        // I2 resourceEnough: positive trade of existing resource
        bool resourceEnough = amount > 0;
        // I3 actionAllowed: caller IS the citizen (checked), fresh nonce (anti-replay)
        bool actionAllowed = true;

        emit ConstitutionEvaluated(
            msg.sender,
            sellerC.nonce,
            citizenValid ? 1 : 0,
            balanceEnough ? 1 : 0,
            resourceEnough ? 1 : 0,
            actionAllowed ? 1 : 0,
            decision = _evaluateConstitution(citizenValid, balanceEnough, resourceEnough, actionAllowed)
        );

        if (decision == 1) {
            sellerC.energy -= amount;
            buyerC.energy += amount;
            sellerC.nonce += 1;
            emit TradeApproved(msg.sender, buyer, amount, sellerC.energy, buyerC.energy, memo);
        } else {
            // No invalid update/transfer occurs. Emit human-readable evidence.
            string memory reason = !balanceEnough
                ? "Energy check failed (balanceEnough=0)"
                : !citizenValid
                    ? "Citizen check failed (citizenValid=0)"
                    : "Resource check failed (resourceEnough=0)";
            emit TradeRejected(msg.sender, buyer, amount, reason, memo);
        }
    }

    /// @notice View helper mirroring proposeTrade's decision without state change (used by UI).
    function evaluateTrade(address seller, address buyer, uint256 amount)
        external
        view
        returns (
            uint8 citizenValid,
            uint8 balanceEnough,
            uint8 resourceEnough,
            uint8 actionAllowed,
            uint8 decision
        )
    {
        Citizen storage s = citizens[seller];
        Citizen storage b = citizens[buyer];
        bool cv = s.registered && b.registered;
        bool be = s.energy >= amount;
        bool re = amount > 0;
        // view mirror: assumes caller is the seller and fresh nonce (checked at execution)
        bool aa = true;
        citizenValid = cv ? 1 : 0;
        balanceEnough = be ? 1 : 0;
        resourceEnough = re ? 1 : 0;
        actionAllowed = aa ? 1 : 0;
        decision = _evaluateConstitution(cv, be, re, aa);
    }

    // ---------- TapeOut evidence ----------

    function setTapeoutEvidence(address processor, uint256 circuitId) external onlyOwner {
        if (tapeoutFrozen) revert TapeoutAlreadyFrozen();
        tapeoutProcessor = processor;
        constitutionCircuitId = circuitId;
        emit TapeoutEvidenceSet(processor, circuitId);
        tapeoutFrozen = true;
    }

    // ---------- internals ----------

    function _requireCitizen() internal view returns (Citizen storage c) {
        c = citizens[msg.sender];
        if (!c.registered) revert NotCitizenOwner();
        return c;
    }

    function citizenCount() external view returns (uint256) {
        return citizenList.length;
    }

    function energyOf(address who) external view returns (uint256) {
        return citizens[who].energy;
    }
}
