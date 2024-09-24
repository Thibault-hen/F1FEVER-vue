import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useAnalysisSeasons = defineStore('analysis-seasons', () => {
  const seasons = ref([])
  const isLoading = ref(false)
  const fetchSeasons = async () => {
    isLoading.value = true
    if (seasons.value.length > 0) {
      isLoading.value = false
      return
    }
    try {
      const response = await api.get('/analysis/seasons')
      seasons.value = response.data.data
    } catch (error) {
      console.error('Error while fetching seasons', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    seasons,
    fetchSeasons,
    isLoading
  }
})
