<script setup>
import ActionButtons from './ActionButtons.vue'
import SectionHeading from './SectionHeading.vue'

defineProps({
  portfolio: { type: Object, required: true },
  mode: { type: String, required: true },
  index: { type: String, default: '05' },
})
</script>

<template>
  <section id="contact" class="section reveal" aria-labelledby="contact-label">
    <SectionHeading id="contact-label" :index="index" label="Contact" />
    <div class="contact__body">
      <template v-if="mode === 'client'">
        <h2 class="contact__heading">{{ portfolio.client.contactHeading }}</h2>
        <p class="prose prose--compact">{{ portfolio.client.contactText }}</p>
      </template>
      <a class="contact__email" :href="`mailto:${portfolio.contact.email}`">{{ portfolio.contact.email }}</a>
      <ActionButtons :email="portfolio.contact.email" :resume-url="portfolio.resumeUrl" :mode="mode" place="footer" />
      <ul class="socials">
        <li v-for="social in portfolio.contact.socials" :key="social.label">
          <a class="link" :href="social.url" target="_blank" rel="noopener noreferrer">{{ social.label }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>
