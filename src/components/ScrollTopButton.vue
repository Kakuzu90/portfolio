<script setup>
defineProps({ show: Boolean })

function scrollToTop() {
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  document.querySelector('.nav__brand')?.focus()
}
</script>

<template>
  <button class="to-top" :class="{ show }" type="button" aria-label="Scroll back to top" @click="scrollToTop">
    <span class="to-top__arrow" aria-hidden="true">↑</span>
  </button>
</template>
