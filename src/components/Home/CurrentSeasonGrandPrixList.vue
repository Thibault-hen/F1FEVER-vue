<template>
  <div
    class="relative p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-2 border dark:border-slate-50/[0.06] shadow rounded"
  >
    <div
      class="absolute top-2 left-2 bg-primary text-white text-xs rounded px-2 py-1 uppercase tracking-widest"
    >
      {{ $t('home.current_grandprix.label') }}
    </div>
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <CarLoader class="mt-6" />
    </div>
    <div v-else>
      <div class="mt-6 overflow-x-auto">
        <table
          class="dark:text-white min-w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm mt-2"
        >
          <thead class="dark:bg-dark-1 bg-white-2">
            <tr class="text-left border-b tracking-wide text-sm md:text-base">
              <th class="px-2 py-4 font-bold min-w-64 rounded-l-lg">
                {{ $t('home.current_grandprix.name') }}
              </th>
              <th class="px-2 py-4 font-bold">
                {{ $t('home.current_grandprix.location') }}
              </th>
              <th class="px-2 py-4 font-bold">{{ $t('home.current_grandprix.time') }}</th>
              <th class="px-2 py-4 font-bold">{{ $t('home.current_grandprix.date') }}</th>
              <th class="px-2 py-4 font-bold rounded-r-lg">
                {{ $t('home.current_grandprix.status') }}
              </th>
            </tr>
          </thead>
          <tbody class="dark:bg-dark-1 bg-white">
            <tr
              v-for="(grandPrix, index) in grandPrixList"
              :key="index"
              class="hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-1"
            >
              <td class="px-4 py-4 rounded-l-lg">
                <div class="flex">
                  <CountryFlag :country="grandPrix.country" class="mr-2" />
                  <RouterLink
                    :to="`/grand-prix/${grandPrix.year}/${grandPrix.slug}`"
                    class="font-bold hover:text-primary text-nowrap"
                  >
                    {{ grandPrix.name }}
                  </RouterLink>
                </div>
              </td>
              <td class="px-2 text-nowrap">{{ grandPrix.location }}</td>
              <td class="px-2 text-nowrap">{{ grandPrix.time.slice(0, 5) }}</td>
              <td class="px-2 text-nowrap">{{ grandPrix.date }}</td>
              <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
                <span
                  class="rounded-md py-1 px-2 text-white text-center items-center text-nowrap rounded-r-lg"
                  :class="isUpcoming[index] ? 'bg-blue-500' : 'bg-green-700'"
                >
                  {{
                    isUpcoming[index]
                      ? $t('home.current_grandprix.status_upcoming')
                      : $t('home.current_grandprix.status_completed')
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CountryFlag from '../UI/Flag/CountryFlag.vue'
import CarLoader from '../UI/Loader/CarLoader.vue'
import api from '@/services/api'

const grandPrixList = ref([])
const isUpcoming = ref([])
const isLoading = ref(true)

const getCurrentDate = () => {
  const today = new Date()
  const year = String(today.getFullYear())
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const setGrandPrixStatus = () => {
  const currentDate = getCurrentDate()
  grandPrixList.value.forEach((grandPrix) => {
    isUpcoming.value.push(grandPrix.date > currentDate)
  })
}

const fetchData = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/grand-prix-list/current')
    grandPrixList.value = response.data.data
    setGrandPrixStatus()
  } catch (error) {
    console.error('Error in fetchdata', error)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchData()
})
</script>
