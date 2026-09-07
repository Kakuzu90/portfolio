<script setup>
import { ref } from 'vue'
import { assetUrl } from '../utils/preferences'

const props = defineProps({
  email: { type: String, required: true },
  resumeUrl: { type: String, default: '' },
  mode: { type: String, required: true },
  place: { type: String, default: 'hero' },
})

const copied = ref(false)
const announcement = ref('')
let resetTimer

function markCopied() {
  copied.value = true
  announcement.value = 'Email copied to clipboard'
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copied.value = false
    announcement.value = ''
  }, 1800)
}

function fallbackCopy() {
  const textarea = document.createElement('textarea')
  textarea.value = props.email
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    markCopied()
  } catch {
    announcement.value = 'Copy failed'
  }
  textarea.remove()
}

function copyEmail() {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(props.email).then(markCopied, fallbackCopy)
  } else {
    fallbackCopy()
  }
}
</script>

<template>
  <div class="actions">
    <a class="btn btn--primary" :href="`mailto:${email}`">
      {{ mode === 'client' ? 'Start a Project' : place === 'footer' ? 'Get in touch' : 'Email me' }}
    </a>
    <button class="copy" :class="{ 'is-copied': copied }" type="button" aria-label="Copy email address" @click="copyEmail">
      <span class="copy__label">Copy</span>
      <span class="copy__done" aria-hidden="true">Copied</span>
      <span class="sr-only" aria-live="polite">{{ announcement }}</span>
    </button>
    <a v-if="mode === 'dev' && resumeUrl" class="btn btn--quiet" :href="assetUrl(resumeUrl)" target="_blank" rel="noopener noreferrer">Résumé</a>
  </div>
</template>
