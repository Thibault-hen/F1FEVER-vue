<template>
  <div
    class="flex flex-col bg-white dark:bg-dark-2 rounded p-2 w-96 text-gray-500 dark:text-white border border-slate-50/[0.06] mt-2 transition-all duration-200 ease-in"
  >
    <div>
      <h1 class="text-center">{{ grandPrixInfo.name }}</h1>
      <h2 class="text-center">{{ grandPrixInfo.year }}</h2>
    </div>
    <div
      v-for="(result, index) in raceResults"
      :key="index"
      class="flex items-center space-x-4 py-2 w-full"
    >
      <div class="font-bold">{{ result.final_position }}</div>
      <div class="">{{ result.name }}</div>
      <div>{{ result.nationality }}</div>
      <div class="flex-grow"></div>
      <!-- This will push the time to the end -->
      <div class="text-right">{{ result.time }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const grandPrixInfo = ref({})
const raceResults = ref([])
const circuit = ref({})

// Usage
const fetchData = () => {
  axios
    .get('http://f1fever.test/api/grand-prix/latest-preview')
    .then((response) => {
      const data = response.data.data
      grandPrixInfo.value = data.grand_prix_info
      raceResults.value = data.race_result
    })
    .catch((error) => {
      console.error('Error in fetchData:', error)
    })
}
onMounted(() => {
  fetchData()
})
console.log(grandPrixInfo)
</script>
