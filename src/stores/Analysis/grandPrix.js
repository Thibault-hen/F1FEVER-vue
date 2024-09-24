import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useAnalysisGrandPrix = defineStore('analysis-grand-prix', () => {
  const grandPrix = ref([])
  const isLoading = ref(false)
  const fetchGrandPrix = async (season) => {
    isLoading.value = true
    try {
      const response = await api.get(`/analysis/grand-prix/${season}`)
      grandPrix.value = response.data.data
    } catch (error) {
      console.error('Error while fetching analysis grand prix', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    grandPrix,
    fetchGrandPrix,
    isLoading
  }
})
