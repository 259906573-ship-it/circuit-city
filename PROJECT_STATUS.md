CIRCUIT CITY STATUS

SUBMISSION STATUS: NOT READY（PHASE 1–4 代码侧完成；主网动作待用户执行 docs/DEPLOYMENT_RUNBOOK.md）
CURRENT PHASE: PHASE 4 完成 → PHASE 5（真实集成，等用户钱包动作）/ PHASE 6 材料并行推进
WHAT WORKS:
- Constitution 电路网表（6 NAND，TapeOut 语义）+ JS 仿真器，5/5 测试通过（1111→APPROVED；1101→REJECTED；16 组全表）
- Solidity 链上求值器（与网表逐门一致）+ CircuitCityLedger（Citizen 注册 / ENERGY / proposeTrade /
  APPROVED·REJECTED 事件证据 / 防重放 / 权限边界 / 一次性冻结的 TapeOut 证据绑定），8/8 Hardhat 测试通过
- 前端（app/）：CITY + TRANSACTION LAB + ARCHITECTURE，X Layer 网络检测与一键切换，诚实标注
  MAINNET / PENDING / ROADMAP；ABI 编码已与 ethers 标准逐字节比对一致
WHAT IS REAL ON-CHAIN: 暂无——所有主网动作需用户钱包签名（见 docs/DEPLOYMENT_RUNBOOK.md 的 4 个 STOP 点）
PROCESSOR: 未创建（参数提案与理由已写入 runbook STEP 1）
CIRCUITS: Constitution 网表已定稿，待流片（runbook STEP 3，销毁 6 NAND）
CONTAINERS: 未开通（P1）
TX HASHES: 暂无
TEST STATUS: 13/13 通过（node 5 + hardhat 8）
BLOCKERS: 无技术阻塞。唯一待办：X Layer 工厂地址需在部署时从官方 UI 读取（已按规则标注，不编造）
NEXT ACTION: 用户按 runbook 执行 STEP 1–5；期间 AI 继续 PHASE 6 材料与 P1（Living CPU City 视觉）

=== 关键已核验事实（来源见 docs/VERIFIED_FACTS.md）===
- 比赛：TapeOut Genesis Transistor Hackathon（Ignix × X Layer）
- 截止：2026-10-06 11:00 UTC+07:00（即 12:00 HKT），剩余约 7 天
- 硬性要求：X Layer 主网通过 TapeOut factory 部署 Processor；公开设定 supply/price/cap；
  窗口关闭前至少 1 条电路在自家 Processor 上流片；提交 Processor 合约地址 + 部署钱包 + 产品 demo + 项目描述
- 评审：创新性 / TapeOut 集成深度 / 完成度与 UX / 资产发行设计 / X Layer 集成 / 增长潜力 / 合约安全与经济模型
- 主网发布是硬性要求；刷量取消资格
- X Layer 主网：Chain ID 196，RPC https://rpc.xlayer.tech（备用 https://xlayerrpc.okx.com），
  Explorer https://www.okx.com/web3/explorer/xlayer，Gas 代币 OKB
- TapeOut：NAND/LATCH 为 ERC-1155 晶体管（流片时真实销毁）→ Circuit 为 ERC-721 NFT（计算逻辑）→
  Processor 为用户创建的工厂（自定晶体管总量与 mint 价格）→ Container 提供状态/身份/资产/TapeSend
- X Layer 区号 2（容器 ID 形如 1.2.0）；TapeOut 官方应用 tapeout.net（BNB 为主站，X Layer 已上线全套合约）
