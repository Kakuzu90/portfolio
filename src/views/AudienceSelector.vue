<script setup>
import { onMounted, ref } from 'vue'
import portfolio from '../../data.json'
import AudienceCard from '../components/AudienceCard.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useMeta } from '../composables/useMeta'
import { assetUrl } from '../utils/preferences'

const main = ref(null)
onMounted(() => {
  if (window.history.state?.back) main.value?.focus({ preventScroll: true })
})
useMeta(() => ({ title: portfolio.name, description: portfolio.tagline }))
</script>

<template>
  <div class="selector-page">
    <a class="skip" href="#main">Skip to content</a>
    <header class="selector__header">
      <div class="selector__brand">
        <img :src="assetUrl('favicon.png')" alt="" width="32" height="32" />
        <span>Portfolio</span>
      </div>
      <ThemeToggle />
    </header>
    <main id="main" ref="main" class="selector" tabindex="-1">
      <div class="selector__intro">
        <h1 class="selector__name">{{ portfolio.name }}</h1>
        <p v-if="portfolio.availability" class="pill"><span class="pill__dot" aria-hidden="true" />{{ portfolio.availability }}</p>
      </div>
      <div class="selector__choices">
        <AudienceCard mode="dev" index="01" title="Technical view" :role="portfolio.role" :summary="portfolio.tagline" />
        <AudienceCard mode="client" index="02" title="Client view" :role="portfolio.client.role" :summary="portfolio.client.tagline" />
      </div>
    </main>
    <footer class="selector__footer">
      <p>© {{ new Date().getFullYear() }} {{ portfolio.name }}</p>
      <p v-if="portfolio.lastUpdated">Last updated: {{ portfolio.lastUpdated }}</p>
    </footer>
  </div>
</template>
