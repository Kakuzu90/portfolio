<script setup>
defineProps({
  index: { type: String, required: true },
  label: { type: String, required: true },
  id: { type: String, required: true },
})
</script>

<template>
  <p :id="id" class="overline">
    <span class="overline__idx">{{ index }}</span>{{ label }}
  </p>
</template>
