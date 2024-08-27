import { ref } from 'vue'
import api from '@/services/api'

export function useCurrentGrandPrixList() {
  const grandPrixList = ref([])
  const isUpcoming = ref([])
  const isLoading = ref(true)

  const fetchCurrentGrandPrixList = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/grand-prix-list/current')
      grandPrixList.value = response.data.data
      setGrandPrixStatus()
    } catch (error) {
      console.error('Error while fecthing current grand prix list', error)
    } finally {
      isLoading.value = false
    }
  }

  const getCurrentDate = () => {
    const today = new Date()
    const year = String(today.getFullYear())
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const setGrandPrixStatus = () => {
    const currentDate = getCurrentDate()
    grandPrixList.value.forEach((grandPrix) => {
      isUpcoming.value.push(grandPrix.date > currentDate)
    })
  }
  return {
    grandPrixList,
    isUpcoming,
    isLoading,
    fetchCurrentGrandPrixList
  }
}
