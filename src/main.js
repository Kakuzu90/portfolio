import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../style.css'

const application = createApp(App)
application.use(router)

function mountApplication() {
  const loader = document.getElementById('boot-loader')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!loader || reducedMotion) {
    application.mount('#app')
    return
  }

  loader.classList.add('is-ready')
  window.setTimeout(() => application.mount('#app'), 450)
}

router.isReady().then(mountApplication, mountApplication)
