<template>
  <div>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <ConstructorsHero :updated-season="updatedSeason" />
    <transition enter-active-class="animate-fadeInDown" mode="out-in">
      <div v-if="store.isLoading" class="flex justify-center">
        <CarLoader class="mt-16" />
      </div>
      <div v-else>
        <ConstructorsTable>
          <template #selector>
            <div class="flex items-center">
              <span class="dark:text-white mr-1 px-4 tracking-wide">Season : </span>
              <SeasonSelector @update:modelValue="onSeasonSelected" :updated-season="updatedSeason">
              </SeasonSelector>
              <button
                @click="updateConstructors"
                class="ml-2 uppercase tracking-widest text-xs w-auto text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-2 px-4 rounded-md transition-all duration-150"
              >
                SHOW
              </button>
            </div></template
          ></ConstructorsTable
        >
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useConstructors } from '@/stores/Constructors/constructors'
import ConstructorsHero from '@/components/Pages/constructors/ConstructorsHero.vue'
import ConstructorsTable from '@/components/Pages/constructors/ConstructorsTable.vue'
import SeasonSelector from '@/components/UI/SeasonSelector.vue'
import { useRoute, useRouter } from 'vue-router'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useTitle } from '@vueuse/core'

const updatedSeason = ref(null)
const selectedSeason = ref(null)
const title = useTitle()
const store = useConstructors()
const router = useRouter()
const route = useRoute()

const breadCrumbLinks = [
  {
    text: 'Constructors',
    route: 'Constructors'
  }
]

const updateUrl = (season) => {
  router.push({ name: 'Constructors', params: { season } })
}

const updateTitle = () => {
  title.value = `F1FEVER - Constructors ${updatedSeason.value ?? ''}`
}

const updateConstructors = async () => {
  await store.fetchConstructorsBySeason(selectedSeason.value)
  updateUrl(selectedSeason.value)
  updatedSeason.value = selectedSeason.value
  updateTitle()
}
const onSeasonSelected = async (season) => {
  selectedSeason.value = season.year
}

onMounted(async () => {
  if (route.params.season) {
    const season = route.params.season
    await store.fetchConstructorsBySeason(season)
    updatedSeason.value = season
  } else {
    await store.fetchAllConstructors()
  }
  updateTitle()
})
</script>
