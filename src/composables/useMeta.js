import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useMeta(getMetadata) {
  const route = useRoute()

  function update() {
    const metadata = getMetadata()
    document.title = metadata.title

    const values = {
      'meta[name="description"]': metadata.description,
      'meta[property="og:title"]': metadata.title,
      'meta[property="og:description"]': metadata.description,
      'meta[property="og:url"]': window.location.href,
      'meta[name="twitter:title"]': metadata.title,
      'meta[name="twitter:description"]': metadata.description,
    }

    Object.entries(values).forEach(([selector, value]) => {
      document.querySelector(selector)?.setAttribute('content', value)
    })
  }

  onMounted(update)
  watch(() => route.fullPath, update)
}
