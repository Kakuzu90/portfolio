<script setup>
defineProps({
  index: { type: String, required: true },
  label: { type: String, required: true },
  id: { type: String, required: true },
  as: { type: String, default: 'h2' },
})
</script>

<template>
  <component :is="as" :id="id" class="overline">
    <span class="overline__idx">{{ index }}</span>{{ label }}
  </component>
</template>
