# SUBMISSION — CIRCUIT CITY

> 按官方规则（ignix.bot/x_campaign）逐项对照。`PENDING` 字段在 runbook 执行后立即回填。

## 官方提交要求对照（Requirements）

| # | 官方要求 | 本项目对应 | 状态 |
|---|---|---|---|
| 1 | Processor 必须通过 TapeOut factory 部署在 X Layer 主网 | tapeout.net「＋ 创建项目」创建 CIRCUIT CITY Processor | ⏳ runbook STEP 1 |
| 2 | 晶体管 supply、单价、cap 部署时设定并公开披露 | NAND supply 21,000,000；单价 0.00001 OKB；无增发（supply 即上限，创建后不可改）——本文档即公开披露 | ⏳ STEP 1 后回填地址 |
| 3 | 窗口关闭前至少 1 条电路在自家 Processor 上流片 | Constitution Circuit：6 NAND 真实销毁流片，电路即 Constitution 本体 | ⏳ runbook STEP 3 |
| 4 | 清晰的 use case | 见下「Use case」 | ✅ |
| 5 | 提交 Processor 合约地址、部署钱包、产品 demo、项目描述 | 见下 | ⏳ 回填 |

## 提交字段（官方要求的四项）

- **Processor contract address**: `PENDING`
- **Deployment wallet**: `PENDING`
- **Product demo**: `PENDING`（前端地址 / 演示视频，runbook STEP 6 后确定）
- **Project description**: 见 README.md；一句话版：*"CIRCUIT CITY is the first economy where circuits are citizens — a Constitution circuit (6 real burned NAND gates, taped out on our X Layer processor) approves or rejects every economic action between circuit citizens, with every verdict verifiable on-chain for free."*

## 已核验的真实地址 / ID / 交易（全部可浏览器验证）

| Item | Value | Evidence |
|---|---|---|
| Processor contract | `PENDING` | explorer link `PENDING` |
| Constitution Circuit ID | `PENDING` | eval 验证命令见 README |
| Ledger contract (X Layer) | `PENDING` | explorer link `PENDING` |
| Processor creation tx | `PENDING` | — |
| Tape-out tx (6 NAND burned) | `PENDING` | — |
| VALID demo tx (SELL 3 → APPROVED) | `PENDING` | — |
| INVALID demo tx (SELL 10 → REJECTED) | `PENDING` | — |

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
