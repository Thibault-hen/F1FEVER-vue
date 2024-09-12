<template>
  <div>
    <RecordsHeroSection />
    <div v-if="store.isLoading" class="mt-36 flex justify-center">
      <CarLoader />
    </div>
    <div>
      <DriversRecords v-if="store.driversRecords" />
      <ConstructorsRecords v-if="store.constructorsRecords" />
    </div>
  </div>
</template>

<script setup>
import RecordsHeroSection from '@/components/Pages/records/RecordsHeroSection.vue'
import DriversRecords from '@/components/Pages/records/DriversRecords.vue'
import ConstructorsRecords from '@/components/Pages/records/ConstructorsRecords.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useRecordsStore } from '@/stores/records'
import { onMounted } from 'vue'

const store = useRecordsStore()

onMounted(async () => {
  await store.fetchRecords()
})
</script>
