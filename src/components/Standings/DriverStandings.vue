<template>
  <div class="flex flex-col w-full overflow-x-auto">
    <table
      class="min-w-full dark:text-white border-separate border-spacing-y-0.5 table-fixed leading-2"
    >
      <thead class="dark:text-white overflow-hidden tracking-wide text-sm lg:text-base">
        <tr>
          <th class="py-3 px-4 text-left rounded-l-lg font-bold max-w-[20px]">
            <box-icon
              type="solid"
              name="bar-chart-alt-2"
              :color="isDark ? 'white' : 'black'"
            ></box-icon>
          </th>
          <th class="min-w-[200px] px-4 text-left tracking-wide uppercase text-sm">Name</th>
          <th class="min-w-[80px] px-4 text-left tracking-wide uppercase text-sm">Wins</th>
          <th class="min-w-[80px] px-4 text-left tracking-wide uppercase text-sm">Points</th>
          <th class="min-w-[80px] px-4 text-left rounded-r-lg tracking-wide uppercase text-sm">
            Gap
          </th>
        </tr>
      </thead>
      <tbody class="text-xs lg:text-sm">
        <tr
          v-for="(driver, index) in props.data"
          :key="index"
          class="odd:dark:bg-dark-2 odd:bg-zinc-100 transition-all ease-in-out duration-50"
          :class="{
            'hover:bg-gold hover:dark:bg-gold': index === 0,
            'hover:bg-silver hover:dark:bg-silver': index === 1,
            'hover:bg-bronze hover:dark:bg-bronze': index === 2,
            'hover:bg-primary/20 hover:dark:bg-primary/20':
              index !== 0 && index !== 1 && index !== 2
          }"
        >
          <td
            class="rounded-l-lg p-4 min-w-[20px] text-left font-bold"
            :class="{
              'dark:text-yellow-300 text-yellow-600 bg-gradient-to-r from-gold to-transparent':
                index === 0,
              'text-blue-400 bg-gradient-to-r from-silver to-transparent': index === 1,
              'text-amber-800 bg-gradient-to-r from-bronze to-transparent': index === 2
            }"
          >
            # {{ driver.position }}
          </td>
          <td class="p-4 min-w-[200px] text-left">
            <div class="flex items-center">
              <NationalityFlag :nationality="driver.nationality" class="mr-2" />
              {{ driver.name }}
            </div>
          </td>
          <td class="p-4 min-w-[80px] text-left tracking-widest">
            <span
              class="px-2"
              :class="{
                'dark:text-yellow-300 text-yellow-600 bg-gold rounded px-2': driver.wins > 0
              }"
            >
              {{ driver.wins }}</span
            >
          </td>
          <td class="p-4 min-w-[80px] text-left tracking-widest">
            <span
              class="px-2 rounded"
              :class="{ 'bg-blue-800/30 dark:text-blue-400 text-blue-800': driver.points > 0 }"
            >
              {{ driver.points }}</span
            >
          </td>
          <td class="rounded-r-lg p-4 min-w-[80px] text-left">
            <span
              :class="{
                'text-primary px-2 dark:bg-primary/20 bg-primary/30 rounded tracking-widest':
                  driver.gap > 0
              }"
            >
              {{ formatGap(driver.gap) }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import NationalityFlag from '../UI/Flag/NationalityFlag.vue'
import { useStandings } from '@/composables/useStandings'
import { useDark } from '@vueuse/core'
import 'boxicons'

const props = defineProps(['season', 'data'])

const { isLoading } = useStandings()
const isDark = useDark()

console.log(isLoading.value)

const formatGap = (gap) => {
  if (gap > 0 && gap.split('.').length >= 2) {
    return Math.round(gap * 100) / 100
  } else if (gap > 0) {
    return `-${gap}`
  } else return 'LEADER'
}
</script>
