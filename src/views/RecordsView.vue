<template>
  <div>
    <RecordsHeroSection />
    <div v-if="store.isLoading" class="mt-36">
      <CarLoader class="mx-auto" />
    </div>
    <div>
      <DriversRecords v-if="store.driversRecords" />
      <ConstructorsRecords v-if="store.constructorsRecords" />
    </div>
  </div>
</template>

<script setup>
import RecordsHeroSection from '@/components/records/RecordsHeroSection.vue'
import DriversRecords from '@/components/records/DriversRecords.vue'
import ConstructorsRecords from '@/components/records/ConstructorsRecords.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useRecordsStore } from '@/stores/records'
import { onMounted } from 'vue'

const store = useRecordsStore()

onMounted(async () => {
  await store.fetchRecords()
})
</script>
