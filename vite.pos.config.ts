import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, 'pos-src'),
  envDir: path.resolve(__dirname),
  publicDir: path.resolve(__dirname, 'pos-public'),
  base: '/pos/',
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js'),
  },
  esbuild: {
    drop: ['debugger'],
  },
  build: {
    outDir: path.resolve(__dirname, 'pos'),
    emptyOutDir: true,
    sourcemap: false,
  },
});
