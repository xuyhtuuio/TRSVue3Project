import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
    viteMockServe({
      supportTs:false,
      logger: true,
      mockPath: "./src/mock"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src")
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
        // ws: true,
        // rewrite: (path) => path.replace(/^\/cpr/, '')
      }
    }
  }
})
