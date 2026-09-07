<script setup>
import { computed } from 'vue'
import ActionButtons from './ActionButtons.vue'
import SectionHeading from './SectionHeading.vue'

const props = defineProps({
  portfolio: { type: Object, required: true },
  mode: { type: String, required: true },
  index: { type: String, default: '05' },
})

const heading = computed(() => (
  props.mode === 'client'
    ? props.portfolio.client.contactHeading
    : 'Let’s build something dependable.'
))

const description = computed(() => (
  props.mode === 'client'
    ? props.portfolio.client.contactText
    : 'Have a role, collaboration, or backend challenge in mind? Send me a message.'
))
</script>

<template>
  <section id="contact" class="section reveal" aria-labelledby="contact-label">
    <SectionHeading id="contact-label" :index="index" label="Contact" />
    <div class="contact__body">
      <div class="contact__intro">
        <p v-if="portfolio.availability" class="contact__status"><span />{{ portfolio.availability }}</p>
        <h2 class="contact__heading">{{ heading }}</h2>
        <p class="contact__text">{{ description }}</p>
      </div>

      <a class="contact__email" :href="`mailto:${portfolio.contact.email}`">
        <span class="contact__email-label">Start a conversation</span>
        <span class="contact__email-address">{{ portfolio.contact.email }}</span>
        <span class="contact__email-arrow" aria-hidden="true">↗</span>
      </a>

      <div class="contact__footer">
        <ActionButtons
          :email="portfolio.contact.email"
          :resume-url="portfolio.resumeUrl"
          :mode="mode"
          place="footer"
          hide-primary
        />
        <ul class="socials">
          <li v-for="social in portfolio.contact.socials" :key="social.label">
            <a class="link" :href="social.url" target="_blank" rel="noopener noreferrer">{{ social.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
