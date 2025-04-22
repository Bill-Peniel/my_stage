
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
      host: 'faf4b8e5-25de-497c-b8b3-b5cf55fceee5-00-3lhwrmszjnyel.janeway.replit.dev'
    }
  }
})
