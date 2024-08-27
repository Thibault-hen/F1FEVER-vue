import { ref } from 'vue'
import api from '@/services/api'

export function useGrandPrixPreview() {
  const grandPrixInfo = ref({})
  const raceResults = ref([])
  const circuit = ref({})
  const isLoading = ref(false)

  const fetchGrandPrixPreview = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/grand-prix/latest-preview')
      grandPrixInfo.value = response.data.data.grand_prix_info
      raceResults.value = response.data.data.race_result
      circuit.value = response.data.data.circuit
    } catch (error) {
      console.error('error while fetching grand prix preview', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    grandPrixInfo,
    raceResults,
    circuit,
    isLoading,
    fetchGrandPrixPreview
  }
}
