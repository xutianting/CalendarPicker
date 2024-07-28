import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
  ],
  base: './',
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
      modules: {
          localsConvention: 'camelCaseOnly', // 或者 'dashes', 'camelCase'
      },
    preprocessorOptions: {
      less: {
          javascriptEnabled: true,
        // 这里可以添加 LESS 相关的配置
        // 例如，添加全局变量
        globalVars: {
          primaryColor: '#333',
        },
      },
    },
  },
})
