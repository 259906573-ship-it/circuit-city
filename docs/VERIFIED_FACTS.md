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

## CIRCUIT CITY 主网实测（2026-10-01）

- Processor：`0x8B61D4ad238F2f5BA6A8720444C5A6613f2e62F4`，X Layer 主网只读确认 name=`CIRCUIT CITY`、symbol=`CONSTITUTION CPU`。
- Constitution Circuit：tokenId `1`，流片交易 `0x1d068793a1fa801ec0a2811c51a0f30c70a251b36ea6cc8ca291cb17bc900230`，receipt `status=1`。官方编译器销毁 8 NAND 并铸造 Circuit NFT 给 `0x93bf59d2128a1f7c8366d8091c31efa3f62842d3`。
- 免费链上核验：`eval(1, 0x0f) -> 0x01`；`eval(1, 0x0d) -> 0x00`。这与 Constitution “仅四项条件都为真时批准”的真值表一致。
- Ledger：`0xd3052061e238b41b8c285ccafad190fa9de87606`，部署 tx `0x1aa6e1207fedce05db6e04611845fec6ac38e17c4c62bc364c061152924e59f0`（status=1，owner=MINER）。
- 配置 tx 均为 X Layer receipt `status=1`：MINER #001 `0xc0d9042c4f3f6869cbf0cba67840bff4192c81ab3008881869667febe69202c3`；MERCHANT #002 `0x94c3c4f82d37d553b8289bd484b6285e8ff24a8a173714328cd713914dd05d8a`；不可变证据绑定 `0x2e73b0df6942781db2036d37562ab6c4326eaebd34413afdc3acb94ad0407631`。
- 双 demo：SELL 3 tx `0x346bfeed31bf802c148beae3ec748cb840ecf058b3876dbcf54fc5d5c59d8ef0` 事件为 APPROVED，余额为 2 / 3；SELL 10 tx `0x7d07b30fe9e332aa3ec6d1f9a435075f5dfc82223a0f80fc054b74638ab096b8` 事件为 REJECTED（Energy check failed），余额仍为 2 / 3。

- [ ] TapeOut X Layer Processor Factory 合约地址：从 tapeout.net 官方前端（X Layer 网络视图）读取，
      以官方前端/UI 显示为准，不采用任何第三方转述地址
- [ ] ~~Processor 创建 UI 的确切参数表单与 gas 成本~~ ✅ 已核验（见下）
- [ ] 流片（Tape Out）在我们 Processor 上的确切操作路径与成本 ✅ 已核验（见下）

## 官方前端实测（2026-09-30 用真实浏览器打开 tapeout.net 核验，只读未签名）

- **X Layer 处理器列表**：首页「X Layer · Base」标签，共 289 台 L2 处理器（含 Book of Life、
  Yuan Station 等）。深链格式：`tapeout.net/#l2/<链>/<0x处理器地址>`
- **创建 Processor 表单字段**（「＋ 创建项目」）：名称（如 "My 4004"）、型号（如 "CPU"）、描述、
  **数量**（supply，默认 100000）、**单价**（默认 0.00066 OKB）→「连接钱包并创建」。
  创建即部署一个**独立 ERC-721 合约**作为项目身份。无独立 cap 字段（supply 即上限，创建后不可改）
- **铸造费用**：单价 × 数量 + **协议费 0.00066 OKB/笔**；X Layer 上用 OKB 支付，钱包自动切链
- **别人铸造时单价部分记到创建者名下，用 OKB 领取**（创建者收入机制）
- **流片到 X Layer 的路径**：打开画布 → 右侧「流片到哪条链」选 **X Layer**
- **电路 = 永久链上函数（免费验证，任何人可调用）**：
  ABI 为 `eval(uint256,bytes) view returns (bytes)`，直接部署在 **Processor 合约**上；
  组合逻辑用 `eval`，含时序单元用 `step`；输入/输出按**小端位序**打包成 bytes；
  调用方式：`cast call <processor> "eval(uint256,bytes)" <circuitId> 0x… --rpc-url https://rpc.xlayer.tech`
- **✅ 已实测（2026-09-30，真实主网 eth_call，只读）**：
  `eval(11, 0x00) → 0x00`、`eval(11, 0xff) → 0x01`（Book of Life 处理器 0x1488…E4CC 电路 #11）。
  接口与小端位序编码端到端跑通 → 我们的 Constitution 流片后可用同一接口被任何人免费核验
- 每台 Processor 有自己的晶体管 ERC-1155 合约（如 Book of Life：0xE0D5…516A）
- 竞品定价参考（X Layer）：0.000066 OKB（Book of Life）、0.0001 OKB（Yuan Station）、0.00066 OKB（Once/RADAR）
