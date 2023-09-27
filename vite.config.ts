import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    // base: env.VITE_BASE_URL,
    // base: '/vueViteAdmin',
    base: mode === 'production' ? './' : '/',
    server: {
      open: true
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()]
      }),
      vueSetupExtend(),
      VueJsx()
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
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
