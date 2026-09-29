# DEPLOYMENT RUNBOOK — CIRCUIT CITY（主网上线操作手册）

> 本手册所有涉及 **钱包签名 / 真实资金 / Gas / 不可逆创建** 的步骤都标记为
> **🛑 STOP — 需要用户亲自执行并确认**。AI 开发者不代替用户签名。
> 预计总耗时 30–45 分钟；预计总成本 < 1 OKB（gas + 铸造费，X Layer gas 极低）。

---

## 前置准备（用户）

1. 准备 **两个钱包地址**（OKX Wallet 或 MetaMask）：
   - `MINER`（部署钱包，同时是 Ledger owner）＝ MINER #001
   - `MERCHANT` ＝ MERCHANT #002（可为任一第二地址）
2. 两个地址各充值少量 **OKB** 到 **X Layer 网络**（OKX 交易所提现选 X Layer）：
   - MINER：≥ 0.5 OKB（部署合约 + gas + 铸造晶体管）
   - MERCHANT：≥ 0.05 OKB（gas）
3. 把两个地址填入 `app/config.js` 对应字段。

---

## STEP 1 🛑 STOP — 创建 Processor（不可逆，真实资金）

**位置**：https://tapeout.net → 连接钱包 → 切换/选择 **X Layer 网络** → Create Processor

**ACTION**: create processor（TapeOut factory，X Layer 主网）
**PARAMETERS**（建议值，创建前按 UI 实际字段核对）：
| 参数 | 建议值 | 理由 |
|---|---|---|
| 名称 | `CIRCUIT CITY` | 品牌一致 |
| NAND 总量（supply） | `21,000,000` | 致敬 21M；足够数千条电路（Constitution 仅需 6 NAND），留足社区流片空间 |
| LATCH 总量 | `4,200,000` | NAND 的 20%；状态型 Citizen（P1）需要记忆单元 |
| 单价（unit price） | `0.00001 OKB` | 极低门槛 → 最大化参与与流片量（评审看重使用而非价格） |
| cap | 不可增发（如 UI 支持 cap=supply） | 公开披露、不可变，符合评审"资产发行设计" |

**EXPECTED COST**: 创建交易 gas（X Layer 上通常 < 0.01 OKB）
**IRREVERSIBILITY**: Processor 参数（supply/price/cap）创建后不可更改
**RISK**: 低——仅 gas；但参数错误无法回滚
**EXPECTED RESULT**: 得到 **Processor 合约地址**（形如 `0x…`）

完成后：
- 记录 Processor 地址 → 填入 `app/config.js` 的 `PROCESSOR_ADDRESS`
- 在 X Layer 浏览器核对：`https://www.okx.com/web3/explorer/xlayer/address/<processor>`
- 同时从官方 UI **记录 TapeOut 在 X Layer 的 Processor Factory 地址**（UI 上创建时可见的工厂/交易对象），填入 `docs/VERIFIED_FACTS.md` 待办项
- 记录创建交易 hash → 填入 PROJECT_STATUS.md

---

## STEP 2 🛑 STOP — 铸造晶体管（真实资金，少量）

**位置**：我们的 Processor 详情页 → Mint

**PARAMETERS**: NAND × `100`，LATCH × `20`（按建议单价成本 ≈ 0.0012 OKB）
**EXPECTED COST**: 铸造费 + gas，合计通常 < 0.01 OKB
**IRREVERSIBILITY**: 低（铸出来的晶体管会留在钱包，未流片不消耗）
**EXPECTED RESULT**: 钱包内出现 NAND/LATCH 晶体管余额

---

## STEP 3 🛑 STOP — 流片 Constitution Circuit（真实销毁 6 个 NAND，不可逆）

**位置**：tapeout.net 画布（Canvas）→ 选择我们 Processor 的晶体管 → 按下表连线 → TAPE OUT

**连线表**（与 `circuit/constitution.netlist.json` 完全一致，逐门核对）：

| 元件 | 输入 A | 输入 B |
|---|---|---|
| INPUT I0 | —（输入引脚：citizenValid） | — |
| INPUT I1 | —（输入引脚：balanceEnough） | — |
| INPUT I2 | —（输入引脚：resourceEnough） | — |
| INPUT I3 | —（输入引脚：actionAllowed） | — |
| NAND G4 | I0 | I1 |
| NAND G5 | G4 | G4 |
| NAND G6 | I2 | I3 |
| NAND G7 | G6 | G6 |
| NAND G8 | G5 | G7 |
| NAND G9 | G8 | G8 |

**输出**：O0 = G9（1 = APPROVED，0 = REJECTED）

画布内先用免费本地仿真验证真值表：
`1111→1`；`1101→0`；`1110→0`；`0111→0`；其余 12 组输入除 `1111` 外全为 0。

**EXPECTED COST**: 销毁 6 NAND（≈ 0.00006 OKB）+ gas
**IRREVERSIBILITY**: 晶体管永久销毁，Circuit NFT 永久存在
**EXPECTED RESULT**: 得到 **Constitution Circuit NFT tokenId**（我们 Processor 上的第一条电路）

完成后：
- Circuit ID → `app/config.js` 的 `CONSTITUTION_CIRCUIT_ID`
- 记录流片交易 hash → PROJECT_STATUS.md

---

## STEP 4 🛑 STOP — 部署 CircuitCityLedger 合约（主网合约部署）

在用户本机执行（AI 已备好脚本）：

```bash
cd circuit-city
export DEPLOYER_PRIVATE_KEY=<MINER 钱包私钥>   # 只放环境变量，绝不写入文件
export MERCHANT_ADDRESS=<MERCHANT 地址>
npx hardhat run scripts/deploy.js --network xlayer
```

**EXPECTED COST**: 部署 gas（通常 < 0.05 OKB）
**EXPECTED RESULT**: `CircuitCityLedger` 地址 + MINER #001（5 ENERGY）注册完成

完成后：
- Ledger 地址 → `app/config.js` 的 `LEDGER_ADDRESS`
- 记录部署交易 hash → PROJECT_STATUS.md

---

## STEP 5 — 绑定 TapeOut 证据（一次性，冻结）

由 MINER 钱包调用 Ledger 的 `setTapeoutEvidence(processor, circuitId)`（STEP 1/3 的真实值）。
此后不可更改——Ledger 永久引用真实 Processor 与真实 Constitution Circuit。

---

## STEP 6 — 验证 demos（评委路径）

1. 打开前端（本地 `npm run demo` 或部署后的地址），确认 Network badge = X LAYER MAINNET ✓
2. TRANSACTION LAB → RUN VALID TRADE（SELL 3）：钱包签名 → 交易确认 → MINER 5→2，MERCHANT 0→3
3. RUN INVALID TRADE（SELL 10）：REJECTED，余额不变，交易/事件可在浏览器核验
4. 每一步把 tx hash 与浏览器链接记入 PROJECT_STATUS.md → 标记 `SUBMISSION STATUS: READY`

---

## 安全红线

- 私钥/助记词永不落盘、永不入 git、永不经由聊天发送
- 所有签名前核对：网络 = X Layer (196)、合约地址 = 本项目记录地址、调用数据与预期一致
- 任何异常（地址不符、gas 异常、UI 与本手册不符）→ 停止，回填 BLOCKERS.md
