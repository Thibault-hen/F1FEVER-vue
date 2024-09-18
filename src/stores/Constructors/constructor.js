import { defineStore } from 'pinia'
import api from '@/services/api'
import { ref } from 'vue'

export const useConstructor = defineStore('constructor', () => {
  const constructorData = ref(null)
  const isLoading = ref(false)

  const fetchConstructor = async (name) => {
    isLoading.value = true
    console.log('zebi')
    try {
      const response = await api.get(`constructor/${name}`)
      constructorData.value = response.data.data
    } catch (error) {
      console.error('Error while fetching this constructor data', error)
    } finally {
      isLoading.value = false
    }
  }
  return {
    constructorData,
    fetchConstructor,
    isLoading
  }
})
