<script setup>
defineProps({
  name: { type: String, default: '' },
})

// Feather-style stroke icons, keyed to data.json service `icon` values.
const paths = {
  web: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M2 8h20"/><path d="M6 5.5h.01M9 5.5h.01"/><path d="M8 21h8M12 17v4"/>',
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  api: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><path d="m9 9 3 3-3 3M12 12h4"/>',
  automation: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>',
  backend: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
  maintenance: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z"/>',
}
</script>

<template>
  <svg
    class="service__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="paths[name] || paths.web"
  />
</template>
