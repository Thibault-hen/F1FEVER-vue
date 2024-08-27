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
          <th class="min-w-[80px] px-4 text-left tracking-wide uppercase text-sm">Team</th>
          <th class="min-w-[80px] px-4 text-left tracking-wide uppercase text-sm">q1 Time</th>
          <th class="min-w-[80px] px-4 text-left tracking-wide uppercase text-sm">q2 Time</th>
          <th class="min-w-[80px] px-4 text-left rounded-r-lg tracking-wide uppercase text-sm">
            q3 time
          </th>
        </tr>
      </thead>
      <tbody class="text-xs lg:text-sm">
        <tr
          v-for="(quali, index) in store.qualiResult"
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
            # {{ quali.position }}
          </td>
          <td class="p-4 min-w-[200px] text-left">
            <div class="flex items-center">
              <NationalityFlag :nationality="quali.nationality" class="mr-2" />
              {{ quali.name }}
            </div>
          </td>
          <td class="p-4 min-w-[80px] text-left">
            <span class="px-2 rounded"> {{ quali.team }}</span>
          </td>
          <td class="p-4 min-w-[80px] text-left tracking-widest">
            <span class="px-2 rounded"> {{ quali.q1_time }}</span>
          </td>
          <td class="p-4 min-w-[80px] text-left tracking-widest">
            <span class="px-2 rounded"> {{ quali.q2_time }}</span>
          </td>
          <td class="p-4 min-w-[80px] text-left tracking-widest rounded-r-lg">
            <span class="px-2 rounded"> {{ quali.q3_time }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import NationalityFlag from '../UI/Flag/NationalityFlag.vue'
import { useDark } from '@vueuse/core'

const store = useGrandPrix()
const isDark = useDark()
</script>
