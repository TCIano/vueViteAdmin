
import { createApp } from 'vue'
//ant-design-vue
import './style/index.less'
import STable from '@surely-vue/table';
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@surely-vue/table/dist/index.less';
import '@surely-vue/table/src/style/antdv.less';
// import 'ant-design-vue/dist/reset.css';
//引入图标库
import * as Icons from '@ant-design/icons-vue'
import { store } from './store';
import router from './router'
//路由守卫 
// import '@/router/router-guards'
const app = createApp(App)
app.use(store)
app.use(STable);
app.use(Antd)
app.use(router)
app.mount('#app')
const Icon: any = Icons
for (const key in Icon) {
    app.component(key, Icon[key])
}
