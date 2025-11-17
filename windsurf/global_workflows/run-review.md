---
description: run review ใน package.json และแก้ไข warning, error ทั้งหมดจนไม่มีเหลือ
auto_execution_mode: 1
---

1. กำหนด review ใน package.json

"scripts": {
    "review": "bunx taze -r && bun run format && bun run lint && bun run build && bun run test"
 },

โดยที่
- format คือ /follow-biome
- lint คือ /follow-biomd
- build คือ /follow-tsdown
- test คือ /follow-vites


2. /run-review