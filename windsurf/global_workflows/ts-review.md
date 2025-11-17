---
description: review-ts
auto_execution_mode: 3
---



- ใน config/ ให้มีไฟล์เช่น x.config.ts และให้ใช้ as const


file structure
- components/      import config/ ได้อย่างเดียว ห้าม import types ถ้าจะใช้ types ให้ใช้ผ่าน config ที่มี type ติดมากับตัวแปรเลย
- types/          ใช้ใน config/ เท่านั้นห้ามใช้ที่อื่น
- utils/          เป็น pure function และต้องใช้ test unit ทุก function
- config/         ใช้ types, constant เท่านั้น และตัวตัวแปรต้องมี type และมขึ้นเพื่อให้ components นำไปใช้ แต่ละไฟล์ให้ตั้งชื่อแบบ index.config.ts x.config.ts และต้อง import types/ ใช้ as const 
- constant       ใช้ใน config เท่านั้น
- lib             
- app.ts         ให้ index.ts เรียกใช้
- index.ts       ใช้สำหรับre-export + entry resolver
- tsconfig.json  
- package.json   ต้องมี name, type, version, scripts, package manager เป็นอย่างืน้อย


code stypes
- ทุก .ts ต้องใช้ import alias ที่ตรงกับ tsconfig.json ถ้าอยู๋ใน folder เดียวกันแบบ relative แต่ถ้าอยู่คนละ folder ใช้ import alias
- ทุก folder ระดับที่ 1 ใน src ต้องมี index.ts เพื่อ reexport 