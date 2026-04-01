import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
// import { setupStore } from '@/store'


import '@/styles/tailwind.css'
import '@/styles/index.less'

async function bootstrap() {
  const app = createApp(App)

  // Mount status management
  // setupStore(app)

  // Mount route
  setupRouter(app)


  // route When ready Mount  APP Living example
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady()

  // https://www.naiveui.com/en-US/os-theme/docs/style-conflict#About-Tailwind's-Preflight-Style-Override
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  app.mount('#app', true)
}

void bootstrap()
