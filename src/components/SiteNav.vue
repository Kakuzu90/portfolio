<script setup>
import { RouterLink } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { assetUrl, savePortfolioView } from '../utils/preferences'
import ThemeToggle from './ThemeToggle.vue'

defineProps({
  name: { type: String, required: true },
  mode: { type: String, required: true },
  links: { type: Array, required: true },
  activeSection: { type: String, default: '' },
})

const header = ref(null)
let observer

function updateClearance() {
  const node = header.value
  if (!node) return
  const root = document.documentElement
  const fontSize = Number.parseFloat(getComputedStyle(root).fontSize)
  const height = node.getBoundingClientRect().height
  const sticky = height < window.innerHeight / 2
  node.classList.toggle('nav--static', !sticky)
  root.style.setProperty('--nav-clearance', `${sticky ? height + fontSize : fontSize}px`)
}

onMounted(() => {
  updateClearance()
  if ('ResizeObserver' in window) {
    observer = new ResizeObserver(updateClearance)
    observer.observe(header.value)
  }
  window.addEventListener('resize', updateClearance)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', updateClearance)
  document.documentElement.style.removeProperty('--nav-clearance')
})
</script>

<template>
  <header ref="header" class="nav" :class="`nav--${mode}`">
    <div class="nav__bar">
      <RouterLink class="nav__brand" :to="{ name: 'selector' }">
        <img class="nav__brand-img" :src="assetUrl('favicon.png')" alt="" width="32" height="32" />
        <span class="nav__brand-name">{{ name }}</span>
      </RouterLink>
      <div class="nav__utilities">
        <RouterLink
          class="view-switch"
          :to="{ name: mode === 'client' ? 'dev' : 'client' }"
          @click="savePortfolioView(mode === 'client' ? 'dev' : 'client')"
        >{{ mode === 'client' ? 'Technical view →' : 'Client view →' }}</RouterLink>
        <ThemeToggle />
      </div>
    </div>
    <nav class="nav__links" aria-label="Portfolio navigation">
      <a
        v-for="link in links"
        :key="link.id"
        class="nav__section-link"
        :class="{ 'is-active': activeSection === link.id }"
        :href="`#${link.id}`"
        :aria-current="activeSection === link.id ? 'true' : undefined"
      >{{ link.label }}</a>
    </nav>
  </header>
</template>
