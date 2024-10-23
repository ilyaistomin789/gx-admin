import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@app', replacement: resolve(__dirname, './src/app') },
      { find: '@core', replacement: resolve(__dirname, './src/core') },
      { find: '@pages', replacement: resolve(__dirname, './src/pages') },
      { find: '@data', replacement: resolve(__dirname, './src/data') },
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },
});
