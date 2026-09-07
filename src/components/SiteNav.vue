<script setup>
import { RouterLink } from 'vue-router'
import { assetUrl, savePortfolioView } from '../utils/preferences'
import ThemeToggle from './ThemeToggle.vue'

defineProps({
  name: { type: String, required: true },
  mode: { type: String, required: true },
  links: { type: Array, required: true },
  activeSection: { type: String, default: '' },
})
</script>

<template>
  <header class="nav">
    <a class="nav__brand" href="#top">
      <img class="nav__brand-img" :src="assetUrl('favicon.png')" :alt="name" width="32" height="32" />
    </a>
    <nav class="nav__links" aria-label="Portfolio navigation">
      <a
        v-for="link in links"
        :key="link.id"
        class="nav__section-link"
        :class="{ 'is-active': activeSection === link.id }"
        :href="`#${link.id}`"
        :aria-current="activeSection === link.id ? 'true' : undefined"
      >{{ link.label }}</a>
      <RouterLink
        class="view-switch"
        :to="{ name: mode === 'client' ? 'dev' : 'client' }"
        @click="savePortfolioView(mode === 'client' ? 'dev' : 'client')"
      >{{ mode === 'client' ? 'Technical view →' : 'Client view →' }}</RouterLink>
      <ThemeToggle />
    </nav>
  </header>
</template>
