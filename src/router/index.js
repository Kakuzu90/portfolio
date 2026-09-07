import { createRouter, createWebHistory } from 'vue-router'
import ClientPortfolio from '../views/ClientPortfolio.vue'
import TechnicalPortfolio from '../views/TechnicalPortfolio.vue'
import { getPortfolioView } from '../utils/preferences'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dev', component: TechnicalPortfolio, alias: '/dev' },
    { path: '/client', name: 'client', component: ClientPortfolio },
    { path: '/:pathMatch(.*)*', redirect: { name: 'dev' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// On first load, send returning visitors to the view they last chose.
let firstLoad = true
router.beforeEach((to) => {
  if (!firstLoad) return true
  firstLoad = false
  if (to.name === 'dev' && to.path !== '/dev' && getPortfolioView() === 'client') {
    return { name: 'client', replace: true }
  }
  return true
})

export default router
