
import { createApp } from 'vue'
import './style/index.css'
//ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)
app.use(Antd)
app.use(router)
// app.use(store)
app.mount('#app')
