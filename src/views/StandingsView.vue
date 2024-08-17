<template>
  <div>
    <div class="space-y-4">
      <StandingsHeroSection
        :selected-season="selectedSeason.year"
        :updated-season="updatedSeason"
      />
      <StandingsTabs
        :driver-standings="driverStandings"
        :constructor-standings="constructorStandings"
        :selected-season="selectedSeason.year"
        :is-loading="isLoading"
      >
        <template #selector>
          <div class="md:ml-auto flex items-center md:flex-end">
            <span class="dark:text-white mr-1 px-4 tracking-wide">Season : </span>
            <SeasonSelector
              :disabled="isLoading"
              v-model="selectedSeason"
              :updated-season="updatedSeason"
              class="mr-2 items-center"
              @update:modelValue="updateStandings"
            >
              <template #loader>
                <LoaderSmall v-if="isLoading" class="ml-auto" />
              </template>
            </SeasonSelector>
          </div>
        </template>
      </StandingsTabs>
      <RaceSchedule :season="selectedSeason.year" :data="seasonSchedule" :is-loading="isLoading" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStandings } from '@/composables/useStandings'
import { useRoute, useRouter } from 'vue-router'
import StandingsHeroSection from '@/components/Standings/StandingsHeroSection.vue'
import RaceSchedule from '@/components/Standings/RaceSchedule.vue'
import StandingsTabs from '@/components/Standings/StandingsTabs.vue'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import LoaderSmall from '@/components/UI/LoaderSmall.vue'

const selectedSeason = ref({ year: null })
const updatedSeason = ref(null)
const router = useRouter()
const route = useRoute()

const {
  fetchStandings,
  fetchLatestStandings,
  driverStandings,
  constructorStandings,
  seasonSchedule,
  isLoading
} = useStandings()

const updateDisplayedSeason = () => {
  updatedSeason.value = selectedSeason.value.year
}

const updateDisplayedSeasonFromUrl = (season) => {
  updatedSeason.value = season
  selectedSeason.value.year = season
}

const updateUrl = (season) => {
  router.push({ name: 'Standings', params: { season } })
}

watch(
  () => route.params.season,
  async (season) => {
    if (season && season !== updatedSeason.value) {
      updateDisplayedSeasonFromUrl(season)
      await fetchStandings(season)
      updateUrl(season)
    }
  },
  { immediate: true }
)

const updateStandings = async () => {
  await fetchStandings(selectedSeason.value.year)
  updateDisplayedSeason()
  updateUrl(selectedSeason.value.year)
}

onMounted(async () => {
  if (!route.params.season) {
    await fetchLatestStandings()
    updateDisplayedSeason()
    updateUrl(selectedSeason.value.year)
  }
})
</script>
