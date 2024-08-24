<template>
  <div>
    <div class="space-y-4">
      <StandingsHeroSection
        :selected-season="selectedSeason.year"
        :updated-season="updatedSeason"
      />
      <StandingsTabs
        :driver-standings="store.standings.drivers"
        :constructor-standings="store.standings.constructors"
        :selected-season="selectedSeason.year"
        :is-loading="store.isLoading"
      >
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
              <template #loader>
                <LoaderSmall v-if="store.isLoading" class="ml-auto" />
              </template>
            </SeasonSelector>
          </div>
        </template>
      </StandingsTabs>
      <RaceSchedule
        :season="selectedSeason.year"
        :data="store.standings.schedule"
        :is-loading="store.isLoading"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StandingsHeroSection from '@/components/Standings/StandingsHeroSection.vue'
import RaceSchedule from '@/components/Standings/RaceSchedule.vue'
import StandingsTabs from '@/components/Standings/StandingsTabs.vue'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import LoaderSmall from '@/components/UI/Loader/LoaderSmall.vue'
import { useStandingsStore } from '@/stores/standings'
import { useSeasonsStore } from '@/stores/seasons'

const selectedSeason = ref({ year: null })
const updatedSeason = ref(null)
const router = useRouter()
const route = useRoute()
const manualUpdate = ref(false)

const store = useStandingsStore()
const seasonStore = useSeasonsStore()

const updateDisplayedSeason = () => {
  updatedSeason.value = selectedSeason.value.year
}

const updateDisplayedSeasonFromUrl = (season) => {
  manualUpdate.value = false
  selectedSeason.value.year = season
  updatedSeason.value = season
  manualUpdate.value = true
}

const updateUrl = (season) => {
  router.push({ name: 'Standings', params: { season } })
}

const updateStandings = async (season) => {
  updateUrl(season)
  await store.fetchStandings(season, true)
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
    if (store.standings.season === 'latest') {
      storedSeason = seasonStore.seasons.reduce(
        (max, current) => (current.value > max.value ? current : max),
        seasonStore.seasons[0].year
      )
    }
    updatedSeason.value = storedSeason

    // Update the URL to reflect the selected season
    updateUrl(storedSeason)
  } else {
    if (route.params.season) {
      updateDisplayedSeasonFromUrl(route.params.season)
      await store.fetchStandings(updatedSeason.value)
    } else {
      await store.fetchLatestStandings()
      updateDisplayedSeason()
      updateUrl(selectedSeason.value.year)
    }
  }
  // Allow manual updates to trigger the function after initial mount
  manualUpdate.value = true
})
</script>
