<template>
  <div>
    <div class="space-y-4">
      <StandingsHeroSection
        :selected-season="selectedSeason.year"
        :updated-season="updatedSeason"
      />
      <transition enter-active-class="animate-fadeInDown" mode="out-in">
        <div v-if="store.isLoading" class="flex justify-center">
          <CarLoader class="mt-16" />
        </div>
        <div v-else>
          <StandingsTabs>
            <template #selector>
              <div class="md:ml-auto flex items-center md:flex-end">
                <span class="dark:text-white mr-1 px-4 tracking-wide">Season : </span>
                <SeasonSelector
                  :disabled="store.isLoading"
                  v-model="selectedSeason"
                  :updated-season="updatedSeason"
                  class="mr-2 items-center"
                  @update:modelValue="onSeasonSelected"
                >
                </SeasonSelector>
              </div>
            </template>
          </StandingsTabs>
          <RaceSchedule :season="selectedSeason.year ?? updatedSeason" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StandingsHeroSection from '@/components/Pages/standings/StandingsHeroSection.vue'
import RaceSchedule from '@/components/Pages/standings/RaceSchedule.vue'
import StandingsTabs from '@/components/Pages/standings/StandingsTabs.vue'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import { useStandingsStore } from '@/stores/standings'
import { useTitle } from '@vueuse/core'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'

const selectedSeason = ref({ year: null })
const updatedSeason = ref(null)
const router = useRouter()
const route = useRoute()
const manualUpdate = ref(false)
const title = useTitle()

const store = useStandingsStore()

const updateDisplayedSeason = () => {
  updatedSeason.value = selectedSeason.value.year
}

const updateDisplayedSeasonFromUrl = (season) => {
  manualUpdate.value = false
  selectedSeason.value.year = season
  updatedSeason.value = season
  manualUpdate.value = true
}
const updateTitle = (season) => {
  title.value = `F1FEVER - ${season} Standings`
}
const updateUrl = (season) => {
  router.push({ name: 'Standings', params: { season } })
}

const updateStandings = async (season) => {
  updateUrl(season)
  await store.fetchStandings(season)
  updateDisplayedSeason()
}

const onSeasonSelected = async (season) => {
  if (manualUpdate.value) {
    selectedSeason.value.year = season.year
    await updateStandings(season.year)
  }
}

// Handle initial fetch and URL sync
onMounted(async () => {
  manualUpdate.value = false // Prevent the updateStandings from being triggered on mount
  if (store.standings.season) {
    // If standings exist, set the selected season to the stored season
    let storedSeason = store.standings.season
    updatedSeason.value = storedSeason

    // Update the URL to reflect the selected season
    updateUrl(storedSeason)
    updateTitle(storedSeason)
  } else {
    if (route.params.season) {
      updateDisplayedSeasonFromUrl(route.params.season)
      updateTitle(route.params.season)
      await store.fetchStandings(updatedSeason.value)
    } else {
      await store.fetchLatestStandings()
      updateDisplayedSeason()
      updateUrl(selectedSeason.value.year)
      updateTitle(selectedSeason.value.year)
    }
  }
  // Allow manual updates to trigger the function after initial mount
  manualUpdate.value = true
})
</script>
