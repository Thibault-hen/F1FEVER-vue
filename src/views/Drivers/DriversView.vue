<template>
  <div>
    <DriversHero :updated-season="updatedSeason" />
    <DriversTable>
      <template #selector>
        <div class="flex items-center">
          <span class="dark:text-white mr-1 px-4 tracking-wide">Season:</span>
          <SeasonSelector @update:modelValue="onSeasonSelected" :updated-season="updatedSeason">
            <template #loader>
              <LoaderSmall v-if="store.isLoading" class="ml-auto" />
            </template>
          </SeasonSelector>
        </div>
      </template>
    </DriversTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useDrivers } from '@/stores/Drivers/drivers'
import DriversHero from '@/components/Pages/drivers/DriversHero.vue'
import DriversTable from '@/components/Pages/drivers/DriversTable.vue'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import LoaderSmall from '@/components/UI/Loader/LoaderSmall.vue'
import { useRoute, useRouter } from 'vue-router'

const updatedSeason = ref(null)
const store = useDrivers()
const manualUpdate = ref(false) // Tracks whether the user manually selected the season
const router = useRouter()
const route = useRoute()

const updateUrl = (season) => {
  router.push({ name: 'Drivers', params: { season } })
}

const onSeasonSelected = async (season) => {
  // Trigger only when the user manually selects a season
  if (manualUpdate.value) {
    await store.fetchDriversBySeason(season.year)
    updatedSeason.value = season.year
    updateUrl(season.year)
  }
}

onMounted(async () => {
  // Initially, set manualUpdate to false to prevent dropdown-triggered event
  manualUpdate.value = false

  // Check if a season is provided in the route params
  if (route.params.season) {
    const season = route.params.season
    await store.fetchDriversBySeason(season)
    updatedSeason.value = season
  } else {
    // If no season is provided, fetch all drivers
    await store.fetchAllDrivers()
  }

  // Allow manual dropdown interaction after the initial data load
  manualUpdate.value = true
})
</script>
