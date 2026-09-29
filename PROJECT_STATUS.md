CIRCUIT CITY STATUS

SUBMISSION STATUS: NOT READY
CURRENT PHASE: PHASE 1 完成 → 进入 PHASE 2/3（Constitution + 垂直切片）
WHAT WORKS: 官方规则与链参数核验完成；项目仓库已初始化
WHAT IS REAL ON-CHAIN: 暂无（所有链上动作需用户钱包签名，见 docs/DEPLOYMENT_RUNBOOK.md）
PROCESSOR: 未创建（不可逆操作，等待用户确认与执行）
CIRCUITS: 暂无（Constitution 网表已设计，待在我们 Processor 上流片）
CONTAINERS: 未开通（P1）
TX HASHES: 暂无
TEST STATUS: 未开始（PHASE 2 中建立）
BLOCKERS: 无 P0 技术阻塞。Processor 创建/流片/矿工铸造需用户钱包执行（属协议设计，非阻塞——可并行开发）
NEXT ACTION: 实现 Constitution NAND 网表 + 本地仿真器 + EnergyLedger 合约与测试

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
