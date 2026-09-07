<script setup>
import portfolio from '../../data.json'
import ContactSection from '../components/ContactSection.vue'
import PortfolioHero from '../components/PortfolioHero.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ScrollTopButton from '../components/ScrollTopButton.vue'
import SectionHeading from '../components/SectionHeading.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteNav from '../components/SiteNav.vue'
import { useMeta } from '../composables/useMeta'
import { usePageEnhancements } from '../composables/usePageEnhancements'

const navigation = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const { activeSection, showToTop } = usePageEnhancements(navigation.map(({ id }) => id))

useMeta(() => ({
  title: `${portfolio.name} — ${portfolio.role}`,
  description: portfolio.tagline || portfolio.headline,
}))
</script>

<template>
  <div class="portfolio-page">
    <a class="skip" href="#main">Skip to content</a>
    <SiteNav :name="portfolio.name" mode="dev" :links="navigation" :active-section="activeSection" />
    <main id="main">
    <PortfolioHero :portfolio="portfolio" mode="dev" />

    <section id="about" class="section reveal" aria-labelledby="about-label">
      <SectionHeading id="about-label" index="01" label="About" />
      <p class="prose">{{ portfolio.about }}</p>
    </section>

    <section id="work" class="section reveal" aria-labelledby="work-label">
      <SectionHeading id="work-label" index="02" label="Experience" />
      <ul class="list">
        <li v-for="job in portfolio.experience" :key="`${job.org}-${job.period}`" class="item reveal">
          <div class="item__head">
            <h3 class="item__title">{{ job.title }} <span class="item__org">{{ job.org }}</span></h3>
            <span class="item__meta">{{ job.period }}</span>
          </div>
          <p class="item__detail">{{ job.detail }}</p>
        </li>
      </ul>
    </section>

    <section id="projects" class="section reveal" aria-labelledby="projects-label">
      <SectionHeading id="projects-label" index="03" label="Projects" />
      <ul class="list">
        <li v-for="project in portfolio.projects" :key="project.id" class="item reveal">
          <ProjectCard :project="project" mode="dev" />
        </li>
      </ul>
    </section>

    <section id="skills" class="section reveal" aria-labelledby="skills-label">
      <SectionHeading id="skills-label" index="04" label="Capabilities" />
      <ul class="skills"><li v-for="skill in portfolio.skills" :key="skill" class="skill reveal">{{ skill }}</li></ul>
    </section>

      <ContactSection :portfolio="portfolio" mode="dev" />
    </main>
    <SiteFooter :name="portfolio.name" :last-updated="portfolio.lastUpdated" />
    <ScrollTopButton :show="showToTop" />
  </div>
</template>
