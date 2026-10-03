<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { assetUrl } from '../utils/preferences'

const props = defineProps({
  email: { type: String, required: true },
  resumeUrl: { type: String, default: '' },
  mode: { type: String, required: true },
  place: { type: String, default: 'hero' },
  hidePrimary: Boolean,
})

const copied = ref(false)
const copying = ref(false)
const announcement = ref('')
let resetTimer
let active = true

function markCopied() {
  if (!active) return
  copied.value = true
  announcement.value = 'Email copied to clipboard'
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copied.value = false
    announcement.value = ''
  }, 1800)
}

function fallbackCopy(originalFocus) {
  const currentFocus = document.activeElement
  const previousFocus = currentFocus === document.body ? originalFocus : currentFocus
  const textarea = document.createElement('textarea')
  textarea.value = props.email
  textarea.className = 'clipboard-fallback'
  textarea.readOnly = true
  textarea.tabIndex = -1
  textarea.setAttribute('aria-hidden', 'true')
  document.body.appendChild(textarea)
  try {
    textarea.select()
    if (document.execCommand('copy')) {
      markCopied()
    } else {
      throw new Error('Copy failed')
    }
  } catch {
    clearTimeout(resetTimer)
    copied.value = false
    announcement.value = 'Copy failed'
  } finally {
    textarea.remove()
  }
  return previousFocus
}

async function copyEmail() {
  if (copying.value) return
  const originalFocus = document.activeElement
  let focusToRestore = originalFocus
  copying.value = true
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.email)
      markCopied()
    } else {
      focusToRestore = fallbackCopy(originalFocus)
    }
  } catch {
    if (active) focusToRestore = fallbackCopy(originalFocus)
  } finally {
    copying.value = false
    if (focusToRestore instanceof HTMLElement) {
      await nextTick()
      if (active && focusToRestore.isConnected && document.activeElement === document.body) {
        focusToRestore.focus({ preventScroll: true })
      }
    }
  }
}

onBeforeUnmount(() => {
  active = false
  clearTimeout(resetTimer)
})
</script>

<template>
  <div class="actions">
    <a v-if="!hidePrimary" class="btn btn--primary" :href="`mailto:${email}`">
      {{ mode === 'client' ? 'Start a Project' : place === 'footer' ? 'Get in touch' : 'Email me' }}
    </a>
    <button class="copy" :class="{ 'is-copied': copied }" type="button" aria-label="Copy email address" :aria-busy="copying" :disabled="copying" @click="copyEmail">
      <span class="copy__label">Copy</span>
      <span class="copy__done" aria-hidden="true">Copied</span>
    </button>
    <span class="sr-only" role="status" aria-live="polite" aria-atomic="true">{{ announcement }}</span>
    <a v-if="mode === 'dev' && resumeUrl" class="btn btn--quiet" :href="assetUrl(resumeUrl)" target="_blank" rel="noopener noreferrer">Résumé</a>
  </div>
</template>
