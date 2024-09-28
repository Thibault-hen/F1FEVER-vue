<template>
  <div>
    <RaceReportHeader />
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
            Driver
          </label>
          <DriverSelector
            :selected-season="selectedSeason"
            :selected-grand-prix="selectedGrandPrix"
            @update:modelValue="setDriver"
          />
        </div>
      </div>

      <!-- Button at the bottom right -->
      <div class="flex justify-end mt-6">
        <button
          :disabled="store.isLoading"
          :class="{ '!cursor-not-allowed opacity-50': store.isLoading }"
          @click="handleCompare"
          class="hover:cursor-pointer uppercase tracking-widest text-xs text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary py-2 px-6 rounded-md transition-all duration-150"
        >
          show
        </button>
      </div>
    </div>
    <transition enter-active-class="animate-fadeInDown" mode="out-in">
      <div v-if="store.isLoading" class="flex justify-center"><CarLoader class="mt-16" /></div>
      <div v-else>
        <RaceReportInformation v-if="store.raceReport" />
        <RaceProgression v-if="store.raceReport" />
        <div class="flex md:flex-row flex-col gap-6">
          <RaceLapTimes v-if="store.raceReport" />
          <RacePitstops v-if="store.raceReport" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRaceReport } from '@/stores/Analysis/race-report'
import SeasonSelector from '@/components/UI/Selectors/Analysis/SeasonSelector.vue'
import GrandPrixSelector from '@/components/UI/Selectors/Analysis/GrandPrixSelector.vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import RaceReportHeader from '@/components/Pages/analysis/race-report/RaceReportHeader.vue'
import DriverSelector from '@/components/UI/Selectors/race-report/DriverSelector.vue'
import RaceProgression from '@/components/Pages/analysis/race-report/RaceProgression.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import RaceReportInformation from '@/components/Pages/analysis/race-report/RaceReportInformation.vue'
import RaceLapTimes from '@/components/Pages/analysis/race-report/RaceLapTimes.vue'
import RacePitstops from '@/components/Pages/analysis/race-report/RacePitstops.vue'

const selectedSeason = ref()
const selectedGrandPrix = ref()
const selectedDriver = ref()

const isDark = useDark()

const store = useRaceReport()

const setSeason = (season) => {
  selectedSeason.value = season
}

const setGrandPrix = (grandPrix) => {
  selectedGrandPrix.value = grandPrix
}

const setDriver = (driver) => {
  selectedDriver.value = driver
}

const handleCompare = async () => {
  await store.fetchRaceReport(
    selectedSeason.value.season,
    selectedGrandPrix.value.slug,
    selectedDriver.value.slug
  )

  console.log(store.raceReport)
}

onMounted(() => {
  console.log('test')
})
</script>
