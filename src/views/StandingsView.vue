<template>
  <div>
    <div class="space-y-4">
      <BreadCrumbs :links-data="breadCrumbLinks" />
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
              <div class="md:ml-auto gap-2 flex items-center lg:justify-between">
                <SeasonSelector
                  :disabled="store.isLoading"
                  v-model="selectedSeason"
                  :updated-season="updatedSeason"
                  class="items-center"
                  @update:modelValue="onSeasonSelected"
                >
                </SeasonSelector>
                <button
                  @click="updateStandings"
                  class="uppercase tracking-widest text-xs self-start w-auto text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-2 px-4 rounded-md my-2 transition-all duration-150"
                >
                  SHOW
                </button>
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
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'

const selectedSeason = ref({ year: null })
const updatedSeason = ref(null)
const router = useRouter()
const route = useRoute()
const title = useTitle()

const breadCrumbLinks = [
  {
    text: 'Standings',
    route: 'Standings'
  }
]

const store = useStandingsStore()

const updateDisplayedSeason = () => {
  updatedSeason.value = selectedSeason.value.year
}

const updateDisplayedSeasonFromUrl = (season) => {
  selectedSeason.value.year = season
  updatedSeason.value = season
}
const updateTitle = (season) => {
  title.value = `F1FEVER - ${season} Standings`
}
const updateUrl = (season) => {
  router.push({ name: 'Standings', params: { season } })
}

const updateStandings = async () => {
  updateUrl(selectedSeason.value.year)
  await store.fetchStandings(selectedSeason.value.year)
  updateDisplayedSeason()
}

const onSeasonSelected = (season) => {
  selectedSeason.value.year = season.year
}

// Handle initial fetch and URL sync
onMounted(async () => {
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
})
</script>
