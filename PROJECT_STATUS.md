CIRCUIT CITY STATUS

SUBMISSION STATUS: NOT READY（差主网动作：runbook 4 个 STOP 点，预计 30–45 分钟用户操作）
CURRENT PHASE: PHASE 6 材料完成 → 等待用户执行 PHASE 5（runbook STEP 1–5）→ 回填后即 READY
WHAT WORKS:
- Constitution 电路网表（6 NAND）+ JS 仿真器（5/5）；Solidity 链上求值器 + Ledger（8/8）——13/13 测试通过
- 前端：CITY / TRANSACTION LAB / ARCHITECTURE；SIMULATION 预部署演示（明确标注）；
  MAINNET 模式含「真实流片电路 eval 交叉核验」步骤；X Layer 检测/切换
- 提交材料全套：README / SUBMISSION / DEMO_SCRIPT / FINAL_CHECKLIST / SECURITY
WHAT IS REAL ON-CHAIN: 官方 eval 接口已于 2026-09-30 在真实主网验证（Book of Life #11：
  eval(11,0x00)→0x00、eval(11,0xff)→0x01）；本项目自身的链上动作待用户钱包执行
PROCESSOR: 未创建（表单字段已实测核验：名称/型号/描述/数量/单价；协议费 0.00066 OKB/笔）
CIRCUITS: Constitution 网表定稿；画布流片路径已核验（右侧「流片到哪条链」选 X Layer）
CONTAINERS: 未开通（P1）
TX HASHES: 暂无
TEST STATUS: 13/13 通过
BLOCKERS: 无。全部官方事实已核验（创建表单/费用/eval ABI/小端位序/深链格式/竞品定价）
NEXT ACTION: 用户执行 docs/DEPLOYMENT_RUNBOOK.md STEP 1–5 → 回填 config → STEP 6 跑双 demo → 置 READY

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
