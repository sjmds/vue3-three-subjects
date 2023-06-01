
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus, {
  zIndex: 3000
})
// 导入所有图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`ElIcon${key}`, component)
}

import { registerMicroApps, start } from 'qiankun'
const isProd = import.meta.env.MODE !== 'development'

// 注册微应用并启动
registerMicroApps([
  {
    name: 'app-system',
    // entry: '//172.201.10.49:8995',
    entry: isProd ? '//172.201.10.49:8995' : '//localhost:8995',
    container: '#app',
    activeRule: '/app-system',
  },
])

// 启动 qiankun
start()

app.mount('#app')
