<template>
  <transition name="fade">
    <div v-if="!isLoading && nextGrandPrix.name" class="flex items-center">
      <CountryFlag :country="nextGrandPrix.country" class="mr-2" />
      <span class="text-sm md:text-lg font-bold text-red-500 uppercase tracking-widest">
        {{ nextGrandPrix.name }} GP
      </span>
      <span class="text-sm md:text-lg dark:text-white font-bold uppercase"
        >&nbsp;{{ countdown }}</span
      >
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CountryFlag from './CountryFlag.vue'
import { useI18n } from 'vue-i18n'

const nextGrandPrix = ref({})
const countdown = ref('')
const isLoading = ref(true)
const { t } = useI18n()

const setCountdown = () => {
  const now = new Date()
  const nextGrandPrixTime = new Date(`${nextGrandPrix.value.date} ${nextGrandPrix.value.time}`)

  const timeDifference = nextGrandPrixTime - now
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  if (days > 1) {
    countdown.value = t('countdown.days_plural', { days })
  } else if (days === 1) {
    countdown.value = t('countdown.days', { days })
  } else {
    countdown.value = t('countdown.today', { days })
  }
}

const fetchData = async () => {
  try {
    const response = await axios.get('http://f1fever.test/api/grand-prix-list/next')
    nextGrandPrix.value = response.data.data
    setCountdown()
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
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
