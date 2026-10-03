<script setup>
import { RouterLink } from 'vue-router'
import { savePortfolioView } from '../utils/preferences'

defineProps({
  mode: { type: String, required: true },
  index: { type: String, required: true },
  title: { type: String, required: true },
  role: { type: String, required: true },
  summary: { type: String, required: true },
})
</script>

<template>
  <RouterLink class="audience-card" :to="{ name: mode }" @click="savePortfolioView(mode)">
    <span class="audience-card__head" aria-hidden="true">
      <span class="audience-card__number">{{ index }}</span>
      <svg class="audience-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </span>
    <h2 class="audience-card__title">{{ title }}</h2>
    <p class="audience-card__role">{{ role }}</p>
    <p class="audience-card__summary">{{ summary }}</p>
  </RouterLink>
</template>
