<template>
  <div class="p-4">
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <RecordsHeroSection />
    <transition enter-active-class="animate-fadeInDown" mode="out-in">
      <div v-if="store.isLoading" class="mt-36 flex justify-center">
        <CarLoader />
      </div>
      <div v-else>
        <div>
          <DriversRecords v-if="store.driversRecords" />
          <ConstructorsRecords v-if="store.constructorsRecords" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import RecordsHeroSection from '@/components/Pages/records/RecordsHeroSection.vue'
import DriversRecords from '@/components/Pages/records/DriversRecords.vue'
import ConstructorsRecords from '@/components/Pages/records/ConstructorsRecords.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useRecordsStore } from '@/stores/records'
import { onMounted } from 'vue'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'
import { useTitle } from '@vueuse/core'

const store = useRecordsStore()
const title = useTitle()

const breadCrumbLinks = [
  {
    text: 'Records',
    route: 'Records'
  }
]

const updateTitle = () => {
  title.value = `F1FEVER - Records`
}

onMounted(async () => {
  await store.fetchRecords()
  updateTitle()
})
</script>
