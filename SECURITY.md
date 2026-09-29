# SECURITY

## 已实现的安全机制（CircuitCityLedger.sol）

| 威胁 | 对策 |
|---|---|
| 未授权执行 | `proposeTrade`/`mineEnergy` 仅限注册公民本人地址（`msg.sender` 校验，非公民 revert `NotCitizenOwner`） |
| 非法注册/伪造公民 | `registerCitizen` 仅 owner；owner 由部署交易确定，不可转移攻击 |
| 重放 | 逐公民递增 nonce；所有状态变更基于 msg.sender，不存在离线签名重放面 |
| 无效状态变更 | REJECTED 决策路径**零状态写入**（只发事件证据）；APPROVED 原子执行 |
| 余额校验绕过 | `balanceEnough`/`resourceEnough` 在链上计算后进 Constitution 网表，前端仅展示 |
| 前端冒充合约权威 | 前端只读 + 发交易；裁决完全在链上（Ledger 求值 + 真实流片电路 `eval` 交叉核验） |
| 证据篡改 | `setTapeoutEvidence` 只能设置一次并永久冻结（`tapeoutFrozen`） |
| 决策逻辑被换 | 求值器与 `circuit/constitution.netlist.json` 逐门对应，测试强制 16 组全表一致 |

## 经济模型约束

- ENERGY 只能通过 `mineEnergy`（+1/次，仅 MINER）与 APPROVED 的交易产生流动，无铸币后门
- ATOM（晶体管）流片即销毁——不可逆、不可增发（Processor supply 创建时固定）

## 密钥与秘密

- 私钥/助记词**永不**写入仓库（`.gitignore` 覆盖 `.env*`）；部署密钥仅经 `DEPLOYER_PRIVATE_KEY` 环境变量注入
- `app/config.js` 仅含公开地址；仓库内无任何 secret
- 提交前 secrets 检查：`git log -p | grep -iE 'private|mnemonic|seed|0x[a-f0-9]{64}'` 确认无命中（在 FINAL_CHECKLIST 中执行）

## 已知边界（诚实披露）

- ENERGY 为 X Layer 合约状态（非 TapeOut LATCH 状态）——P0 允许的最简合法状态层，前端已明确标注
- Constitution 链上求值器与真实流片电路的逻辑等价性由测试 + 运行时 `eval` 交叉核验共同保证
- 协议合约本身（TapeOut factory / eval）为官方部署，本项目未修改、不托管
