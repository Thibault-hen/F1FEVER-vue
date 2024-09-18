<template>
  <div v-if="store.isLoading" class="flex justify-center items-center mt-36"><CarLoader /></div>
  <div v-else>
    <div v-if="store.driverData !== null">
      <button
        @click="router.go(-1)"
        class="bg-primary/20 border border-transparent hover:border-primary p-1 px-4 rounded-md my-2 transition-all duration-150 hover:scale-105"
      >
        <Icon
          icon="tabler:arrow-back-up"
          height="24px"
          width="24px"
          :color="isDark ? 'white' : 'black'"
        />
      </button>
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
import { Icon } from '@iconify/vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useDriver } from '@/stores/Drivers/driver'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'

const store = useDriver()
const route = useRoute()
const router = useRouter()
const isDark = useDark()

onMounted(async () => {
  const name = route.params.name
  await store.fetchDriver(name)
  console.log(store.driverData)
})
</script>
