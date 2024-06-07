import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router/index.js'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
import '@/styles/normalize.css'
import '@/styles/index.css'
import { directivesPlugin } from '@/directives/index.js'
import PiniaPersistPlugin from 'pinia-plugin-persistedstate'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "@/styles/darkTheme.css"
import "@/styles/font/iconfont.css"
// import globalConfig from '../global.config.js'
import i18n from '@/language/index.js'
import eventBus from 'vue3-eventbus'

const app = createApp(App)
// app.config.globalProperties.$globalConfig = globalConfig.value
app.use(createPinia().use(PiniaPersistPlugin))
app.use(i18n)
app.use(router)
app.use(eventBus)
app.use(directivesPlugin)
app.mount('#app')

