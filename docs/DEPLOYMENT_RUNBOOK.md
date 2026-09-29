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

**位置**：https://tapeout.net → 「项目」→「＋ 创建项目」（表单字段已实测核验）

**ACTION**: create processor（TapeOut factory，X Layer 主网）
**表单填写**（已实测字段：名称 / 型号 / 描述 / 数量 / 单价）：
| 字段 | 建议值 | 理由 |
|---|---|---|
| 名称 | `CIRCUIT CITY` | 品牌一致 |
| 型号 | `CONSTITUTION CPU` | 说明用途 |
| 描述 | The first economy where circuits are citizens. Circuits burned from ATOM transistors become citizens; the Constitution is itself a circuit that approves or rejects every economic action. | 评委 10 秒读懂 |
| 数量（supply，即上限） | `21000000` NAND + 如分 LATCH `4200000` | 致敬 21M；Constitution 仅需 6 NAND，留足社区流片空间；创建后不可改（无独立 cap 字段） |
| 单价 | `0.00001 OKB` | 全网最低（竞品 0.000066–0.00066），零门槛最大化流片参与；别人铸造时单价收入归创建者，可 OKB 领取 |

**EXPECTED COST**: 创建交易 gas（X Layer 极低）；铸造另收协议费 0.00066 OKB/笔
**IRREVERSIBILITY**: Processor 参数（supply/单价）创建后**不可更改**（无独立 cap 字段，supply 即上限）
**RISK**: 低——仅 gas；但参数错误无法回滚
**EXPECTED RESULT**: 得到 **Processor 合约地址**（形如 `0x…`，独立 ERC-721 合约即项目身份）

完成后：
- 记录 Processor 地址 → 填入 `app/config.js` 的 `PROCESSOR_ADDRESS`
- 在 X Layer 浏览器核对：`https://www.okx.com/web3/explorer/xlayer/address/<processor>`
- 同时从官方 UI **记录 TapeOut 在 X Layer 的 Processor Factory 地址**（UI 上创建时可见的工厂/交易对象），填入 `docs/VERIFIED_FACTS.md` 待办项
- 记录创建交易 hash → 填入 PROJECT_STATUS.md

---

## STEP 2 🛑 STOP — 铸造晶体管（真实资金，少量）

**位置**：我们的 Processor 详情页 → Mint

**PARAMETERS**: NAND × `100`（ Constitution 只需 6，其余留给社区流片与 MINER/扩展电路）
**EXPECTED COST**: 100 × 0.00001 OKB + 协议费 0.00066 OKB/笔 ≈ 0.0017 OKB
**IRREVERSIBILITY**: 低（未流片的晶体管留在钱包，不消耗）
**EXPECTED RESULT**: 钱包内出现本 Processor 的 NAND 晶体管余额（每台 Processor 有自己的 ERC-1155 晶体管合约）

---

## STEP 3 🛑 STOP — 流片 Constitution Circuit（真实销毁 6 个 NAND，不可逆）

**位置**：tapeout.net 画布（Canvas）→ 拖入 NAND 连线 → 右侧「**流片到哪条链**」选 **X Layer** → TAPE OUT

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

**输出**：O0 = G9（1 = APPROVED，0 = REJECTED）；输入按小端位序打包：I0=bit0, I1=bit1, I2=bit2, I3=bit3

画布内先用免费本地仿真验证真值表：
`1111→1`；`1101→0`；`1110→0`；`0111→0`；其余 12 组输入除 `1111` 外全为 0。

**EXPECTED COST**: 销毁 6 NAND（≈ 0.00006 OKB）+ gas
**IRREVERSIBILITY**: 晶体管永久销毁，Circuit NFT 永久存在
**EXPECTED RESULT**: 得到 **Constitution Circuit NFT tokenId**（我们 Processor 上的第一条电路）

**流片后立即做免费链上核验**（只读，任何人可复现——评委验证路径）：

```bash
# 期望 APPROVED（1111 → 0x0F）返回 0x01；期望 REJECTED（1101 → 0x0D）返回 0x00
cast call <PROCESSOR地址> "eval(uint256,bytes)" <电路编号> 0x0f --rpc-url https://rpc.xlayer.tech
cast call <PROCESSOR地址> "eval(uint256,bytes)" <电路编号> 0x0d --rpc-url https://rpc.xlayer.tech
```

> 已于 2026-09-30 在真实主网用同类调用验证过该接口（Book of Life 电路 #11：
> eval(11,0x00)→0x00、eval(11,0xff)→0x01），接口与小端位序编码确认无误。

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
