<script setup>
import { computed } from 'vue'
import { assetUrl } from '../utils/preferences'

const props = defineProps({
  project: { type: Object, required: true },
  mode: { type: String, required: true },
})

const hasLink = computed(() => props.project.url && props.project.url !== '#')
const tag = computed(() => (hasLink.value ? 'a' : 'article'))
</script>

<template>
  <component
    :is="tag"
    class="item__link"
    :href="hasLink ? project.url : undefined"
    :target="hasLink ? '_blank' : undefined"
    :rel="hasLink ? 'noopener noreferrer' : undefined"
  >
    <div class="item__head">
      <h3 class="item__title">{{ project.name }}</h3>
      <span v-if="hasLink" class="item__meta item__arrow" aria-hidden="true">↗</span>
    </div>

    <template v-if="mode === 'client'">
      <p v-if="project.clientSummary" class="project-summary">{{ project.clientSummary }}</p>
      <p class="case"><span class="case__label">The problem</span>{{ project.clientProblem || project.problem }}</p>
      <p class="case"><span class="case__label">The solution</span>{{ project.clientSolution || project.outcome }}</p>
      <div v-if="project.features?.length" class="case">
        <p class="case__label">Key features</p>
        <ul class="feature-list"><li v-for="feature in project.features" :key="feature">{{ feature }}</li></ul>
      </div>
      <p v-if="project.benefit" class="case"><span class="case__label">Benefit</span>{{ project.benefit }}</p>
      <div v-if="project.screenshots?.length" class="project-gallery">
        <figure v-for="(image, index) in project.screenshots" :key="typeof image === 'string' ? image : image.src" class="project-gallery__item">
          <img
            class="project-gallery__image"
            :src="assetUrl(typeof image === 'string' ? image : image.src)"
            :alt="typeof image === 'string' ? `${project.name} screenshot ${index + 1}` : image.alt"
            loading="lazy"
            decoding="async"
          />
          <figcaption v-if="typeof image !== 'string' && image.caption" class="project-gallery__caption">{{ image.caption }}</figcaption>
        </figure>
      </div>
    </template>

    <template v-else>
      <p v-if="project.role" class="item__role">{{ project.role }}</p>
      <p v-if="project.problem" class="case"><span class="case__label">Problem</span>{{ project.problem }}</p>
      <p v-if="project.outcome" class="case"><span class="case__label">Implementation</span>{{ project.outcome }}</p>
      <p v-if="project.technicalDetails?.architecture" class="case"><span class="case__label">Architecture</span>{{ project.technicalDetails.architecture }}</p>
      <div v-if="project.technicalDetails?.responsibilities?.length" class="case">
        <p class="case__label">Responsibilities</p>
        <ul class="detail-list"><li v-for="item in project.technicalDetails.responsibilities" :key="item">{{ item }}</li></ul>
      </div>
      <div v-if="project.technicalDetails?.engineeringNotes?.length" class="case">
        <p class="case__label">Engineering Notes</p>
        <ul class="detail-list"><li v-for="item in project.technicalDetails.engineeringNotes" :key="item">{{ item }}</li></ul>
      </div>
      <ul v-if="project.tags?.length" class="tags"><li v-for="technology in project.tags" :key="technology" class="tag">{{ technology }}</li></ul>
    </template>
  </component>
</template>
