CIRCUIT CITY STATUS

SUBMISSION STATUS: READY（X Layer 主网 Ledger、证据绑定与双 demo 均已核验）
CURRENT PHASE: PHASE 6 完成：提交材料已回填，等待用户对外提交
WHAT WORKS:
- Constitution 电路网表（6 NAND）+ JS 仿真器（5/5）；Solidity 链上求值器 + Ledger（8/8）——13/13 测试通过
- 前端：CITY / TRANSACTION LAB / ARCHITECTURE；SIMULATION 预部署演示（明确标注）；
  MAINNET 模式含「真实流片电路 eval 交叉核验」步骤；X Layer 检测/切换
- 提交材料全套：README / SUBMISSION / DEMO_SCRIPT / FINAL_CHECKLIST / SECURITY
WHAT IS REAL ON-CHAIN: Processor 与 Constitution Circuit #1 已在 X Layer 主网核验。流片交易成功销毁 8 NAND；
  eval(1,0x0f)→0x01、eval(1,0x0d)→0x00。
PROCESSOR: 0x8B61D4ad238F2f5BA6A8720444C5A6613f2e62F4（X Layer 主网已只读核验：name=CIRCUIT CITY，symbol=CONSTITUTION CPU）
CIRCUITS: Constitution Circuit #1 已流片；逻辑网表为 6 NAND，官方编译器实际计费并销毁 8 NAND。
CONTAINERS: 未开通（P1）
TX HASHES: Constitution tape-out: 0x1d068793a1fa801ec0a2811c51a0f30c70a251b36ea6cc8ca291cb17bc900230（status=1，Circuit NFT #1）
TEST STATUS: 13/13 通过
BLOCKERS: 无主网阻塞。临时配置页仅用于用户钱包签名，不作为产品 demo。
NEXT ACTION: 使用 SUBMISSION.md 中已核验的地址、交易与项目说明完成官方提交。

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
