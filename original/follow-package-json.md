ถ้าเป็น monorepo

## package.json in root


ต้องมีสิงเหล่านี้เป็นอย่างน้อย โดยมีหมายเหตุคือ 
- ต้workspace ต้องตรงกับ folder ที่สร้าง
- packageManager เช็ค bun -v เพื่อใช้ bun lastest version
- ติดตั้ง dependencies ตาม scripts ด้วย 

{
  "name": "tui",
  "type": "module",
  "packageManager": "bun@1.3.1",
  "workspace": [
    "examples/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "format": "turbo review",
    "test": "turbo test",
    "update:deps": "bunx taze -r -w && ni",
    "review": "bun update:deps && turbo format && turbo lint && turbo test"
  },



## package.json in workspace

ต้องมีสิงเหล่านี้เป็นอย่างน้อย โดยมีหมายเหตุคือ 

- ไม่ต้องมี packageManager
- ไม่ต้องมี workspace
- ให้มี script ตาม package.json root แต่ใช้ bun run

{
  "name": "tui",
  "type": "module",
  "scripts": {
    "dev": "bun run --watch src/index/ts",
    "build": "tsdown --exports --dts",
    "lint": "bunx tsc --noEmit && biome lint --write",
    "format": "biome format --write",
    "test": "bun run vitest",
    "update:deps": "bunx taze -r -w && ni ",
    "review": "bun update:deps && bun format && bun lint && bun test"
  },