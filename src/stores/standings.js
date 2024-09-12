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

  const isLoading = ref(false)

  const fetchStandings = async (season) => {
    isLoading.value = true
    if (standings.value.season === season) {
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
        drivers: driverResponse.data.data.standings,
        constructors: constructorResponse.data.data.standings,
        schedule: scheduleResponse.data.data,
        season: driverResponse.data.data.season
      }
      console.log(standings.value.season)
      console.log('new')
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
        drivers: driverResponse.data.data.standings,
        constructors: constructorReponse.data.data.standings,
        schedule: scheduleResponse.data.data,
        season: driverResponse.data.data.season
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
