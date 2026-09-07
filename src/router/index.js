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
    { path: '/:pathMatch(.*)*', redirect: { name: 'selector' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.name !== 'selector') return true

  const savedView = getPortfolioView()
  return savedView ? { name: savedView, replace: true } : true
})

export default router
