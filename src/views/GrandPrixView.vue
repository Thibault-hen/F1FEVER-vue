<template>
  <div>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <GpHeroSection />
    <div class="relative block lg:flex lg:justify-between lg:content-center gap-3 my-4 min-h-24">
      <div
        v-if="store.isLoading"
        class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      >
        <CarLoader class="mx-auto" />
      </div>
      <CircuitName v-if="store.grandPrixData.circuit" />
      <PoleSitter v-if="store.grandPrixData.poleSitter" />
      <RaceWinner v-if="store.grandPrixData.raceWinner" />
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
          <button
            :disabled="store.isLoading"
            :class="{ '!cursor-not-allowed opacity-50': store.isLoading }"
            @click="udpateGrandPrix"
            class="ml-2 uppercase tracking-widest text-xs self-start w-auto text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-2 px-4 rounded-md my-2 transition-all duration-150"
          >
            SHOW
          </button>
        </div>
      </template>
    </GrandPrixTabs>

    <MoreGrandPrix :grand-prix-name="selectedGrandPrix ?? updatedGrandPrix" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGrandPrix } from '@/stores/grand-prix'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import GrandPrixSelector from '@/components/UI/GrandPrixSelector.vue'
import GrandPrixTabs from '@/components/Pages/grand-prix/GrandPrixTabs.vue'
import CircuitName from '@/components/Pages/grand-prix/CircuitName.vue'
import PoleSitter from '@/components/Pages/grand-prix/PoleSitter.vue'
import RaceWinner from '@/components/Pages/grand-prix/RaceWinner.vue'
import MoreGrandPrix from '@/components/Pages/grand-prix/MoreGrandPrix.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import GpHeroSection from '@/components/Pages/grand-prix/GpHeroSection.vue'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'
import { useTitle } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const title = useTitle()

const store = useGrandPrix()
const storedSeason = computed(() => store.grandPrixData.season)
const storedGpName = computed(() => store.grandPrixData.name)
const storedGpRef = computed(() => store.grandPrixData.ref)

const breadCrumbLinks = [
  {
    text: 'Grandprix',
    route: 'Grand-prix'
  }
]

const selectedSeason = ref({ year: null })

const selectedGrandPrix = ref()
const updatedGrandPrix = ref(null)
const updatedSeason = ref(null)

const updateDisplayedGrandPrix = () => {
  selectedSeason.value = { year: storedSeason.value }
  updatedSeason.value = storedSeason.value
  updatedGrandPrix.value = storedGpName.value
}

const updateUrl = () => {
  const season = storedSeason.value
  const name = storedGpRef.value
  router.push({ name: 'Grand-prix', params: { season, name } })
}

const updateTitle = () => {
  title.value = `F1FEVER - ${storedSeason.value} ${storedGpName.value}`
}

const udpateGrandPrix = async () => {
  await store.fetchGrandPrix(selectedSeason.value.year, selectedGrandPrix.value)
  console.log(selectedSeason.value.year, selectedGrandPrix)
  updateUrl()
  updateTitle()
}
const onGrandPrixSelected = async (payload) => {
  selectedSeason.value.year = payload.selectedSeason
  selectedGrandPrix.value = payload.selectedGrandPrix.name
}

onMounted(async () => {
  if (storedSeason.value) {
    updateUrl()
  } else {
    if (route.params.season && route.params.name) {
      await store.fetchGrandPrix(route.params.season, route.params.name)
    } else {
      await store.fetchLatestGrandPrix()
      updateUrl()
    }
  }
  updateDisplayedGrandPrix()
  updateTitle()
})
</script>
