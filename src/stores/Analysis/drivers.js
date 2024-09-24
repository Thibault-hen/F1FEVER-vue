import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useAnalysisDrivers = defineStore('analysis-drivers', () => {
  const isLoading = ref(false)
  const drivers = ref([])
  const fetchDrivers = async (season, grandPrix) => {
    isLoading.value = true
    try {
      const response = await api.get(`/analysis/drivers/${season}/${grandPrix}`)
      drivers.value = response.data.data
    } catch (error) {
      console.error('Error while fetching analysis drivers', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    drivers,
    fetchDrivers,
    isLoading
  }
})
