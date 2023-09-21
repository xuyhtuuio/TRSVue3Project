import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      supportTs:false,
      logger: true,
      mockPath: './src/mock'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    open: false,
    proxy: {
      '/cpr': {
        target: 'http://192.168.210.57:31602',
        changeOrigin: true,
        ws: true,
        // rewrite: (path) => path.replace(/^\/cpr/, '')
      }
    }
  }
})
