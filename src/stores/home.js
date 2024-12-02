import { ref } from 'vue'
import api from '@/services/api'
import { defineStore } from 'pinia'

export const useHomeData = defineStore('home', () => {
  const grandPrixList = ref([])
  const isUpcoming = ref([])
  const grandPrixInfo = ref({})
  const raceResults = ref([])
  const circuit = ref({})
  const isLoading = ref(false)

  const fetchHomepageData = async () => {
    isLoading.value = true
    try {
      const [response1, response2] = await Promise.all([
        api.get('/grand-prix/latest-preview'),
        api.get('/grand-prix-list/current')
      ])
      grandPrixInfo.value = response1.data.data.grand_prix_info
      raceResults.value = response1.data.data.race_result
      circuit.value = response1.data.data.circuit
      grandPrixList.value = response2.data.data
    } catch (error) {
      console.error('error while fetching grand prix preview', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    grandPrixList,
    isUpcoming,
    isLoading,
    grandPrixInfo,
    raceResults,
    circuit,
    fetchHomepageData
  }
})
