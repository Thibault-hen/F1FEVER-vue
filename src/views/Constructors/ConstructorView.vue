<template>
  <div v-if="store.isLoading" class="flex justify-center items-center mt-36"><CarLoader /></div>
  <div v-else>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <div v-if="store.constructorData != null">
      <ConstructorInformation />
      <ConstructorCareerStats class="my-6" />
      <ConstructorRaceEntered class="my-6" />
      <ConstructorActiveSeasons />
    </div>
  </div>
</template>

<script setup>
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useConstructor } from '@/stores/Constructors/constructor'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ConstructorInformation from '@/components/Pages/constructors/constructor/ConstructorInformation.vue'
import ConstructorCareerStats from '@/components/Pages/constructors/constructor/ConstructorCareerStats.vue'
import ConstructorRaceEntered from '@/components/Pages/constructors/constructor/ConstructorRaceEntered.vue'
import ConstructorActiveSeasons from '@/components/Pages/constructors/constructor/ConstructorActiveSeasons.vue'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'
import { useTitle } from '@vueuse/core'

const store = useConstructor()
const route = useRoute()
const title = useTitle()
const breadCrumbLinks = [
  {
    text: 'Constructors',
    route: 'Constructors'
  },
  {
    text: 'Constructor',
    route: 'Constructor'
  }
]

const updateTitle = () => {
  title.value = `F1FEVER - ${store.constructorData.constructor_info.team}`
}

onMounted(async () => {
  const name = route.params.name
  await store.fetchConstructor(name)
  updateTitle()
})
</script>
