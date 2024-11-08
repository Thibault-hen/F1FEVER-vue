<template>
  <div>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <LapTimesHeader />
    <div
      class="rounded-lg shadow-md p-6 max-w-xl w-full border bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 dark:border-slate-50/[0.06]"
    >
      <!-- Title -->
      <div class="flex py-4 dark:border-slate-50/[0.06] border-b mb-4">
        <Icon
          icon="material-symbols:tv-options-edit-channels-rounded"
          height="32px"
          wdith="32px"
          class="bg-primary/20 p-1 rounded border border-primary mr-4"
          :color="isDark ? 'white' : 'black'"
        />
        <h3 class="flex items-center text-xl uppercase tracking-wider dark:text-white">
          Select your options
        </h3>
      </div>
      <!-- Dropdown Section (2 by 2 grid) -->
      <div class="flex flex-col w-full sm:grid-cols-2 sm:grid gap-4">
        <!-- Dropdown 4 -->
        <div>
          <label
            class="text-xs uppercase tracking-widest border-l-4 border-primary px-2 dark:text-white"
          >
            Season
          </label>
          <SeasonSelector class="mt-2 w-full flex" @update:modelValue="setSeason" />
        </div>
        <!-- Dropdown 2 -->
        <div>
          <label
            class="text-xs uppercase tracking-widest border-l-4 border-primary px-2 dark:text-white"
          >
            Grand Prix
          </label>
          <GrandPrixSelector
            class="mt-2 w-full"
            :selected-season="selectedSeason"
            @update:modelValue="setGrandPrix"
          />
        </div>

        <!-- Dropdown 3 -->
        <div>
          <label
            class="text-xs uppercase tracking-widest border-l-4 border-primary px-2 dark:text-white"
          >
            First Driver
          </label>
          <FirstDriverSelector
            class="mt-2 w-full"
            :selected-season="selectedSeason"
            :selected-grand-prix="selectedGrandPrix"
            @update:modelValue="setFirstDriver"
          />
        </div>

        <!-- Dropdown 4 -->
        <div>
          <label
            class="text-xs uppercase tracking-widest border-l-4 border-primary px-2 dark:text-white"
          >
            second driver
          </label>
          <SecondDriverSelector
            class="mt-2 w-full"
            :selected-season="selectedSeason"
            :selected-grand-prix="selectedGrandPrix"
            @update:modelValue="setSecondDriver"
          />
        </div>
      </div>

      <!-- Button at the bottom right -->
      <div class="flex flex-col mt-6">
        <div class="flex flex-col items-end">
          <button
            :disabled="store.isLoading"
            @click="handleCompare"
            :class="{ '!cursor-not-allowed opacity-50': store.isLoading }"
            class="hover:cursor-pointer uppercase tracking-widest text-xs text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary py-2 px-6 rounded-md transition-all duration-150"
          >
            compare
          </button>
          <transition enter-active-class="animate-fadeIn" mode="out-in">
            <span v-if="isDriversDifferent" class="text-primary mt-2"
              >Drivers have to be different</span
            >
          </transition>
        </div>
      </div>
    </div>
    <transition enter-active-class="animate-fadeInDown" mode="out-in">
      <div v-if="store.isLoading" class="flex justify-center mt-12"><CarLoader /></div>
      <div v-else>
        <DriverInformation v-if="store.lapTimes.firstDriver && store.lapTimes.secondDriver" />
        <LapTimesInformation v-if="store.lapTimes.firstDriver && store.lapTimes.secondDriver" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLapTimes } from '@/stores/Analysis/lap-times'
import LapTimesHeader from '@/components/Pages/analysis/lap-times/LapTimesHeader.vue'
import SeasonSelector from '@/components/UI/Selectors/Analysis/SeasonSelector.vue'
import GrandPrixSelector from '@/components/UI/Selectors/Analysis/GrandPrixSelector.vue'
import FirstDriverSelector from '@/components/UI/Selectors/lap-times/FirstDriverSelector.vue'
import SecondDriverSelector from '@/components/UI/Selectors/lap-times/SecondDriverSelector.vue'
import DriverInformation from '@/components/Pages/analysis/lap-times/DriverInformation.vue'
import LapTimesInformation from '@/components/Pages/analysis/lap-times/LapTimesInformation.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import { useTitle } from '@vueuse/core'

const selectedSeason = ref()
const selectedGrandPrix = ref()
const selectedFirstDriver = ref()
const selectedSecondDriver = ref()

const isDriversDifferent = ref(false)

const isDark = useDark()
const title = useTitle()
const breadCrumbLinks = [
  {
    text: 'Analysis',
    route: 'Analysis'
  },
  {
    text: 'Lap Times',
    route: 'LapTimes'
  }
]

const store = useLapTimes()

const updateTitle = () => {
  title.value = 'F1FEVER - Lap Times Comparator'
}

const setSeason = (season) => {
  selectedSeason.value = season
}

const setGrandPrix = (grandPrix) => {
  selectedGrandPrix.value = grandPrix
}

const setFirstDriver = (driver) => {
  selectedFirstDriver.value = driver
}

const setSecondDriver = (driver) => {
  selectedSecondDriver.value = driver
}

const handleCompare = async () => {
  if (selectedFirstDriver.value.slug === selectedSecondDriver.value.slug) {
    isDriversDifferent.value = true
    return
  }
  await store.fetchLapTimes(
    selectedSeason.value.season,
    selectedGrandPrix.value.slug,
    selectedFirstDriver.value.slug,
    selectedSecondDriver.value.slug
  )
  isDriversDifferent.value = false
}

updateTitle()
</script>
