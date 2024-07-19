import { ref } from 'vue'
import axios from 'axios'

export function useStandings() {
  const driverStandings = ref([])
  const constructorStandings = ref([])
  const seasonSchedule = ref([])
  const isLoading = ref(false)

  const fetchDriverStandings = async (season) => {
    try {
      const response = await axios.get(`http://f1fever.test/api/standings/drivers/${season}`)
      if (response.status === 200) {
        driverStandings.value = response.data.data
        console.log('driver updated', driverStandings)
      }
    } catch (error) {
      console.error('Error while fetching drivers standings', error)
    }
  }

  const fetchConstructorStandings = async (season) => {
    try {
      const response = await axios.get(`http://f1fever.test/api/standings/constructors/${season}`)
      if (response.status === 200) {
        constructorStandings.value = response.data.data
        console.log('constructor updated', constructorStandings)
      }
    } catch (error) {
      console.error('Error while fetching cosntructors standings', error)
    }
  }

  const fetchSeasonSchedule = async (season) => {
    try {
      const response = await axios.get(`http://f1fever.test/api/grand-prix-list/season/${season}`)
      if (response.status === 200) {
        seasonSchedule.value = response.data.data
        console.log('race schedule updated', seasonSchedule)
      }
    } catch (error) {
      console.error('Error while fetching season schedule', error)
    }
  }

  const fetchStandings = async (season) => {
    isLoading.value = true
    try {
      await Promise.all([
        fetchDriverStandings(season),
        fetchConstructorStandings(season),
        fetchSeasonSchedule(season)
      ])
    } catch (error) {
      console.error('Error while fetching standings', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchLatestStandings = async () => {
    isLoading.value = true
    try {
      const [driversResponse, constructorsResponse, scheduleResponse] = await Promise.all([
        axios.get('http://f1fever.test/api/standings/drivers'),
        axios.get('http://f1fever.test/api/standings/constructors'),
        axios.get('http://f1fever.test/api/grand-prix-list/season')
      ])

      driverStandings.value = driversResponse.data.data
      constructorStandings.value = constructorsResponse.data.data
      seasonSchedule.value = scheduleResponse.data.data
    } catch (error) {
      console.error('Error while fetching standings', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    driverStandings,
    constructorStandings,
    seasonSchedule,
    fetchDriverStandings,
    fetchConstructorStandings,
    fetchSeasonSchedule,
    fetchStandings,
    fetchLatestStandings,
    isLoading
  }
}
