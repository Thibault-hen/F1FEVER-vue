<template>
  <img :src="flagSrc" :alt="altText" height="26" width="26" class="rounded" />
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { countryCodeDict } from './FlagCode.vue'

const props = defineProps({
  country: {
    type: String,
    required: true
  }
})

const getFlagCode = (country) => {
  return countryCodeDict[country] || 'xx'
}

const getFlagSrc = (code) => {
  return `src/assets/flags/4x3/${code.toLowerCase()}.svg`
}

const flagSrc = computed(() => {
  const countryCode = getFlagCode(props.country)
  return getFlagSrc(countryCode)
})

const altText = computed(() => {
  const countryCode = getFlagCode(props.country)
  if (countryCode === 'xx') return 'Flag not found'
  else return `Flag of ${props.country} country`
})
</script>
