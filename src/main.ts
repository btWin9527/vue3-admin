import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

// 引入状态管理
import {setupStore} from "./store"

// 路由
import {setupRouter} from "./router";

// 创建实例
const setupAll = async () => {
    const app = createApp(App)

    setupStore(app)

    setupRouter(app)

    app.mount('#app')
}

setupAll()