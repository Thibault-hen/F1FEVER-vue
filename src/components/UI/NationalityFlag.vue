<template>
  <img :src="flagSrc" :alt="altText" height="26" width="26" class="rounded dark:border-0 border" />
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { nationalityCodeDict } from './FlagCode.vue'

const props = defineProps({
  nationality: {
    type: String,
    required: true
  }
})

const getFlagCode = (nationality) => {
  return nationalityCodeDict[nationality] || 'xx'
}
const getFlagSrc = (code) => {
  return new URL(`../../assets/flags/4x3/${code.toLowerCase()}.svg`, import.meta.url).href
}

const flagSrc = computed(() => {
  const nationalityCode = getFlagCode(props.nationality)
  return getFlagSrc(nationalityCode)
})

const altText = computed(() => {
  const nationalityCode = getFlagCode(props.nationality)
  if (nationalityCode === 'xx') return 'Flag not found'
  else return `Flag of ${props.nationality} nationality`
})
</script>
