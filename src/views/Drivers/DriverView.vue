<template>
  <div v-if="store.isLoading" class="flex justify-center items-center mt-36"><CarLoader /></div>
  <div v-else>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <div v-if="store.driverData !== null">
      <DriverInformation />
      <DriverCareerStats class="my-6" />
      <DriverRaceEntered class="my-6" />
      <DriverActiveSeasons class="my-6" />
    </div>
  </div>
</template>

<script setup>
import DriverInformation from '@/components/Pages/drivers/driver/DriverInformation.vue'
import DriverCareerStats from '@/components/Pages/drivers/driver/DriverCareerStats.vue'
import DriverRaceEntered from '@/components/Pages/drivers/driver/DriverRaceEntered.vue'
import DriverActiveSeasons from '@/components/Pages/drivers/driver/DriverActiveSeasons.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useDriver } from '@/stores/Drivers/driver'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'

const store = useDriver()
const route = useRoute()
const breadCrumbLinks = [
  {
    text: 'Drivers',
    route: 'Drivers'
  },
  {
    text: 'Driver',
    route: 'Driver'
  }
]

onMounted(async () => {
  const name = route.params.name
  await store.fetchDriver(name)
  console.log(store.driverData)
})
</script>
