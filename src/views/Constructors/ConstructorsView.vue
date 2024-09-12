<template>
  <div>
    <ConstructorsHero :updated-season="updatedSeason" />
    <ConstructorsTable>
      <template #selector>
        <div class="flex items-center">
          <span class="dark:text-white mr-1 px-4 tracking-wide">Season : </span>
          <SeasonSelector @update:modelValue="onSeasonSelected" :updated-season="updatedSeason">
            <template #loader> <LoaderSmall v-if="store.isLoading" class="ml-auto" /> </template
          ></SeasonSelector></div></template
    ></ConstructorsTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useConstructors } from '@/stores/Constructors/Constructors'
import ConstructorsHero from '@/components/Pages/constructors/ConstructorsHero.vue'
import ConstructorsTable from '@/components/Pages/constructors/ConstructorsTable.vue'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import LoaderSmall from '@/components/UI/Loader/LoaderSmall.vue'
import { useRoute, useRouter } from 'vue-router'

const updatedSeason = ref(null)
const store = useConstructors()
const manualUpdate = ref(false)
const router = useRouter()
const route = useRoute()

const updateUrl = (season) => {
  router.push({ name: 'Constructors', params: { season } })
}

const onSeasonSelected = async (season) => {
  if (manualUpdate.value) {
    await store.fetchConstructorsBySeason(season.year)
    updatedSeason.value = season.year
    updateUrl(season.year)
  }
}

onMounted(async () => {
  manualUpdate.value = false

  if (route.params.season) {
    const season = route.params.season
    await store.fetchConstructorsBySeason(season)
    updatedSeason.value = season
    updateUrl(season)
  } else {
    await store.fetchAllConstructors()
  }

  manualUpdate.value = true
})
</script>
