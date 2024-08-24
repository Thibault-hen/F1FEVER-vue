import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useStandingsStore = defineStore('standings', () => {
  const standings = ref({
    drivers: [],
    constructors: [],
    schedule: [],
    season: null
  })

  const lastSelected = ref(null)

  const isLoading = ref(false)

  const fetchStandings = async (season, newStandings = false) => {
    isLoading.value = true
    if (
      standings.value.season === season ||
      (standings.value.season === 'latest' && newStandings === false)
    ) {
      isLoading.value = false
      return
    }
    try {
      const [driverResponse, constructorResponse, scheduleResponse] = await Promise.all([
        api.get(`/standings/drivers/${season}`),
        api.get(`/standings/constructors/${season}`),
        api.get(`/grand-prix-list/season/${season}`)
      ])
      standings.value = {
        drivers: driverResponse.data.data,
        constructors: constructorResponse.data.data,
        schedule: scheduleResponse.data.data,
        season: season
      }
      lastSelected.value = season
      console.log('normal')
    } catch (error) {
      console.log('Error while fecthing standings', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchLatestStandings = async () => {
    isLoading.value = true
    if (standings.value.season !== null) {
      isLoading.value = false
      return
    }
    try {
      const [driverResponse, constructorReponse, scheduleResponse] = await Promise.all([
        api.get('/standings/drivers'),
        api.get('/standings/constructors'),
        api.get('/grand-prix-list/season')
      ])
      standings.value = {
        drivers: driverResponse.data.data,
        constructors: constructorReponse.data.data,
        schedule: scheduleResponse.data.data,
        season: 'latest'
      }
      console.log('latest')
    } catch (error) {
      console.log('Error while fecthing standings', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    standings,
    fetchStandings,
    fetchLatestStandings,
    isLoading
  }
})
