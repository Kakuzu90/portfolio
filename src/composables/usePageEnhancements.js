import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

export function usePageEnhancements(sectionIds) {
  const activeSection = ref('')
  const showToTop = ref(false)
  let observer
  let layoutObserver
  let frame
  let sections = []
  let hero
  let disposed = false

  function updateActiveSection() {
    frame = undefined
    const root = document.documentElement
    const clearance = Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
    const activationLine = clearance + 1
    let current = ''

    for (const section of sections) {
      if (section.getBoundingClientRect().top > activationLine) break
      current = section.id
    }

    // The last section may be too short to reach the activation line.
    if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= root.scrollHeight) {
      current = sections.at(-1)?.id || current
    }

    activeSection.value = current
    showToTop.value = Boolean(hero && hero.getBoundingClientRect().bottom <= clearance)
  }

  function scheduleUpdate() {
    if (!disposed && frame === undefined) frame = requestAnimationFrame(updateActiveSection)
  }

  onMounted(async () => {
    await nextTick()
    if (disposed) return
    const reveals = [...document.querySelectorAll('.reveal')]
    hero = document.getElementById('top')
    sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    if ('ResizeObserver' in window) {
      layoutObserver = new ResizeObserver(scheduleUpdate)
      ;[document.querySelector('.nav'), document.querySelector('main')]
        .filter(Boolean).forEach((node) => layoutObserver.observe(node))
    }
    const initialHash = window.location.hash
    const alignInitialHash = () => {
      // Initial routing finishes before the app mounts, so its anchor may not exist yet.
      if (!disposed && initialHash && window.location.hash === initialHash && window.scrollY === 0) {
        document.getElementById(initialHash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
      scheduleUpdate()
    }
    if (document.fonts) document.fonts.ready.then(alignInitialHash)
    else alignInitialHash()
    scheduleUpdate()

    document.querySelectorAll('.list, .skills, .services, .process').forEach((group) => {
      ;[...group.children].forEach((child, index) => {
        child.style.setProperty('--i', Math.min(index, 8))
      })
    })

    requestAnimationFrame(() => hero?.classList.add('in'))

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((node) => node.classList.add('in'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight * 0.92) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: [0, 0.15, 0.35, 0.6, 1], rootMargin: '0px 0px -8% 0px' },
    )

    reveals.forEach((node) => observer.observe(node))
  })

  onBeforeUnmount(() => {
    disposed = true
    observer?.disconnect()
    layoutObserver?.disconnect()
    if (frame !== undefined) cancelAnimationFrame(frame)
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    window.removeEventListener('hashchange', scheduleUpdate)
  })

  return { activeSection, showToTop }
}
