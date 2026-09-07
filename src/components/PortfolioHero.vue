<script setup>
import ActionButtons from './ActionButtons.vue'
import SectionHeading from './SectionHeading.vue'

defineProps({
  portfolio: { type: Object, required: true },
  mode: { type: String, required: true },
})
</script>

<template>
  <section id="top" class="hero reveal" :class="`hero--${mode}`">
    <SectionHeading id="top-label" index="00" :label="mode === 'client' ? 'For Clients' : 'Technical Portfolio'" />
    <p v-if="portfolio.availability" class="pill"><span class="pill__dot" />{{ portfolio.availability }}</p>
    <h1 class="hero__name">{{ portfolio.name }}</h1>
    <template v-if="mode === 'client'">
      <p class="hero__role">{{ portfolio.client.role }}</p>
      <p class="hero__headline">{{ portfolio.client.headline }}</p>
      <p class="hero__tagline">{{ portfolio.client.tagline }}</p>
    </template>
    <template v-else>
      <p class="hero__role">{{ portfolio.role }}</p>
      <p class="hero__headline">{{ portfolio.headline }}</p>
      <p class="hero__tagline">{{ portfolio.tagline }}</p>
    </template>
    <ActionButtons :email="portfolio.contact.email" :resume-url="portfolio.resumeUrl" :mode="mode" />
    <span class="hero__scroll" aria-hidden="true">Scroll to explore <span>↓</span></span>
  </section>
</template>
