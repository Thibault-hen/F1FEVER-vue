import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCircuits = defineStore('circuits', () => {
  const circuitsData = ref([])
  const isLoading = ref(false)

  const fetchAllCircuits = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/circuits')
      circuitsData.value = response.data.data
    } catch (error) {
      console.error('Error while fetching circuits list', error)
    } finally {
      isLoading.value = false
    }
  }

  return { circuitsData, isLoading, fetchAllCircuits }
})
