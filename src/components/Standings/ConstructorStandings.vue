<template>
  <div class="flex flex-col w-full py-2 px-2 overflow-x-auto">
    <table
      class="min-w-full dark:text-white border-separate border-spacing-y-0.5 table-fixed leading-2"
    >
      <thead
        class="dark:bg-dark-1 dark:text-white overflow-hidden tracking-wide text-sm lg:text-base"
      >
        <tr>
          <th class="py-3 px-4 text-left rounded-l-lg font-bold max-w-[20px]">Position</th>
          <th class="min-w-[200px] px-4 text-left font-bold">Name</th>
          <th class="min-w-[80px] px-4 text-left font-bold">Wins</th>
          <th class="min-w-[80px] px-4 text-left font-bold">Points</th>
          <th class="min-w-[80px] px-4 text-left rounded-r-lg font-bold">Gap</th>
        </tr>
      </thead>
      <tbody class="text-xs lg:text-sm">
        <tr
          v-for="(constructor, index) in props.data"
          :key="index"
          class="dark:bg-dark-1 transition-all ease-in-out duration-50"
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
            # {{ constructor.position }}
          </td>
          <td class="p-4 min-w-[200px] text-left">
            <div class="flex items-center">
              <NationalityFlag :nationality="constructor.nationality" class="mr-2" />
              {{ constructor.name }}
            </div>
          </td>
          <td
            class="p-4 min-w-[80px] text-left"
            :class="{
              'dark:text-yellow-300 text-yellow-600': constructor.wins > 0
            }"
          >
            {{ constructor.wins }}
          </td>
          <td class="p-4 min-w-[80px] text-left">
            {{ constructor.points }}
          </td>
          <td
            class="rounded-r-lg p-4 min-w-[80px] text-left"
            :class="{ 'text-primary': constructor.gap > 0 }"
          >
            {{ formatGap(constructor.gap) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import NationalityFlag from '../UI/NationalityFlag.vue'

const props = defineProps(['season', 'data'])

const formatGap = (gap) => {
  return gap > 0 ? `-${gap}` : ''
}
</script>
