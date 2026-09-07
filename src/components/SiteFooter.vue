<script setup>
import { RouterLink } from 'vue-router'
import { savePortfolioView } from '../utils/preferences'

const props = defineProps({
  name: { type: String, required: true },
  lastUpdated: { type: String, default: '' },
  mode: { type: String, default: 'dev' },
})

const other = props.mode === 'client' ? 'dev' : 'client'
const otherLabel = props.mode === 'client' ? 'Technical view' : 'Client view'
</script>

<template>
  <footer class="footer">
    <p class="footer__meta">© {{ new Date().getFullYear() }} {{ name }}</p>
    <p v-if="lastUpdated" class="footer__meta footer__updated">Last updated: {{ lastUpdated }}</p>
    <RouterLink class="footer__switch" :to="{ name: other }" @click="savePortfolioView(other)">{{ otherLabel }} →</RouterLink>
  </footer>
</template>
