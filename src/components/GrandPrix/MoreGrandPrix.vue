<template>
  <div
    class="relative p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-1 border dark:border-slate-50/[0.06] rounded-lg"
  >
    <div
      class="absolute top-2 left-2 bg-primary text-white text-xs font-bold rounded px-2 py-1 uppercase tracking-wide"
    >
      more {{ props.grandPrixName }}
    </div>
    <div
      v-if="store.isLoading"
      class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
    >
      <CarLoader />
    </div>
    <div class="mt-6 overflow-x-auto">
      <table
        class="dark:text-white min-w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm mt-2"
      >
        <thead class="dark:bg-dark-1">
          <tr class="text-left border-b tracking-wide text-sm md:text-base">
            <th class="px-2 py-2 font-bold min-w-24 rounded-l-lg">Season</th>
            <th class="px-2 py-2 font-bold min-w-64">Winner</th>
            <th class="px-2 py-2 font-bold min-w-64">Second</th>
            <th class="px-2 py-2 font-bold min-w-64">Third</th>
            <th class="px-2 font-bold">
              {{ $t('home.current_grandprix.time') }}
            </th>
            <th class="px-2 font-bold rounded-r-lg">{{ $t('home.current_grandprix.date') }}</th>
          </tr>
        </thead>
        <tbody class="dark:bg-dark-1 rounded-lg">
          <tr
            v-for="(grandPrix, index) in store.grandPrixDataList"
            :key="index"
            class="hover:bg-primary/20 hover:dark:bg-primary/30 odd:bg-zinc-100 dark:odd:bg-dark-2 transition-all ease-in-out duration-100"
          >
            <td class="rounded-l-lg px-4 py-4">
              <div class="flex">
                <RouterLink
                  :to="`/grand-prix/${grandPrix.season}/${grandPrix.slug}`"
                  class="font-bold hover:text-primary dark:hover:text-red-400 transition-transform duration-100 text-nowrap"
                >
                  {{ grandPrix.season }}
                </RouterLink>
              </div>
            </td>
            <td class="px-2 text-nowrap">
              <div class="flex">
                <box-icon type="solid" name="trophy" color="#d4af37" class="mr-2"></box-icon>
                <NationalityFlag
                  class="mr-2"
                  :nationality="extractNationality(grandPrix.podium.winner)"
                />
                {{ grandPrix.podium.winner.replace(/\s*\(.*?\)\s*/g, '') }}
              </div>
            </td>
            <td class="px-2 text-nowrap">{{ grandPrix.podium.second }}</td>
            <td class="px-2 text-nowrap">{{ grandPrix.podium.third }}</td>
            <td class="px-2 text-nowrap">{{ grandPrix.time ?? 'N/A' }}</td>
            <td class="px-2 text-nowrap rounded-r-lg">{{ grandPrix.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import NationalityFlag from '../UI/Flag/NationalityFlag.vue'
import CarLoader from '../UI/Loader/CarLoader.vue'
import 'boxicons'

const props = defineProps(['grandPrixName'])
const store = useGrandPrix()

const extractNationality = (string) => {
  const nationalityMatch = string.match(/\((.*?)\)/)
  return nationalityMatch ? nationalityMatch[1] : ''
}
</script>
