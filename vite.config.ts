import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  logLevel: 'info'
});