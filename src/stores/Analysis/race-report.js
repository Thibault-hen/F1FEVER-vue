import api from '@/services/api'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRaceReport = defineStore('race-report', () => {
  const isLoading = ref(false)
  const raceReport = ref(null)

  const fetchRaceReport = async (season, grandPrix, driver) => {
    isLoading.value = true
    try {
      const response = await api.get(`/race-report/${season}/${grandPrix}/${driver}`)
      raceReport.value = response.data.data
    } catch (error) {
      console.error('Error while fetching this race report', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    fetchRaceReport,
    raceReport
  }
})
