import { createRouter, createWebHistory } from 'vue-router'
import AudienceSelector from '../views/AudienceSelector.vue'
import ClientPortfolio from '../views/ClientPortfolio.vue'
import TechnicalPortfolio from '../views/TechnicalPortfolio.vue'
import { getPortfolioView } from '../utils/preferences'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'selector', component: AudienceSelector },
    { path: '/dev', name: 'dev', component: TechnicalPortfolio },
    { path: '/client', name: 'client', component: ClientPortfolio },
    { path: '/:pathMatch(.*)*', redirect: { name: 'dev' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return {
      el: to.hash,
      top: Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    }
    return { top: 0 }
  },
})

// On first load, send returning visitors to the view they last chose.
let firstLoad = true
router.beforeEach((to) => {
  if (!firstLoad) return true
  firstLoad = false
  const savedView = getPortfolioView()
  if (to.name === 'selector' && savedView) {
    return { name: savedView, replace: true }
  }
  return true
})

export default router
