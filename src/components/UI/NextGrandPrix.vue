<template>
  <transition
    enter-active-class="transition-transform duration-300 ease-in-out"
    enter-from-class="transform -translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
  >
    <div v-if="!isLoading && nextGrandPrix" class="flex items-center p-4">
      <CountryFlag :country="nextGrandPrix.country" class="mr-2" />
      <span class="text-sm md:text-base text-primary uppercase tracking-wide">
        {{ nextGrandPrix.gp_name }}
      </span>
      <span class="text-sm md:text-base dark:text-white uppercase tracking-wide"
        >&nbsp;{{ countdown }}</span
      >
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import { useI18n } from 'vue-i18n'
import { useNextGrandPrix } from '@/composables/nextGrandPrix'

const { getNextGrandPrix, isLoading, nextGrandPrix } = useNextGrandPrix()
const countdown = ref('')
const { t } = useI18n()

const setCountdown = () => {
  const now = new Date()
  const nextGrandPrixTime = new Date(`${nextGrandPrix.value.date} ${nextGrandPrix.value.time}`)
  const timeDifference = nextGrandPrixTime - now
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  switch (true) {
    case days > 1:
      countdown.value = t('countdown.days_plural', { days })
      break
    case days === 1:
      countdown.value = t('countdown.days', { days })
      break
    case days === 0:
      countdown.value = t('countdown.today', { days })
      break
    case days === -1:
      countdown.value = t('countdown.past', { days: Math.abs(days) })
      break
    case days < -1:
      countdown.value = t('countdown.past_plural', { days: Math.abs(days) })
      break
  }
}

onMounted(async () => {
  await getNextGrandPrix()
  setCountdown()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
