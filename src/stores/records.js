import api from '@/services/api'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRecordsStore = defineStore('records', () => {
  const driversRecords = ref(null)
  const constructorsRecords = ref(null)

  const isLoading = ref(false)

  const fetchRecords = async () => {
    if (driversRecords.value && constructorsRecords.value) {
      return
    }
    isLoading.value = true
    try {
      const [driversRecordsResponse, constructorsDataResponse] = await Promise.all([
        api.get('/records/drivers'),
        api.get('/records/constructors')
      ])
      driversRecords.value = driversRecordsResponse.data.data
      constructorsRecords.value = constructorsDataResponse.data.data
    } catch (error) {
      console.log('Error while fetching all times records', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    fetchRecords,
    driversRecords,
    constructorsRecords,
    isLoading
  }
})
