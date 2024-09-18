import { defineStore } from 'pinia'
import api from '@/services/api'
import { ref } from 'vue'

export const useDriver = defineStore('driver', () => {
  const driverData = ref(null)
  const isLoading = ref(false)

  const fetchDriver = async (name) => {
    isLoading.value = true
    try {
      const response = await api.get(`driver/${name}`)
      driverData.value = response.data.data
    } catch (error) {
      console.error('Error while fetching this driver data', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    driverData,
    fetchDriver,
    isLoading
  }
})
