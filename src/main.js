import './style.css'
import './lib/rem.js'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './route/route.js'
// import store from './store/store.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.component('svg-icon', svgIcon)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
