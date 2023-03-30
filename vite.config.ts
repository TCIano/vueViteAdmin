import { defineConfig, } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const dev = mode === 'development'
  console.log(dev);

  return defineConfig({
    base: dev ? '/' : '/vueViteAdmin/',
    server: {
      open: true
    },
    plugins: [
      vue(),
      Components(),
      vueSetupExtend()
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, 'src')
          //为 /src配置别名@
        }
      ]
    }
  })
}
// export default defineConfig({


//   base: '/',
//   server: {
//     open: true
//   },
//   plugins: [
//     vue(),
//     Components(),
//     vueSetupExtend()
//   ],
//   resolve: {
//     alias: [
//       {
//         find: "@",
//         replacement: path.resolve(__dirname, 'src')
//         //为 /src配置别名@
//       }
//     ]
//   }
// })
