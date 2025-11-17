
## Best Practices

### 1. Config with Tailwind v4 + Icons

```typescript
import { defineConfig, presetWind4, presetIcons } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetWind4(), // Tailwind CSS v4 compatible
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
  ],
  shortcuts: {
    'btn': 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50',
    'input': 'px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none',
  },
})
```

### 2. Vite Integration

```typescript
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [UnoCSS()],
})
```

```typescript
// main.ts
import 'virtual:uno.css'
```

### 3. Icons Usage

```html
<!-- Material Design Icons (mdi) -->
<i class="i-mdi-home" />
<i class="i-mdi-account" />
<i class="i-mdi-settings" />
```

### 4. Shortcuts Best Practices

```typescript
shortcuts: {
  // Layout
  'flex-center': 'flex items-center justify-center',
  'flex-between': 'flex items-center justify-between',
  
  // Components
  'card': 'p-4 rounded-lg shadow bg-white',
  'btn': 'px-4 py-2 rounded bg-primary text-white hover:bg-primary-600',
  
  // States
  'link': 'text-blue-500 hover:text-blue-600 hover:underline',
}
```

### 5. Key Points

- ใช้ `presetWind4` (Tailwind v4) แทน `presetUno`
- Icons: ใช้ `@iconify-json/mdi` (Material Design Icons)
- Import icons แบบ JSON tree-shakable
- Shortcuts สำหรับ common patterns เท่านั้น
- ใช้ Inspector: `/__unocss` เพื่อ debug


ดูว่า project เป็น vite หรือ nuxt

## vite
1. ติดตั้ง unocss, @unocss/reset ใน devDependencies
2. รัน xh https://raw.githubusercontent.com/newkub/dev-config/refs/heads/main/uno.config.ts --json --body --download
3. กำหนด import '@unocss/reset/tailwind-compat.css' ใน main.ts


## nuxt 
1. ติดตั้ง unocss, @unocss/nuxt, @unocss/reset ใน devDependencies
2. รัน xh https://raw.githubusercontent.com/newkub/dev-config/refs/heads/main/uno.config.ts --json --body --download
3. รัน xh https://raw.githubusercontent.com/newkub/dev-config/refs/heads/main/ืnuxt.config.ts --json --body --download