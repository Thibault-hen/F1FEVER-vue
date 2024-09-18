import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrivers = defineStore('drivers', () => {
  const driversData = ref([])
  const isLoading = ref(false)

  const fetchAllDrivers = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/drivers')
      driversData.value = response.data.data
      console.log('not ok')
    } catch (error) {
      console.error('Error while fetching drivers list', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchDriversBySeason = async (season) => {
    isLoading.value = true
    try {
      const response = await api.get(`/drivers/${season}`)
      driversData.value = response.data.data
    } catch (error) {
      console.error('Error while fetching drivers list', error)
    } finally {
      isLoading.value = false
    }
  }

  return { driversData, isLoading, fetchAllDrivers, fetchDriversBySeason }
})
