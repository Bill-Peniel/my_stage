
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
    hmr: { clientPort: 443 },
    allowedHosts: ['faf4b8e5-25de-497c-b8b3-b5cf55fceee5-00-3lhwrmszjnyel.janeway.replit.dev']
  }
})
