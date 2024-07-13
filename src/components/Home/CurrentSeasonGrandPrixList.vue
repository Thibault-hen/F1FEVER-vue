<template>
  <div
    class="relative p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-2 border border-slate-50/[0.06] shadow rounded"
  >
    <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded px-2 py-1">
      Current season Grand Prix list
    </div>
    <table class="dark:text-white mt-8">
      <thead>
        <tr class="text-left text-lg border-b">
          <th class="font-bold">Name</th>
          <th class="font-bold">Location</th>
          <th class="font-bold">Time</th>
          <th class="font-bold">Date</th>
        </tr>
      </thead>
      <tbody v-for="(grandPrix, index) in grandPrixList" :key="index">
        <tr>
          <td>
            <a
              class="flex items-center font-bold hover:text-red-500 transition-transform duration-100 hover:scale-105"
              href=""
              ><CountryFlag :country="grandPrix.country" class="mr-2 py-2" />
              {{ grandPrix.name }}</a
            >
          </td>
          <td>{{ grandPrix.location }}</td>
          <td>{{ grandPrix.time }}</td>
          <td>{{ grandPrix.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CountryFlag from '../UI/CountryFlag.vue'

const grandPrixList = ref([])

const fetchData = async () => {
  axios
    .get('http://f1fever.test/api/grand-prix-list/current')
    .then((response) => {
      const data = response.data.data
      grandPrixList.value = data
    })
    .catch((error) => {
      console.error('Error in fetchdata', error)
    })
}
onMounted(() => {
  fetchData()
})
</script>
