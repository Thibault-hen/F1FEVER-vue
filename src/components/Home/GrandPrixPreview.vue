<template>
  <div
    class="xl:ml-4 relative flex flex-col bg-white dark:bg-dark-2 rounded p-2 dark:text-white border border-slate-50/[0.06] shadow"
  >
    <!-- Label for Latest Grand Prix -->
    <div
      class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded px-2 py-1 uppercase tracking-wide"
    >
      {{ $t('home.latest_grandprix.label') }}
    </div>
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <Loader />
    </div>
    <div v-else>
      <div
        class="flex flex-col justify-center items-center mt-6 md:mt-0 xl:mt-6 text-xs md:text-base"
      >
        <div class="p-2 flex items-center">
          <span class="font-bold text-base flex items-center md:text-xl">
            <CountryFlag v-if="circuit?.country" :country="circuit.country" class="mr-2" />
            {{ grandPrixInfo.name }}
          </span>
        </div>
        <div class="space-x-2 flex items-center">
          <box-icon name="calendar-event" color="red"></box-icon>
          <span>{{ grandPrixInfo.date }}</span>
          <box-icon name="time-five" color="red"></box-icon>
          <span>{{ grandPrixInfo.time }}</span>
        </div>
      </div>
      <hr
        class="my-4 bg-gradient-to-r from-transparent via-red-500 to-transparent h-0.5 border-transparent"
      />
      <div
        v-for="(result, index) in raceResults"
        :key="index"
        class="text-xs md:text-sm flex items-center py-2 w-full"
      >
        <div class="w-8 font-bold">{{ result.final_position }}</div>
        <NationalityFlag :nationality="result.nationality" />
        <div class="ml-2 flex-grow">{{ result.name }}</div>
        <div class="w-20 text-right">{{ result.time }}</div>
      </div>
      <div class="flex justify-center mt-4">
        <RouterLink
          :to="`/grand-prix/${grandPrixInfo.year}/${grandPrixInfo.slug}`"
          class="rounded bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br text-white px-4 py-2 tracking-wider transition ease-in-out hover:scale-110"
        >
          Full result
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import NationalityFlag from '../UI/NationalityFlag.vue'
import CountryFlag from '../UI/CountryFlag.vue'
import Loader from '../UI/Loader.vue'

const grandPrixInfo = ref({})
const raceResults = ref([])
const circuit = ref({})
const isLoading = ref(true)

// Usage
const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('http://f1fever.test/api/grand-prix/latest-preview')
    grandPrixInfo.value = response.data.data.grand_prix_info
    raceResults.value = response.data.data.race_result
    circuit.value = response.data.data.circuit
  } catch (error) {
    console.error('Error in fetchData:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
