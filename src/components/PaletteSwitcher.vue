<script setup>
import { ref } from 'vue'

const palettes = [
  { id: 'cobalt', name: 'Midnight Cobalt', colors: ['#315EFB', '#16A6A1', '#101828'] },
  { id: 'forest', name: 'Forest Copper', colors: ['#B85432', '#55735D', '#17201C'] },
  { id: 'aubergine', name: 'Aubergine Gold', colors: ['#A66A18', '#6D315F', '#251426'] },
  { id: 'cyan', name: 'Slate Cyan', colors: ['#008B9B', '#5966C2', '#10242B'] },
  { id: 'lime', name: 'Graphite Lime', colors: ['#5E7D16', '#2D6A58', '#191C17'] },
]

const menu = ref(null)
const current = ref(document.documentElement.dataset.palette || 'cobalt')

function selectPalette(palette) {
  current.value = palette
  document.documentElement.dataset.palette = palette
  try {
    localStorage.setItem('portfolio_palette', palette)
  } catch {
    // The palette still changes when storage is unavailable.
  }
  menu.value.open = false
}
</script>

<template>
  <details ref="menu" class="palette-switcher">
    <summary class="palette-switcher__trigger" aria-label="Choose color palette" title="Choose color palette">
      <span class="palette-switcher__trigger-dot palette-switcher__trigger-dot--one" />
      <span class="palette-switcher__trigger-dot palette-switcher__trigger-dot--two" />
      <span class="palette-switcher__trigger-dot palette-switcher__trigger-dot--three" />
    </summary>
    <div class="palette-switcher__panel">
      <div class="palette-switcher__head">
        <p>Color palette</p>
        <span>05 options</span>
      </div>
      <button
        v-for="palette in palettes"
        :key="palette.id"
        class="palette-option"
        :class="{ 'is-active': current === palette.id }"
        type="button"
        :aria-pressed="current === palette.id"
        @click="selectPalette(palette.id)"
      >
        <span class="palette-option__swatches" aria-hidden="true">
          <span v-for="color in palette.colors" :key="color" :style="{ backgroundColor: color }" />
        </span>
        <span class="palette-option__name">{{ palette.name }}</span>
        <span class="palette-option__check" aria-hidden="true">{{ current === palette.id ? '✓' : '' }}</span>
      </button>
    </div>
  </details>
</template>
