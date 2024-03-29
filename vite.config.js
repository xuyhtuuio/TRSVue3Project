import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => /^micro-app/.test(tag)
        }
      }
    }),
    // viteMockServe({
    //   supportTs:false,
    //   logger: true,
    //   mockPath: './src/mock'
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/assets/css/common.less";'
      },
    },
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
        rewrite: (path) => path.replace(/^\/cpr/, '/cpr')
      },
      '/uaa/': {
        target: 'http://39.104.62.255',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/uaa/, '/uaa')
      },
      '/cwo': {
        target: 'http://192.168.210.57:31704',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/cwo/, '/cwo')
      },
    }
  }
})
