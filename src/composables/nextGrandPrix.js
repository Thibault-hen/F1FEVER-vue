import api from '@/services/api'
import { ref } from 'vue'

export function useNextGrandPrix() {
  const nextGrandPrix = ref(null)
  const isLoading = ref(false)

  const getNextGrandPrix = async () => {
    try {
      const response = await api.get('/grand-prix-list/next')
      nextGrandPrix.value = response.data.data
    } catch (error) {
      console.error('Error fetching next grand prix:', error)
    } finally {
      isLoading.value = false
    }
  }

  return { nextGrandPrix, isLoading, getNextGrandPrix }
}
