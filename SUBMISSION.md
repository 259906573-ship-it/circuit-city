# SUBMISSION — CIRCUIT CITY

> 按官方规则（ignix.bot/x_campaign）逐项对照。`PENDING` 字段在 runbook 执行后立即回填。

## 官方提交要求对照（Requirements）

| # | 官方要求 | 本项目对应 | 状态 |
|---|---|---|---|
| 1 | Processor 必须通过 TapeOut factory 部署在 X Layer 主网 | CIRCUIT CITY Processor `0x8B61D4ad238F2f5BA6A8720444C5A6613f2e62F4` | ✅ 已主网核验 |
| 2 | 晶体管 supply、单价、cap 部署时设定并公开披露 | NAND supply 21,000,000；单价 0.00001 OKB；无增发（supply 即上限，创建后不可改）——本文档即公开披露 | ⏳ STEP 1 后回填地址 |
| 3 | 窗口关闭前至少 1 条电路在自家 Processor 上流片 | Constitution Circuit #1：6 NAND 逻辑网表，官方编译后真实销毁 8 NAND | ✅ tx status=1 |
| 4 | 清晰的 use case | 见下「Use case」 | ✅ |
| 5 | 提交 Processor 合约地址、部署钱包、产品 demo、项目描述 | 见下 | ⏳ 回填 |

## 提交字段（官方要求的四项）

- **Processor contract address**: `0x8B61D4ad238F2f5BA6A8720444C5A6613f2e62F4`
- **Deployment wallet**: `0x8d155fb58f9152b84ec84e744ec0df56318a1fa9`
- **Product demo**: 本仓库 `app/`（真实 X Layer Ledger 已配置；双 demo 交易见下表）
- **Project description**: 见 README.md；一句话版：*"CIRCUIT CITY is the first economy where circuits are citizens — a Constitution circuit (6 real burned NAND gates, taped out on our X Layer processor) approves or rejects every economic action between circuit citizens, with every verdict verifiable on-chain for free."*

## 已核验的真实地址 / ID / 交易（全部可浏览器验证）

| Item | Value | Evidence |
|---|---|---|
| Processor contract | `0x8B61D4ad238F2f5BA6A8720444C5A6613f2e62F4` | X Layer mainnet code and name/symbol read verified |
| Constitution Circuit ID | `1` | `eval(1, 0x0f)=0x01`; `eval(1, 0x0d)=0x00` |
| Ledger contract (X Layer) | `0xd3052061e238b41b8c285ccafad190fa9de87606` | X Layer 主网部署 receipt status=1 |
| Ledger deploy tx | `0x1aa6e1207fedce05db6e04611845fec6ac38e17c4c62bc364c061152924e59f0` | owner=MINER |
| Tape-out tx (8 NAND burned) | `0x1d068793a1fa801ec0a2811c51a0f30c70a251b36ea6cc8ca291cb17bc900230` | receipt status=1; Circuit NFT #1 minted to `0x93bf…42d3` |
| MINER registration tx | `0xc0d9042c4f3f6869cbf0cba67840bff4192c81ab3008881869667febe69202c3` | status=1; citizen #001, ENERGY=5 |
| MERCHANT registration tx | `0x94c3c4f82d37d553b8289bd484b6285e8ff24a8a173714328cd713914dd05d8a` | status=1; citizen #002, ENERGY=0 |
| Evidence binding tx | `0x2e73b0df6942781db2036d37562ab6c4326eaebd34413afdc3acb94ad0407631` | status=1; Processor + Circuit #1 frozen |
| VALID demo tx (SELL 3 → APPROVED) | `0x346bfeed31bf802c148beae3ec748cb840ecf058b3876dbcf54fc5d5c59d8ef0` | status=1; balances 5→2 / 0→3 |
| INVALID demo tx (SELL 10 → REJECTED) | `0x7d07b30fe9e332aa3ec6d1f9a435075f5dfc82223a0f80fc054b74638ab096b8` | status=1; balance remains 2 / 3 |

## Use case

链上电路第一次成为经济的**主体**而不是工具：
1. **可验证的共享规则**——Constitution 是流片电路，永不可改，任何人可免费 `eval` 核验，无需信任任何前端或运营方。
2. **机器间经济的最小可信底座**——Citizen 间的资源交易由电路裁决，APPROVED/REJECTED 全部留痕。
3. **X Layer 上的真实制造经济**——Processor 晶体管即 ATOM（物质），流片即销毁，电路即公民。

## 评审维度对照（官方 judging criteria）

- **Application innovation**: 电路即公民、宪法即电路——非 Agent/NFT 宠物/GameFi/DeFi 面板
- **Depth of TapeOut integration**: 网表 → 画布流片 → eval 免费核验 → 前端实时交叉验证，全链路真实使用
- **Product completeness & UX**: 一屏读懂 + 一键跑通正/反 demo + 诚实标注
- **Asset issuance design**: ATOM=物质（销毁性原材料）、ENERGY=经济资源（账本状态）、supply/价格公开且不可变
- **Quality of X Layer integration**: 主网部署、链 196 检测/切换、浏览器证据链接、OKB 计价
- **User growth potential**: 全网最低单价（0.00001 OKB），任何人的流片都强化城市
- **Contract security & economic model**: 见 SECURITY.md；经济模型见 README

## 防作弊声明

无任何刷量/对倒/自成交。所有交易均为 demo 功能本身，全部公开可查。
