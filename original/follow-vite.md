

## Best Practices

### 1. Library Build Config

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['vue', 'react', '@vue/*'], // อย่า bundle dependencies
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    target: 'esnext',
  },
})
```

### 2. Essential Plugins

```typescript
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: true,
      vueTsc: true, // สำหรับ Vue SFC type checking
      biome: {
        command: 'check',
      },
    }),
  ],
})
```

**Plugins:**
- **vite-plugin-checker** - Type check + lint ในขณะ dev (TS, Vue, Biome)
- **@vitejs/plugin-vue** - Vue 3 SFC support
- **@vitejs/plugin-react** - React Fast Refresh

### 3. Path Alias

```typescript
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

### 4. Key Points

- ใช้ ESM format เท่านั้น
- `external` dependencies เสมอ (อย่า bundle)
- `preserveModules: true` เพื่อ tree-shaking
- Enable sourcemap สำหรับ debugging
- ใช้ vite-plugin-checker สำหรับ real-time type checking
