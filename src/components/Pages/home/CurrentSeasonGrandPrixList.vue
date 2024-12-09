<template>
  <div class="flex justify-between p-2 gap-2">
    <div
      class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest items-center flex"
    >
      {{ $t('home.current_grandprix.label') }}
    </div>
    <div class="flex gap-2">
      <button @click="prev" :disabled="currentIndex === 0">
        <Icon
          icon="material-symbols-light:navigate-before"
          height="36px"
          width="36px"
          :class="
            currentIndex === 0
              ? 'bg-primary/30 dark:bg-primary/0 hover:bg-primary/70 dark:hover:bg-primary'
              : 'bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary'
          "
          class="border border-primary rounded-md transition-all duration-300"
          color="white"
        />
      </button>
      <button @click="next" :disabled="currentIndex === store.grandPrixList.length - itemsPerSlide">
        <Icon
          icon="material-symbols-light:navigate-next"
          height="36px"
          width="36px"
          :class="
            currentIndex === store.grandPrixList.length - itemsPerSlide
              ? 'bg-primary/30 dark:bg-primary/0 hover:bg-primary/70 dark:hover:bg-primary'
              : 'bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary'
          "
          class="border border-primary rounded-md transition-all duration-300"
          color="white"
        />
      </button>
    </div>
  </div>
  <div class="p-2 flex flex-grow flex-col">
    <div class="dark:text-white flex justify-between gap-4">
      <div
        class="relative w-full p-4 bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 rounded-lg shadow-md dark:border-slate-50/[0.06] border"
        v-for="(grandPrix, index) in visibleGPs"
        :key="index"
      >
        <div class="flex items-center gap-2">
          <CountryFlag :country="grandPrix.country" />
          <h3 class="text-base font-bold uppercase">{{ grandPrix.name }}</h3>
        </div>
        <p class="mt-2">{{ grandPrix.location }}, {{ grandPrix.country }}</p>
        <div class="flex items-center gap-1">
          <Icon
            icon="material-symbols-light:timer-outline"
            height="24px"
            wdith="24px"
            :color="isDark ? 'white' : 'black'"
          />
          <p>{{ grandPrix.time }}</p>
        </div>
        <div class="absolute top-0 right-0 flex flex-col text-white">
          <div
            class="dark:bg-primary/20 bg-primary rounded-bl-lg px-2 py-0.5 flex-col flex items-center border-primary dark:border"
          >
            <span class="font-bold">{{ formatDate(grandPrix.date).month }}</span>
            <span class="font-bold">{{ formatDate(grandPrix.date).day }}</span>
          </div>
          <Icon
            :icon="
              setGrandPrixStatus(grandPrix.date)
                ? 'material-symbols:event-upcoming-rounded'
                : 'mdi:coffee-maker-done'
            "
            height="26px"
            width="26px"
            class="ml-auto p-1 rounded-bl-lg dark:border border-0"
            :class="
              setGrandPrixStatus(grandPrix.date)
                ? 'dark:bg-blue-500/20 bg-blue-500 border-blue-800'
                : 'dark:bg-green-700/20 bg-green-700 border-green-800'
            "
            color="white"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import { useHomeData } from '@/stores/home'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useDark, useBreakpoints } from '@vueuse/core'

const store = useHomeData()

const currentIndex = ref(0)
const isDark = useDark()

const itemsPerSlide = ref(3)

const breakpoints = useBreakpoints({
  md: 768,
  xl: 1280
})

// watch for screen size changes
const isBelowMd = breakpoints.smaller('md')
const isBelowXl = breakpoints.smaller('xl')

const visibleGPs = computed(() => {
  return store.grandPrixList.slice(currentIndex.value, currentIndex.value + itemsPerSlide.value)
})

const prev = () => {
  currentIndex.value =
    currentIndex.value > 0
      ? currentIndex.value - itemsPerSlide.value
      : store.grandPrixList.length - itemsPerSlide.value
}

const next = () => {
  currentIndex.value =
    currentIndex.value + itemsPerSlide.value < store.grandPrixList.length
      ? currentIndex.value + itemsPerSlide.value
      : 0
}

const formatDate = (gpDate) => {
  const date = new Date(gpDate)
  const month = date.toLocaleString('en-default', { month: 'short' })
  const day = date.getDate()
  return { month, day }
}

const getCurrentDate = () => {
  const today = new Date()
  const year = String(today.getFullYear())
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const setGrandPrixStatus = (date) => {
  const currentDate = getCurrentDate()
  return date > currentDate ? true : false
}

watch(isBelowMd, (belowMd) => {
  belowMd ? (itemsPerSlide.value = 1) : (itemsPerSlide.value = 3)
})

watch(isBelowXl, (belowXl) => {
  belowXl ? (itemsPerSlide.value = 2) : (itemsPerSlide.value = 3)
})
</script>
