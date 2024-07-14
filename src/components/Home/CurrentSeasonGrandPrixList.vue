<template>
  <div
    class="relative p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-2 border border-slate-50/[0.06] shadow rounded"
  >
    <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded px-2 py-1">
      Current season Grand Prix list
    </div>
    <div class="mt-4 overflow-x-auto">
      <table class="dark:text-white min-w-full">
        <thead>
          <tr class="text-left text-lg border-b">
            <th class="px-2 py-4 font-bold min-w-56">Name</th>
            <th class="px-2 py-4 font-bold min-w-24">Location</th>
            <th class="px-2 py-4 font-bold min-w-16">Time</th>
            <th class="px-2 py-4 font-bold min-w-24">Date</th>
            <th class="px-2 py-4 font-bold min-w-16">Status</th>
          </tr>
        </thead>
        <tbody class="text-left">
          <tr v-for="(grandPrix, index) in grandPrixList" :key="index">
            <td class="px-4 py-4">
              <RouterLink
                :to="`/grand-prix/${grandPrix.year}/${grandPrix.slug}`"
                class="flex font-bold hover:text-red-500 transition-transform duration-100 hover:scale-105"
              >
                <CountryFlag :country="grandPrix.country" class="mr-2" />
                {{ grandPrix.name }}
              </RouterLink>
            </td>
            <td class="px-2 py-4">{{ grandPrix.location }}</td>
            <td class="px-2 py-4">{{ grandPrix.time.slice(0, 5) }}</td>
            <td class="px-2 py-4">{{ grandPrix.date }}</td>
            <td class="px-2 py-4">
              <span
                class="rounded-md p-1 text-white"
                :class="isUpcoming[index] ? 'bg-red-500' : 'bg-green-700'"
              >
                {{ isUpcoming[index] ? 'Upcoming' : 'Completed' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CountryFlag from '../UI/CountryFlag.vue'

const grandPrixList = ref([])
const isUpcoming = ref([])

const getCurrentDate = () => {
  const today = new Date()
  const year = String(today.getFullYear())
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}` // Format: YYYY-MM-DD
}

const setGrandPrixStatus = () => {
  const currentDate = getCurrentDate()
  grandPrixList.value.forEach((grandPrix) => {
    isUpcoming.value.push(grandPrix.date > currentDate)
  })
}

const fetchData = async () => {
  axios
    .get('http://f1fever.test/api/grand-prix-list/current')
    .then((response) => {
      const data = response.data.data
      grandPrixList.value = data
      setGrandPrixStatus()
      console.log(isUpcoming)
    })
    .catch((error) => {
      console.error('Error in fetchdata', error)
    })
}
onMounted(() => {
  fetchData()
})
</script>
