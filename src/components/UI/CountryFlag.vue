<template>
  <div class="rounded">
    <img :src="flagSrc" :alt="altText" height="26" width="26" class="rounded border border-black" />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { countryCodeDict } from './FlagCode.vue'

const props = defineProps({
  country: {
    required: true
  }
})

const getFlagCode = (country) => {
  return countryCodeDict[country] || 'xx'
}

const getFlagSrc = (code) => {
  return new URL(`../../assets/flags/4x3/${code.toLowerCase()}.svg`, import.meta.url).href
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
