import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost', //ip地址
    port: 8002, //端口号
    open: true //启动后是否自动打开浏览器
  },
  plugins: [vue(), Components(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
