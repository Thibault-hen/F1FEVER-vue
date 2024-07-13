<template>
  <div
    class="relative flex flex-col bg-white dark:bg-dark-2 rounded p-2 dark:text-white border border-slate-50/[0.06] shadow transition-all duration-200 ease-in"
  >
    <!-- Label for Latest Grand Prix -->
    <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded px-2 py-1">
      Latest Grand Prix
    </div>
    <div clas="flex">
      <div class="p-2 flex flex-col items-center">
        <CountryFlag v-if="circuit?.country" :country="circuit.country" class="mx-auto" />
        <a
          href=""
          class="text-center font-bold hover:text-red-500 text-xl transition-transform duration-100 hover:scale-105"
        >
          {{ grandPrixInfo.name }}
        </a>
      </div>
      <div class="flex justify-center space-x-2">
        <box-icon name="calendar-event" color="red"></box-icon>
        <span>
          {{ grandPrixInfo.date }}
        </span>
        <box-icon name="time-five" color="red"></box-icon>
        <span>
          {{ grandPrixInfo.time }}
        </span>
      </div>
    </div>
    <hr
      class="my-4 bg-gradient-to-r from-transparent via-red-500 to-transparent h-0.5 border-transparent"
    />
    <div v-for="(result, index) in raceResults" :key="index" class="flex items-center py-2 w-full">
      <div class="w-8 font-bold">{{ result.final_position }}</div>
      <NationalityFlag :nationality="result.nationality" />
      <div class="ml-2 flex-grow">{{ result.name }}</div>
      <div class="w-20 text-right">{{ result.time }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NationalityFlag from '../UI/NationalityFlag.vue'
import CountryFlag from '../UI/CountryFlag.vue'

const grandPrixInfo = ref({})
const raceResults = ref([])
const circuit = ref({})

// Usage
const fetchData = async () => {
  axios
    .get('http://f1fever.test/api/grand-prix/latest-preview')
    .then((response) => {
      const data = response.data.data
      grandPrixInfo.value = data.grand_prix_info
      raceResults.value = data.race_result
      circuit.value = data.circuit
    })
    .catch((error) => {
      console.error('Error in fetchData:', error)
    })
}

onMounted(() => {
  fetchData()
})
</script>
