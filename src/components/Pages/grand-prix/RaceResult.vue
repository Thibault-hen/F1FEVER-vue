<template>
  <div class="flex flex-col w-full overflow-x-auto">
    <table
      class="min-w-full dark:text-white border-separate border-spacing-y-0.5 table-fixed leading-2"
    >
      <thead class="dark:text-white overflow-hidden tracking-wide text-sm lg:text-base">
        <tr>
          <th class="py-3 px-4 text-left rounded-l-lg font-bold min-w-[100px]">
            <Icon
              icon="material-symbols-light:leaderboard-rounded"
              height="32px"
              wdith="32px"
              class="mr-2"
              :color="isDark ? 'white' : 'black'"
            />
          </th>
          <th class="min-w-[200px] text-left tracking-wide uppercase text-sm">Name</th>
          <th class="min-w-[180px] text-left tracking-wide uppercase text-sm">Team</th>
          <th class="min-w-[80px] text-left tracking-wide uppercase text-sm">Grid</th>
          <th class="min-w-[80px] text-left tracking-wide uppercase text-sm">Time</th>
          <th class="min-w-[80px] text-left tracking-wide uppercase text-sm">laps</th>
          <th class="min-w-[80px] text-left rounded-r-lg tracking-wide uppercase text-sm">
            Status
          </th>
        </tr>
      </thead>
      <tbody class="text-xs lg:text-sm">
        <tr
          v-for="(race, index) in store.grandPrixData.raceResult"
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
            class="rounded-l-lg p-4 min-w-[60px] text-left font-bold"
            :class="{
              'dark:text-yellow-300 text-yellow-600 bg-gradient-to-r from-gold to-transparent':
                index === 0,
              'text-blue-400 bg-gradient-to-r from-silver to-transparent': index === 1,
              'text-amber-800 bg-gradient-to-r from-bronze to-transparent': index === 2
            }"
          >
            <div class="flex">
              <span class="mr-1"># {{ race.final_position }}</span>
              <Icon
                v-if="positionDiffType(race.starting_position, race.final_position) === 1"
                icon="mingcute:up-fill"
                height="20px"
                width="20px"
                color="green"
              />
              <Icon
                v-if="positionDiffType(race.starting_position, race.final_position) === -1"
                icon="mingcute:down-fill"
                height="20px"
                width="20px"
                color="red"
              />
              <span
                class="flex items-center"
                :class="{
                  'dark:text-primary text-red-900':
                    positionDiffType(race.starting_position, race.final_position) === -1,
                  'dark:text-green-500 text-green-600':
                    positionDiffType(race.starting_position, race.final_position) === 1
                }"
              >
                {{ positionDiff(race.starting_position, race.final_position) }}</span
              >
            </div>
          </td>
          <td class="min-w-[200px] text-left">
            <div class="flex items-center">
              <NationalityFlag :nationality="race.nationality" class="mr-2" />
              {{ race.name }}
            </div>
          </td>
          <td class="min-w-[80px] text-left">
            <div class="flex items-center">
              <NationalityFlag :nationality="race.team_nationality" class="mr-2" />
              {{ race.team }}
            </div>
          </td>
          <td class="min-w-[80px] text-left tracking-widest">
            <span class="px-2 rounded"> {{ race.starting_position }}</span>
          </td>
          <td class="min-w-[80px] text-left tracking-widest">
            <span class="px-2 rounded"> {{ race.time }}</span>
          </td>
          <td class="min-w-[80px] text-left tracking-widest">
            <span class="px-2 rounded"> {{ race.laps_completed }}</span>
          </td>
          <td class="min-w-[80px] text-left tracking-widest rounded-r-lg">
            <span class="px-2 rounded"> {{ race.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const store = useGrandPrix()
const isDark = useDark()

const positionDiff = (starting_position, final_position) => {
  const result = starting_position - final_position
  if (result === 0) return ''
  else return Math.abs(result).toString()
}

const positionDiffType = (starting_position, final_position) => {
  return Math.sign(starting_position - final_position)
}
</script>
