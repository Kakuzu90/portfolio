<script setup>
import { RouterLink } from 'vue-router'
import portfolio from '../../data.json'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useMeta } from '../composables/useMeta'
import { savePortfolioView } from '../utils/preferences'

useMeta(() => ({
  title: `${portfolio.name} — Choose a portfolio`,
  description: `Choose the technical or client view of ${portfolio.name}'s portfolio.`,
}))

</script>

<template>
  <div class="selector-page">
    <a class="skip" href="#main">Skip to portfolio choices</a>
    <ThemeToggle class="selector__theme" />
    <main id="main" class="selector">
      <header class="selector__intro reveal in">
        <p class="overline"><span class="overline__idx">00</span>Portfolio</p>
        <h1 class="selector__name">{{ portfolio.name }}</h1>
        <p class="selector__prompt">Choose how you want to explore my work.</p>
      </header>
      <div class="selector__choices" aria-label="Portfolio views">
        <RouterLink class="audience-card reveal in" :to="{ name: 'dev' }" @click="savePortfolioView('dev')">
          <span class="audience-card__number" aria-hidden="true">01</span>
          <h2>Technical</h2>
          <p>Explore my engineering work, backend systems, APIs, architecture, and technical case studies.</p>
          <span class="audience-card__cta">Enter Technical Portfolio <span aria-hidden="true">→</span></span>
        </RouterLink>
        <RouterLink class="audience-card reveal in" :to="{ name: 'client' }" @click="savePortfolioView('client')">
          <span class="audience-card__number" aria-hidden="true">02</span>
          <h2>Client</h2>
          <p>See the problems I solve, the software I build, and how we can work together.</p>
          <span class="audience-card__cta">View Client Portfolio <span aria-hidden="true">→</span></span>
        </RouterLink>
      </div>
    </main>
  </div>
</template>
