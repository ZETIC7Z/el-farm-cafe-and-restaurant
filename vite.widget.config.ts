import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  envDir: path.resolve(__dirname),
  publicDir: false,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  esbuild: {
    drop: ['debugger'],
  },
  build: {
    outDir: path.resolve(__dirname, 'pos'),
    emptyOutDir: false,
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'pos-src/widget.ts'),
      name: 'ElFarmPosWidget',
      formats: ['iife'],
      fileName: () => 'pos-widget.js',
    },
  },
});
