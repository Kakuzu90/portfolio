<script setup>
import { RouterLink } from 'vue-router'
import { clearPortfolioView } from '../utils/preferences'

defineProps({
  name: { type: String, required: true },
  lastUpdated: { type: String, default: '' },
})
</script>

<template>
  <footer class="footer">
    <p class="footer__meta">© {{ new Date().getFullYear() }} {{ name }}</p>
    <p v-if="lastUpdated" class="footer__meta footer__updated">Last updated: {{ lastUpdated }}</p>
    <RouterLink class="footer__switch" :to="{ name: 'selector' }" @click="clearPortfolioView">Choose another view</RouterLink>
  </footer>
</template>
