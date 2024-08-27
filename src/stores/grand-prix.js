import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useGrandPrix = defineStore('grandPrix', () => {
  const grandPrixData = ref()
  const grandPrixDataList = ref()

  const circuit = ref({})
  const grandPrixName = ref({})
  const poleSitter = ref({})
  const raceWinner = ref({})
  const qualiResult = ref([])
  const raceResult = ref([])

  const isLoading = ref(false)

  const fetchGrandPrix = async (season, name) => {
    console.log('new')
    isLoading.value = true
    try {
      const [grandPrix, grandPrixList] = await Promise.all([
        api.get(`/grand-prix/${name}/${season}`),
        api.get(`/grand-prix-list/name/${name}`)
      ])
      grandPrixData.value = grandPrix.data.data
      grandPrixDataList.value = grandPrixList.data.data

      circuit.value = grandPrixData.value.circuit
      grandPrixName.value = grandPrixData.value.grand_prix_name
      poleSitter.value = grandPrixData.value.pole_sitter
      raceWinner.value = grandPrixData.value.race_winner
      qualiResult.value = grandPrixData.value.quali_result
      raceResult.value = grandPrixData.value.race_result
    } catch (error) {
      console.error('Error while fetching this grand prix data', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchLatestGrandPrix = async () => {
    console.log('latest')
    isLoading.value = true
    try {
      const grandPrix = await api.get('/grand-prix/latest')

      grandPrixData.value = grandPrix.data.data
      circuit.value = grandPrixData.value.circuit
      grandPrixName.value = grandPrixData.value.grand_prix_name
      poleSitter.value = grandPrixData.value.pole_sitter
      raceWinner.value = grandPrixData.value.race_winner
      qualiResult.value = grandPrixData.value.quali_result
      raceResult.value = grandPrixData.value.race_result

      const grandPrixList = await api.get(`/grand-prix-list/name/${grandPrixName.value.slug}`)
      grandPrixDataList.value = grandPrixList.data.data
    } catch (error) {
      console.error('Error while fetching this grand prix data', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    fetchGrandPrix,
    fetchLatestGrandPrix,
    grandPrixData,
    grandPrixDataList,
    circuit,
    poleSitter,
    raceWinner,
    grandPrixName,
    raceResult,
    qualiResult,
    isLoading
  }
})
