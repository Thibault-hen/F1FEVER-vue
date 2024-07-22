import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import i18n from './i18n'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  const defaultTitle = 'F1FEVER'
  document.title = to.meta.title || defaultTitle
  next()
})

app.use(i18n)
app.use(router)

app.mount('#app')
