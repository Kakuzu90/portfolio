<script setup>
import { computed } from 'vue'
import portfolio from '../../data.json'
import ContactSection from '../components/ContactSection.vue'
import PortfolioHero from '../components/PortfolioHero.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ScrollTopButton from '../components/ScrollTopButton.vue'
import SectionHeading from '../components/SectionHeading.vue'
import ServiceIcon from '../components/ServiceIcon.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteNav from '../components/SiteNav.vue'
import { useMeta } from '../composables/useMeta'
import { usePageEnhancements } from '../composables/usePageEnhancements'

const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

const selectedProjects = computed(() => {
  const projects = new Map(portfolio.projects.map((project) => [project.id, project]))
  return portfolio.client.selectedProjects.map((id) => projects.get(id)).filter(Boolean)
})

const { activeSection, showToTop } = usePageEnhancements(navigation.map(({ id }) => id))

useMeta(() => ({
  title: `${portfolio.name} — ${portfolio.client.role}`,
  description: portfolio.client.metaDescription || portfolio.client.headline,
}))
</script>

<template>
  <div class="portfolio-page">
    <a class="skip" href="#main">Skip to content</a>
    <SiteNav :name="portfolio.name" mode="client" :links="navigation" :active-section="activeSection" />
    <main id="main">
    <PortfolioHero :portfolio="portfolio" mode="client" />

    <section id="work" class="section reveal" aria-labelledby="work-label">
      <SectionHeading id="work-label" index="01" label="Selected Work" />
      <ul class="list client-projects">
        <li v-for="project in selectedProjects" :key="project.id" class="item reveal">
          <ProjectCard :project="project" mode="client" />
        </li>
      </ul>
    </section>

    <section id="services" class="section reveal" aria-labelledby="services-label">
      <SectionHeading id="services-label" index="02" label="Services" />
      <ul class="services">
        <li v-for="service in portfolio.client.services" :key="service.name" class="service reveal">
          <span class="service__badge" aria-hidden="true"><ServiceIcon :name="service.icon" /></span>
          <h3 class="service__title">{{ service.name }}</h3>
          <p class="service__detail">{{ service.description }}</p>
        </li>
      </ul>
    </section>

    <section id="process" class="section reveal" aria-labelledby="process-label">
      <SectionHeading id="process-label" index="03" label="Process" />
      <ol class="process">
        <li v-for="(step, index) in portfolio.client.process" :key="step.title" class="process__step reveal">
          <span class="process__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="process__title">{{ step.title }}</h3>
            <p class="process__detail">{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section id="tools" class="section reveal" aria-labelledby="tools-label">
      <SectionHeading id="tools-label" index="04" label="Technology" />
      <p class="prose prose--compact">{{ portfolio.client.technologyIntro }}</p>
      <ul class="tags tags--large"><li v-for="technology in portfolio.client.technologies" :key="technology" class="tag">{{ technology }}</li></ul>
    </section>

      <ContactSection :portfolio="portfolio" mode="client" />
    </main>
    <SiteFooter :name="portfolio.name" :last-updated="portfolio.lastUpdated" mode="client" />
    <ScrollTopButton :show="showToTop" />
  </div>
</template>
