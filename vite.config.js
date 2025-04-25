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
      css: {
        charset: false
      }
    }
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: ['a4131803-dd21-48e9-9fcc-59bac66bfa0a-00-2amhmm3fppdvx.picard.replit.dev', 'faf4b8e5-25de-497c-b8b3-b5cf55fceee5-00-3lhwrmszjnyel.janeway.replit.dev', '5808255a-19e6-4285-9170-2b674ae6ca4a-00-2e7554vqe2l3r.worf.replit.dev', '8e63dc4a-00d3-4cec-ad50-c24b973a8406-00-3850p6aqi9ols.spock.replit.dev', 'b7c8e52d-3504-4dd0-bc86-b87a4082eec0-00-3tg7y5f7cymm0.worf.replit.dev']
  }
})