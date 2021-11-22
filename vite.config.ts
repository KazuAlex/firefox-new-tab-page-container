import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/'),
    },
  },
  plugins: [
    vue(),

    AutoImport({
      imports: [
        'vue',
        {
          'webextension-polyfill': [
            ['default', 'browser'],
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  optimizeDeps: {
    include: [
      'vue',
      'webextension-polyfill',
    ],
  },
})
