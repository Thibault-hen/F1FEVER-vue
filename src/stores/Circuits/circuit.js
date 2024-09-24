import { defineStore } from 'pinia'
import api from '@/services/api'
import { ref } from 'vue'

export const useCircuit = defineStore('circuit', () => {
  const circuitData = ref(null)
  const isLoading = ref(false)

  const fetchCircuit = async (name) => {
    isLoading.value = true
    try {
      const response = await api.get(`circuit/${name}`)
      circuitData.value = response.data.data
    } catch (error) {
      console.error('Error while fetching this Circuit data', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    circuitData,
    fetchCircuit,
    isLoading
  }
})
