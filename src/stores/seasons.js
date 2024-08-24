import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useSeasonsStore = defineStore('seasons', () => {
  const seasons = ref([])
  const fetchSeasons = async () => {
    if (seasons.value.length > 0) {
      return
    }
    try {
      const response = await api.get('/seasons')
      seasons.value = response.data.data
    } catch (error) {
      console.error('Error while fetching seasons', error)
    }
  }

  return {
    seasons,
    fetchSeasons
  }
})
