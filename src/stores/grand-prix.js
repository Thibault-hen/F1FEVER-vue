import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useGrandPrix = defineStore('grandPrix', () => {
  const grandPrixData = ref([
    {
      circuit: null,
      poleSitter: null,
      raceWinner: null,
      raceResult: null,
      qualiResult: null,
      season: null,
      name: null,
      slug: null
    }
  ])
  const grandPrixDataList = ref()

  const isLoading = ref(false)

  const fetchGrandPrix = async (season, name) => {
    console.log('new')
    isLoading.value = true
    if (grandPrixData.value.season === season && grandPrixData.value.slug === name) {
      isLoading.value = false
      return
    }
    try {
      const [grandPrix, grandPrixList] = await Promise.all([
        api.get(`/grand-prix/${name}/${season}`),
        api.get(`/grand-prix-list/name/${name}`)
      ])

      grandPrixData.value = {
        circuit: grandPrix.data.data.circuit,
        poleSitter: grandPrix.data.data.pole_sitter,
        raceWinner: grandPrix.data.data.race_winner,
        raceResult: grandPrix.data.data.race_result,
        qualiResult: grandPrix.data.data.quali_result,
        season: grandPrix.data.data.grand_prix_name.year,
        name: grandPrix.data.data.grand_prix_name.name,
        ref: grandPrix.data.data.grand_prix_name.slug
      }

      grandPrixDataList.value = grandPrixList.data.data
    } catch (error) {
      console.error('Error while fetching this grand prix data', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchLatestGrandPrix = async () => {
    console.log('latest')
    isLoading.value = true
    if (grandPrixData.value.season && grandPrixData.value.slug != null) {
      isLoading.value = false
      return
    }
    try {
      const grandPrix = await api.get('/grand-prix/latest')

      grandPrixData.value = {
        circuit: grandPrix.data.data.circuit,
        poleSitter: grandPrix.data.data.pole_sitter,
        raceWinner: grandPrix.data.data.race_winner,
        raceResult: grandPrix.data.data.race_result,
        qualiResult: grandPrix.data.data.quali_result,
        season: grandPrix.data.data.grand_prix_name.year,
        name: grandPrix.data.data.grand_prix_name.name,
        ref: grandPrix.data.data.grand_prix_name.slug
      }

      const grandPrixList = await api.get(`/grand-prix-list/name/${grandPrixData.value.ref}`)
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
    isLoading
  }
})
