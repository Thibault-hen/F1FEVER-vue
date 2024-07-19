<template>
  <div class="animate-slideLeft">
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
            <SeasonSelector
              v-model="selectedSeason"
              :updated-season="updatedSeason"
              class="mr-2 items-center"
            />

            <DefaultButton
              @click="updateStandings"
              :disabled="isLoading"
              :class="isLoading ? 'bg-opacity-5' : 'bg-opacity-100'"
              class="bg-red-500 text-white hover:bg-red-600 transition h-10 w-26 xl:w-32 text-xs"
            >
              <LoaderSmall v-if="isLoading" class="mx-auto" />
              <span v-else class="uppercase">afficher</span>
            </DefaultButton>
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
import DefaultButton from '@/components/UI/DefaultButton.vue'
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
    updateDisplayedSeason()
    await fetchLatestStandings()
    updateUrl(selectedSeason.value.year)
  }
})
</script>
