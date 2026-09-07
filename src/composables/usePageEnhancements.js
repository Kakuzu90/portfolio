import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

export function usePageEnhancements(sectionIds) {
  const activeSection = ref('')
  const showToTop = ref(false)
  let observer

  onMounted(async () => {
    await nextTick()
    const reveals = [...document.querySelectorAll('.reveal')]
    const hero = document.getElementById('top')

    document.querySelectorAll('.list, .skills, .services, .process').forEach((group) => {
      ;[...group.children].forEach((child, index) => {
        child.style.setProperty('--i', Math.min(index, 8))
      })
    })

    requestAnimationFrame(() => hero?.classList.add('in'))

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((node) => node.classList.add('in'))
      showToTop.value = true
      return
    }

    const ratios = {}
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight * 0.92) {
            entry.target.classList.add('in')
            if (!entry.target.dataset.navSection && entry.target.id !== 'top') observer.unobserve(entry.target)
          }

          if (entry.target.dataset.navSection) {
            ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0
          }

          if (entry.target.id === 'top') showToTop.value = !entry.isIntersecting
        })

        activeSection.value = Object.entries(ratios).reduce(
          (best, [id, ratio]) => (ratio > best.ratio ? { id, ratio } : best),
          { id: '', ratio: 0 },
        ).id
      },
      { threshold: [0, 0.15, 0.35, 0.6, 1], rootMargin: '0px 0px -8% 0px' },
    )

    reveals.forEach((node) => observer.observe(node))
    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        section.dataset.navSection = 'true'
        observer.observe(section)
      }
    })
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeSection, showToTop }
}
