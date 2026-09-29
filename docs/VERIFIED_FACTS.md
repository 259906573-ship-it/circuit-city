# VERIFIED FACTS — PHASE 1（全部一手/官方来源，禁止无来源地址）

## 比赛规则（来源：https://ignix.bot/x_campaign 官方活动页，2026-09-29 抓取）

- 名称：TapeOut Genesis Transistor Hackathon（Ignix × Metagents × X Layer）
- 时间：2026-09-22 11:00 – 2026-10-06 11:00 (UTC+07:00)
- 奖金：$8,000 / $4,000 / $2,000；第一名晶体管成为 Ignix Genesis Transistor
- 硬性参加条件：
  1. Processor 必须通过 TapeOut factory 部署在 **X Layer** 上
  2. 晶体管 supply、单价、cap 必须在部署时设定并**公开披露**
  3. 窗口关闭前必须在自家 Processor 上**至少流片 1 条电路**
  4. 必须有清晰 use case
  5. 提交内容：Processor 合约地址、部署钱包、产品 demo、项目描述
- 评审维度：创新性、TapeOut 生态集成深度、产品完整度与 UX、资产发行设计、X Layer 集成质量、
  用户增长潜力、合约安全与经济模型。不按交易量/价格排名；刷量/对倒取消资格
- FAQ：电路可以是自己或任何人在你 Processor 上流片的；**主网发布是硬性要求**

## X Layer（来源：https://web3.okx.com/xlayer/docs 官方文档）

- 主网：Chain ID **196**；RPC `https://rpc.xlayer.tech`（备用 `https://xlayerrpc.okx.com`）；
  Explorer `https://www.okx.com/web3/explorer/xlayer`；Gas 代币 **OKB**（18 decimals）
- 测试网：Chain ID 1952（本比赛必须主网，测试网仅可用于开发演练）

## TapeOut 协议（来源：tapeout.net 官方站 + Blonskr 官方公告 okx.com/orbit/post/87817387974656）

- 晶体管 = ERC-1155 Token：NAND（1 个与非门）与 LATCH（1 bit 状态，每次 tick 更新）
- 画布设计免费本地仿真；**Tape Out = 销毁晶体管 Token → 生成 Circuit ERC-721 NFT**（可调用计算逻辑，由协议求值器执行）
- Processor = 任何人可创建的链上工厂，创建者设定晶体管总量与 mint 价格（一级 mint 收入归创建者）
- Container（电路容器）= 状态 + 链上身份（ID 形如 1.2.0，X Layer 区号为 2）+ 资产持有 + TapeSend 消息 + DeWEB 网站
- TapeOut Protocol 已在 **X Layer 主网**部署完毕：Processor factory、电路容器、网站仓库、TapeSend 全部上线
- 官方应用：https://tapeout.net （X Layer 处理器列表可在站内网络切换查看）

## 待办核验（不阻塞开发，执行部署前必须完成）

- [ ] TapeOut X Layer Processor Factory 合约地址：从 tapeout.net 官方前端（X Layer 网络视图）读取，
      以官方前端/UI 显示为准，不采用任何第三方转述地址
- [ ] Processor 创建 UI 的确切参数表单与 gas 成本
- [ ] 流片（Tape Out）在我们 Processor 上的确切操作路径与成本
