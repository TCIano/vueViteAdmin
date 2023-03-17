
import { createApp } from 'vue'
//ant-design-vue
import './style/index.less'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//引入图标库
import * as Icon from '@ant-design/icons-vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)
app.use(Antd)
app.use(router)
// app.use(store)
app.mount('#app')

for (const key in Icon) {
    app.component(key, Icon[key])
}
