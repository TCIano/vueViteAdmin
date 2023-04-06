
import { createApp } from 'vue'
//ant-design-vue
import './style/index.less'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//引入图标库
import * as Icons from '@ant-design/icons-vue'
import App from './App.vue'
import { store } from './store';
import router from './router'
//路由守卫 
// import '@/router/router-guards'
const app = createApp(App)
app.use(store)
app.use(Antd)
app.use(router)
app.mount('#app')
const Icon: any = Icons
for (const key in Icon) {
    app.component(key, Icon[key])
}
