import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    visualizer({
      template: 'treemap', // or sunburst
      gzipSize: true,
      brotliSize: true,
      filename: 'analyze.html', // will be saved in project's root
    }),
  ],
});
