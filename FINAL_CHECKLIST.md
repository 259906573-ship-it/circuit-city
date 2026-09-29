# FINAL CHECKLIST — 提交前逐项打勾

## P0 核心功能（master prompt §6）
- [ ] 1. 比赛要求已核验（docs/VERIFIED_FACTS.md，含来源与日期）
- [ ] 2. 真实 TapeOut 集成：Processor 已创建（runbook STEP 1）
- [ ] 3. 真实 X Layer 集成：Chain ID 196 主网，前端检测/切换正常
- [ ] 4. 所需 Processor：地址已回填 app/config.js 与 SUBMISSION.md
- [ ] 5. 晶体管配置：NAND 21,000,000 / 0.00001 OKB，已公开披露（SUBMISSION.md）
- [ ] 6. ≥1 条真实流片电路：Constitution 6 NAND 已流片（STEP 3）
- [ ] 7. Constitution 决策逻辑：网表 + 链上求值器 + 真实电路三处一致
- [ ] 8. 合法动作 → APPROVED：VALID demo 实跑成功，余额 5→2/0→3
- [ ] 9. 非法动作 → REJECTED：INVALID demo 实跑，余额不变，事件留证
- [ ] 10. 可用 web demo：前端可公开访问
- [ ] 11. 真实地址/ID/交易证据：全部 tx hash 已记录
- [ ] 12. README.md：✅（回填地址后复查）
- [ ] 13. 提交描述：SUBMISSION.md ✅
- [ ] 14. demo 脚本：DEMO_SCRIPT.md ✅
- [ ] 15. 本清单 ✅

## 回填与一致性
- [ ] app/config.js 四个字段（LEDGER/PROCESSOR/CIRCUIT_ID/MINER/MERCHANT）= SUBMISSION.md = PROJECT_STATUS.md
- [ ] `setTapeoutEvidence` 已调用且冻结
- [ ] eval 链上核验命令实跑：0x0F→1、0x0D→0（runbook STEP 3 附命令）

## 测试与安全
- [ ] `npm test` 全绿（13/13）在提交当天复跑一次
- [ ] secrets 检查：`git log -p | grep -iE 'private[_ ]?key|mnemonic|seed phrase'` 无命中
- [ ] `.env` 未被跟踪：`git ls-files | grep -i env` 无命中
- [ ] 前端无 console 报错；SIMULATION 与 MAINNET 标注不混淆

## 提交物
- [ ] Processor 地址 + 部署钱包 + demo 链接 + 项目描述（官方四项）齐备
- [ ] DEMO_SCRIPT 彩排 ≥1 次，60 秒内完成
- [ ] 所有 explorer 链接可公开打开
- [ ] git 状态干净，全部推送/备份
- [ ] 提交时间早于 2026-10-06 11:00 UTC+7 至少 24 小时
