
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    fs: {
      strict: false
    },
    allowedHosts: [
      '8e63dc4a-00d3-4cec-ad50-c24b973a8406-00-3850p6aqi9ols.spock.replit.dev'
    ]
  },
  build: {
    sourcemap: true,
    outDir: 'dist'
  }
})
