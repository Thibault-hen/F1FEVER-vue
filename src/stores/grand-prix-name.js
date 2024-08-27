import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useGrandPrixNameStore = defineStore('gpName', () => {
  const grandPrixName = ref()
  const isLoading = ref(false)

  const fetchGrandPrixName = async (season) => {
    isLoading.value = true
    try {
      const response = await api.get(`/grand-prix-list/season/${season}`)
      grandPrixName.value = response.data.data
    } catch (error) {
      console.log('Error while fecthing gp name with the selected season', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    grandPrixName,
    isLoading,
    fetchGrandPrixName
  }
})
