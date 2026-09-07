<script setup>
defineProps({ show: Boolean })

function scrollToTop() {
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelector('.nav__brand')?.focus({ preventScroll: true })
  window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' })
}
</script>

<template>
  <button class="to-top" :class="{ show }" type="button" aria-label="Scroll back to top" @click="scrollToTop">
    <span class="to-top__arrow" aria-hidden="true">↑</span>
  </button>
</template>
