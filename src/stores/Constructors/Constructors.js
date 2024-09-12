import api from '@/services/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConstructors = defineStore('constructors', () => {
  const constructorsData = ref([])
  const isLoading = ref(false)

  const fetchAllConstructors = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/constructors')
      constructorsData.value = response.data.data
    } catch (error) {
      console.error('Error while fetching constructors list', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchConstructorsBySeason = async (season) => {
    isLoading.value = true
    try {
      const response = await api.get(`/constructors/${season}`)
      constructorsData.value = response.data.data
    } catch (error) {
      console.error('Error while fetching constructors list', error)
    } finally {
      isLoading.value = false
    }
  }

  return { constructorsData, isLoading, fetchAllConstructors, fetchConstructorsBySeason }
})
