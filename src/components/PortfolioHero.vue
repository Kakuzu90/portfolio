<script setup>
import ActionButtons from './ActionButtons.vue'
import SectionHeading from './SectionHeading.vue'

defineProps({
  portfolio: { type: Object, required: true },
  mode: { type: String, required: true },
})
</script>

<template>
  <section id="top" class="hero reveal" :class="`hero--${mode}`" aria-labelledby="hero-name">
    <div class="hero__identity">
      <SectionHeading id="top-label" as="p" index="00" :label="mode === 'client' ? 'For Clients' : 'Technical Portfolio'" />
      <p v-if="portfolio.availability" class="pill"><span class="pill__dot" aria-hidden="true" />{{ portfolio.availability }}</p>
      <h1 id="hero-name" class="hero__name">{{ portfolio.name }}</h1>
      <p class="hero__role">{{ mode === 'client' ? portfolio.client.role : portfolio.role }}</p>
    </div>
    <div class="hero__message">
      <p class="hero__headline">{{ mode === 'client' ? portfolio.client.headline : portfolio.headline }}</p>
      <p class="hero__tagline">{{ mode === 'client' ? portfolio.client.tagline : portfolio.tagline }}</p>
      <ul v-if="mode === 'dev' && portfolio.skills?.length" class="skills hero__stack">
        <li v-for="skill in portfolio.skills" :key="skill" class="skill">{{ skill }}</li>
      </ul>
      <ActionButtons :email="portfolio.contact.email" :resume-url="portfolio.resumeUrl" :mode="mode" />
    </div>
    <span class="hero__scroll" aria-hidden="true">Scroll to explore <span>↓</span></span>
  </section>
</template>
