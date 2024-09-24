import { ref } from 'vue'
import api from '@/services/api'
import { defineStore } from 'pinia'

export const useLapTimes = defineStore('lap-times', () => {
  const lapTimes = ref({
    firstDriver: null,
    secondDriver: null
  })
  const isLoading = ref(false)

  const fetchLapTimes = async (season, grandPrix, firstDriver, secondDriver) => {
    isLoading.value = true
    try {
      const [firstDriverResponse, secondDriverResponse] = await Promise.all([
        api.get(`lap-times/${season}/${grandPrix}/${firstDriver}`),
        api.get(`lap-times/${season}/${grandPrix}/${secondDriver}`)
      ])
      lapTimes.value = {
        firstDriver: firstDriverResponse.data.data,
        secondDriver: secondDriverResponse.data.data
      }
    } catch (error) {
      console.error('error while fetching lap times', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    lapTimes,
    isLoading,
    fetchLapTimes
  }
})
