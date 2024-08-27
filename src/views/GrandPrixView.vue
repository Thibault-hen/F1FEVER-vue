<template>
  <div>
    <GpHeroSection />
    <div class="relative block lg:flex lg:justify-between lg:content-center gap-3 my-4 min-h-24">
      <div
        v-if="store.isLoading"
        class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      >
        <CarLoader class="mx-auto" />
      </div>
      <CircuitName v-if="store.circuit" />
      <PoleSitter v-if="store.poleSitter" />
      <RaceWinner v-if="store.raceWinner" />
    </div>
    <GrandPrixTabs>
      <template #selector>
        <div class="md:ml-auto flex items-center md:flex-end">
          <SeasonSelector
            v-model="selectedSeason"
            :updated-season="updatedSeason"
            class="mr-2 items-center"
          />
          <GrandPrixSelector
            v-if="selectedSeason.year"
            :updated-season="updatedSeason"
            :updated-grand-prix="updatedGrandPrix"
            :selected-grand-prix="selectedGrandPrix"
            :selected-season="selectedSeason"
            @update:modelValue="onGrandPrixSelected"
          />
        </div>
      </template>
    </GrandPrixTabs>

    <MoreGrandPrix :grand-prix-name="selectedGrandPrix ?? updatedGrandPrix" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import GrandPrixSelector from '@/components/UI/GrandPrixSelector.vue'
import { useGrandPrix } from '@/stores/grand-prix'
import GrandPrixTabs from '@/components/GrandPrix/GrandPrixTabs.vue'
import CircuitName from '@/components/GrandPrix/CircuitName.vue'
import PoleSitter from '@/components/GrandPrix/PoleSitter.vue'
import RaceWinner from '@/components/GrandPrix/RaceWinner.vue'
import MoreGrandPrix from '@/components/GrandPrix/MoreGrandPrix.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useRoute, useRouter } from 'vue-router'
import GpHeroSection from '@/components/GrandPrix/GpHeroSection.vue'

const route = useRoute()
const router = useRouter()

const store = useGrandPrix()
const selectedSeason = ref({ year: null })

const selectedGrandPrix = ref()
const updatedGrandPrix = ref(null)
const updatedSeason = ref(null)

const updateDisplayedGrandPrix = (season, name) => {
  selectedSeason.value = { year: season }
  updatedSeason.value = season
  updatedGrandPrix.value = name
}

const updateUrl = (season, name) => {
  router.push({ name: 'Grand-prix', params: { season, name } })
}

const onGrandPrixSelected = async (payload) => {
  await store.fetchGrandPrix(payload.selectedSeason, payload.selectedGrandPrix.slug)
  updateUrl(payload.selectedSeason, payload.selectedGrandPrix.slug)
  selectedSeason.value.year = payload.selectedSeason
  selectedGrandPrix.value = payload.selectedGrandPrix.name
}

onMounted(async () => {
  if (route.params.season && route.params.name) {
    await store.fetchGrandPrix(route.params.season, route.params.name)
    updateDisplayedGrandPrix(store.grandPrixName.year, store.grandPrixName.name)
  } else {
    await store.fetchLatestGrandPrix()
    updateDisplayedGrandPrix(store.grandPrixName.year, store.grandPrixName.name)
    updateUrl(store.grandPrixName.year, store.grandPrixName.slug)
  }
})
</script>
