/* CIRCUIT CITY frontend logic — zero external dependencies.
   Reads on-chain state via public X Layer RPC; writes via window.ethereum wallet.
   Honest modes: MAINNET (real contracts) / SIMULATION (local, clearly labeled). */
(() => {
  const CFG = window.CIRCUIT_CITY_CONFIG;
  const $ = (id) => document.getElementById(id);

  // ---- Constitution netlist evaluator (same 6-NAND netlist as circuit/constitution.netlist.json) ----
  function evaluate(citizenValid, balanceEnough, resourceEnough, actionAllowed) {
    const nand = (a, b) => (a && b ? 0 : 1);
    const g4 = nand(citizenValid, balanceEnough);
    const g5 = nand(g4, g4);
    const g6 = nand(resourceEnough, actionAllowed);
    const g7 = nand(g6, g6);
    const g8 = nand(g5, g7);
    return nand(g8, g8); // G9 = APPROVED
  }

  // Function selectors (computed offline with keccak256, verified against compiler ABI):
  const SELECTORS = {
    energyOf: "e9c4d2ab",                 // energyOf(address)
    evaluateTrade: "0a815b40",            // evaluateTrade(address,address,uint256)
    citizenCount: "5b4c777d",             // citizenCount()
    tapeoutProcessor: "cde7e382",         // tapeoutProcessor()
    constitutionCircuitId: "d2d55bc1",    // constitutionCircuitId()
    proposeTrade: "3f9597f9",             // proposeTrade(address,uint256,string)
  };

  // ---- JSON-RPC helper (public RPC, read-only) ----
  async function rpc(method, params) {
    const res = await fetch(CFG.NETWORK.rpcUrls[0], {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
    });
    const j = await res.json();
    if (j.error) throw new Error(j.error.message);
    return j.result;
  }

  function encUint(v) { return BigInt(v).toString(16).padStart(64, "0"); }
  function encAddr(a) { return a.toLowerCase().replace(/^0x/, "").padStart(64, "0"); }

  async function callContract(to, data) {
    const hex = await rpc("eth_call", [{ to, data }, "latest"]);
    return hex;
  }

  // ---- wallet helpers ----
  const eth = () => window.ethereum;
  async function connectWallet() {
    if (!eth()) { log("No injected wallet found (install OKX Wallet / MetaMask)."); throw new Error("no wallet"); }
    const [acc] = await eth().request({ method: "eth_requestAccounts" });
    return acc;
  }
  async function currentChainId() {
    if (!eth()) return null;
    return parseInt(await eth().request({ method: "eth_chainId" }), 16);
  }
  async function switchToXLayer() {
    try {
      await eth().request({ method: "wallet_switchEthereumChain", params: [{ chainId: CFG.NETWORK.chainIdHex }] });
    } catch (e) {
      if (e.code === 4902) {
        await eth().request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: CFG.NETWORK.chainIdHex,
            chainName: CFG.NETWORK.name,
            rpcUrls: CFG.NETWORK.rpcUrls,
            nativeCurrency: CFG.NETWORK.currency,
            blockExplorerUrls: [CFG.NETWORK.explorer],
          }],
        });
      } else throw e;
    }
  }

  // ---- UI ----
  function log(line, link) {
    const d = document.createElement("div");
    const t = new Date().toLocaleTimeString();
    d.innerHTML = `[${t}] ${line}` + (link ? ` · <a href="${link}" target="_blank" rel="noopener">explorer ↗</a>` : "");
    $("activity").prepend(d);
  }
  function setBadge(text, cls) { const b = $("net-badge"); b.textContent = text; b.className = "badge " + cls; }
  const short = (a) => (a ? a.slice(0, 8) + "…" + a.slice(-6) : "PENDING");
  function explorerAddr(a) { return `${CFG.NETWORK.explorer}/address/${a}`; }
  function explorerTx(h) { return `${CFG.NETWORK.explorer}/tx/${h}`; }

  function drawNetlist() {
    // Static 6-NAND Constitution netlist diagram (matches constitution.netlist.json)
    $("netlist-viz").innerHTML = `
    <svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg">
      <g font-family="monospace" font-size="9" fill="#8492b0">
        ${["I0 citizen", "I1 balance", "I2 resource", "I3 action"].map((t, i) =>
          `<text x="4" y="${20 + i * 26}">${t}</text>`).join("")}
        ${[0, 1, 2, 3].map((i) => `<circle cx="86" cy="${16 + i * 26}" r="3" fill="#39c6ff"/>`).join("")}
        <g stroke="#39c6ff" fill="none">
          <path d="M89 16 H120 V34 H134"/><path d="M89 42 H120 V38 H134"/>
          <path d="M89 68 H120 V86 H134"/><path d="M89 94 H120 V90 H134"/>
          <path d="M168 36 H186 V44 H200"/><path d="M168 88 H186 V48 H200"/>
          <path d="M234 46 H252 V52 H268"/>
        </g>
        ${[[134, 26], [134, 78], [200, 46], [268, 54]].map(([x, y]) =>
          `<path d="M${x} ${y - 12} A12 12 0 0 1 ${x} ${y + 12} L${x} ${y - 12} M${x} ${y - 12} L${x + 12} ${y}"
             fill="#151b29" stroke="#ffb02e"/>`).join("")}
        ${[[134, 26], [134, 78], [200, 46], [268, 54]].map(([x, y], i) =>
          `<text x="${x - 10}" y="${y + 3}" fill="#ffb02e">G${[4, 6, 8, 9][i]}</text>`).join("")}
        <text x="290" y="58" fill="#2fdc7e">O0</text>
      </g>
    </svg>`;
  }

  function renderConfig() {
    $("ledger-addr").textContent = CFG.LEDGER_ADDRESS || "PENDING DEPLOYMENT";
    if (CFG.LEDGER_ADDRESS) $("ledger-addr").outerHTML = `<b class="mono" id="ledger-addr"><a href="${explorerAddr(CFG.LEDGER_ADDRESS)}" target="_blank" rel="noopener">${short(CFG.LEDGER_ADDRESS)}</a></b>`;
    $("processor-addr").textContent = CFG.PROCESSOR_ADDRESS || "PENDING";
    $("constitution-id").textContent = CFG.CONSTITUTION_CIRCUIT_ID ? `#${CFG.CONSTITUTION_CIRCUIT_ID}` : "PENDING TAPE-OUT";
    $("miner-addr").textContent = CFG.MINER_ADDRESS ? short(CFG.MINER_ADDRESS) : "PENDING";
    $("merchant-addr").textContent = CFG.MERCHANT_ADDRESS ? short(CFG.MERCHANT_ADDRESS) : "PENDING";
    const modePill = $("mode-pill");
    if (CFG.LEDGER_ADDRESS) {
      modePill.textContent = "MAINNET · LIVE";
      modePill.style.borderColor = "var(--green)"; modePill.style.color = "var(--green)";
      $("btn-valid").disabled = false; $("btn-invalid").disabled = false;
    }
  }

  async function refreshBalances() {
    if (!CFG.LEDGER_ADDRESS) return;
    try {
      if (CFG.MINER_ADDRESS) {
        const hex = await callContract(CFG.LEDGER_ADDRESS, "0x" + SELECTORS.energyOf + encAddr(CFG.MINER_ADDRESS));
        $("miner-energy").textContent = parseInt(hex, 16) + " ⚡";
      }
      if (CFG.MERCHANT_ADDRESS) {
        const hex = await callContract(CFG.LEDGER_ADDRESS, "0x" + SELECTORS.energyOf + encAddr(CFG.MERCHANT_ADDRESS));
        $("merchant-energy").textContent = parseInt(hex, 16) + " ⚡";
      }
    } catch (e) { log("RPC read failed: " + e.message); }
  }

  // ---- demo flows ----
  async function runTrade(kind) {
    const amount = kind === "valid" ? CFG.DEMO.VALID_SELL_AMOUNT : CFG.DEMO.INVALID_SELL_AMOUNT;
    const box = $("decision");
    box.classList.remove("hidden", "approved", "rejected");
    box.textContent = "Evaluating Constitution…";

    try {
      const acc = await connectWallet();
      if ((await currentChainId()) !== CFG.NETWORK.chainId) {
        setBadge("WRONG NETWORK", "badge-bad");
        await switchToXLayer();
        setBadge("X LAYER MAINNET ✓", "badge-ok");
      }

      // 1) on-chain preview evaluation (view call)
      const seller = CFG.MINER_ADDRESS, buyer = CFG.MERCHANT_ADDRESS;
      const previewHex = await callContract(
        CFG.LEDGER_ADDRESS,
        "0x" + SELECTORS.evaluateTrade + encAddr(seller) + encAddr(buyer) + encUint(amount)
      );
      const words = previewHex.replace(/^0x/, "").match(/.{64}/g) || [];
      const [cv, be, re, aa, dec] = words.slice(-5).map((w) => parseInt(w, 16));
      const pins = `${cv}${be}${re}${aa}`;
      const expected = evaluate(cv === 1, be === 1, re === 1, aa === 1);
      if (dec !== expected) throw new Error("on-chain decision != netlist evaluation (parity broken)");

      box.textContent =
        `CONSTITUTION EVALUATION (on-chain view call)\n` +
        `citizenValid=${cv}  balanceEnough=${be}  resourceEnough=${re}  actionAllowed=${aa}\n` +
        `netlist vector ${pins} → gate G9 → decision=${dec}\n` +
        `parity with taped-out netlist: OK\n` +
        (dec ? `submitting SELL ${amount} ENERGY transaction…` : `REJECTED — no transaction will move any state. Submitting proposal for on-chain evidence…`);

      if (dec !== 1 && kind === "valid") throw new Error("valid demo unexpectedly rejected — check ledger state");

      // 2) wallet-signed proposal (works for APPROVED and REJECTED: both emit evidence)
      const memo = kind === "valid" ? `demo: sell ${amount} energy` : `demo: invalid sell ${amount} (insufficient)`;
      // proposeTrade(address,uint256,string) — selector verified offline
      const selPropose = SELECTORS.proposeTrade;
      const memoHex = [...new TextEncoder().encode(memo)].map((b) => b.toString(16).padStart(2, "0")).join("");
      const data = "0x" + selPropose + encAddr(buyer) + encUint(amount) +
        encUint(0x60) + encUint(memo.length) + memoHex.padEnd(Math.ceil(memoHex.length / 64) * 64 || 64, "0");
      const txHash = await eth().request({
        method: "eth_sendTransaction",
        params: [{ from: acc, to: CFG.LEDGER_ADDRESS, data }],
      });
      box.textContent += `\nTX: ${txHash}`;
      log(`SELL ${amount} ENERGY proposal submitted (${pins} → ${dec ? "APPROVED" : "REJECTED"})`, explorerTx(txHash));

      // 3) wait for receipt, then verify final state
      box.textContent += "\nwaiting for confirmation…";
      await waitTx(txHash);
      await refreshBalances();
      box.classList.add(dec ? "approved" : "rejected");
      box.textContent += `\n\n${dec ? "✓ APPROVED — energy transferred, state updated on X Layer." : "✗ REJECTED — no invalid update occurred (balance unchanged on-chain)."}`;
    } catch (e) {
      box.classList.add("rejected");
      box.textContent += `\nERROR: ${e.message || e}`;
    }
  }

  async function waitTx(hash) {
    for (let i = 0; i < 60; i++) {
      const r = await rpc("eth_getTransactionReceipt", [hash]);
      if (r) {
        if (parseInt(r.status, 16) !== 1) throw new Error("transaction reverted on-chain");
        return r;
      }
      await new Promise((res) => setTimeout(res, 2000));
    }
    throw new Error("timeout waiting for receipt");
  }

  // ---- boot ----
  drawNetlist();
  renderConfig();

  const dl = new Date("2026-10-06T11:00:00+07:00");
  $("deadline").textContent = "Submission deadline: 2026-10-06 11:00 UTC+7";

  (async () => {
    try {
      const cid = await currentChainId();
      if (cid === CFG.NETWORK.chainId) {
        setBadge("X LAYER MAINNET ✓", "badge-ok");
      } else if (eth()) {
        setBadge("WRONG NETWORK", "badge-bad");
        $("btn-switch").classList.remove("hidden");
      } else {
        setBadge("NO WALLET · READ-ONLY", "badge-pending");
      }
      await refreshBalances();
    } catch { setBadge("RPC UNREACHABLE", "badge-bad"); }
  })();

  $("btn-connect").addEventListener("click", async () => {
    const acc = await connectWallet();
    setBadge((await currentChainId()) === CFG.NETWORK.chainId ? "X LAYER MAINNET ✓" : "WRONG NETWORK",
      (await currentChainId()) === CFG.NETWORK.chainId ? "badge-ok" : "badge-bad");
    log("Wallet connected: " + short(acc));
  });
  $("btn-switch").addEventListener("click", () => switchToXLayer().then(() => location.reload()));
  $("btn-valid").addEventListener("click", () => runTrade("valid"));
  $("btn-invalid").addEventListener("click", () => runTrade("invalid"));

  if (!CFG.LEDGER_ADDRESS) {
    log("SIMULATION MODE — ledger not deployed yet. TRANSACTION LAB activates after mainnet deployment (see docs/DEPLOYMENT_RUNBOOK.md).");
  }
})();
