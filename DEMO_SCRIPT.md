# DEMO SCRIPT（~60 秒）

> 前置：runbook 已执行，前端 config 已回填真实地址；打开前端，确认右上角
> 「X LAYER MAINNET ✓」与 CITY 面板中的真实 Processor/Circuit ID/Ledger 地址。

**0–10s · CIRCUIT CITY**
> "This is CIRCUIT CITY — the first economy where circuits are citizens."
> （指着 Architecture 条）ATOM 是物质不是钱；流片烧掉真实晶体管；电路成为公民。

**10–20s · CITIZENS**
> "MINER #001 holds 5 ENERGY. MERCHANT #002 holds none."
> （指出 CONSTITUTION 卡）"And this is our Constitution — not a smart contract if-statement:
> six real NAND gates, taped out on our own processor on X Layer. Six transistor tokens were burned for it."

**20–35s · VALID TRADE（RUN VALID TRADE）**
> "MINER sells 3 ENERGY. Watch the Constitution evaluate: citizenValid, balanceEnough,
> resourceEnough, actionAllowed — all one. Vector 1111 → APPROVED."
> （展示）链上余额 5→2 / 0→3，交易哈希 + 浏览器链接；
> 面板中 "REAL CIRCUIT CROSS-CHECK: eval → 1 ✓"——任何人都能免费核验。

**35–45s · INVALID TRADE（RUN INVALID TRADE）**
> "Now MINER has only 2 ENERGY and tries to sell 10. Vector 1101 — balanceEnough is zero.
> REJECTED. Energy ✗." （展示）余额原封不动，拒绝事件同样在链上留证。

**45–55s · ARCHITECTURE**
> "ATOM → Tape Out → Circuit → Citizens → Economy. One Constitution, many citizens,
> shared verifiable rules — enforced by hardware logic, not promises."
> （如有 ROADMAP 节点：明确一句 these are roadmap, honestly labeled。）

**55–60s · 收尾**
> "Blockchains gave assets ownership. TapeOut gives machines agency.
> CIRCUIT CITY."

---

### 彩排检查单
- [ ] 网络 badge = X LAYER MAINNET ✓
- [ ] config 中三个真实地址/ID 可见且与 SUBMISSION.md 一致
- [ ] VALID demo 实跑成功（miner 5→2, merchant 0→3）
- [ ] INVALID demo 实跑 REJECTED 且余额不变
- [ ] REAL CIRCUIT CROSS-CHECK 行出现 eval ✓
- [ ] 浏览器链接可点开（explorer）
