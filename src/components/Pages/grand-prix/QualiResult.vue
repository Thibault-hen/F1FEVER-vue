<template>
  <div class="flex flex-col w-full overflow-x-auto">
    <table
      v-if="store.grandPrixData.qualiResult != null"
      class="min-w-full dark:text-white border-separate border-spacing-y-0.5 table-fixed leading-2"
    >
      <thead class="dark:text-white overflow-hidden tracking-wide text-sm lg:text-base">
        <tr>
          <th class="py-3 px-4 text-left rounded-l-lg font-bold max-w-[20px]">
            <Icon
              icon="material-symbols-light:leaderboard-rounded"
              height="32px"
              wdith="32px"
              class="mr-2"
              :color="isDark ? 'white' : 'black'"
            />
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
          v-for="(quali, index) in store.grandPrixData.qualiResult"
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
            class="rounded-l-lg p-4 min-w-[20px] text-left"
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
            <div class="flex items-center">
              <NationalityFlag :nationality="quali.team_nationality" class="mr-2" />
              {{ quali.team }}
            </div>
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
    <div v-else>
      <MissingDataText>
        Qualifying result for this selected season/grand prix might be unavailable or something went
        wrong while retrieving the data
      </MissingDataText>
    </div>
  </div>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'
import MissingDataText from '@/components/UI/Misc/MissingDataText.vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const store = useGrandPrix()
const isDark = useDark()
</script>
