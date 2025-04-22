import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/main.css";`
      }
    }
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: ['a4131803-dd21-48e9-9fcc-59bac66bfa0a-00-2amhmm3fppdvx.picard.replit.dev']
  }
})