<template>
  <div class="flex flex-col w-full py-2">
    <span
      class="border-primary border-l-4 dark:text-white font-bold text-xs dark:font-thin px-2 py-1 uppercase tracking-wide"
    >
      LAP TIMES
    </span>
    <div class="mt-2 p-2 bg-white dark:bg-dark-1 border dark:border-slate-50/[0.06] rounded-lg">
      <div v-if="store.raceReport.lap_times.length > 0" class="overflow-x-auto">
        <table
          class="dark:text-white w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm"
        >
          <thead class="dark:bg-dark-1">
            <tr class="text-left border-b tracking-wide text-sm md:text-base">
              <th class="px-2 py-2 uppercase text-sm rounded-l-lg min-w-16">Lap</th>
              <th class="px-2 text-sm uppercase min-w-32">Position</th>
              <th class="px-2 text-sm uppercase min-w-32">Time</th>
              <th class="px-2 text-sm uppercase rounded-r-lg min-w-32">Prev lap</th>
            </tr>
          </thead>
          <tbody class="dark:bg-dark-1 rounded-lg">
            <tr
              v-for="(lapTimes, index) in store.raceReport.lap_times"
              :key="index"
              class="hover:bg-primary/20 hover:dark:bg-primary/20 odd:bg-zinc-100 dark:odd:bg-dark-2 transition-all ease-in-out duration-100"
            >
              <td class="rounded-l-lg px-4 py-4">
                {{ lapTimes.lap }}
              </td>
              <td class="px-2 text-nowrap">{{ lapTimes.position }}</td>
              <td class="px-2 text-nowrap">{{ lapTimes.time ?? 'N/A' }}</td>
              <td
                class="px-2 text-nowrap rounded-r-lg"
                :class="{
                  'text-green-600': getTimeDiff(index).charAt(0) === '-',
                  'text-primary': getTimeDiff(index).charAt(0) === '+'
                }"
              >
                {{ getTimeDiff(index) ?? 'N/A' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <MissingDataText>
          Lap times for this selected driver and race might be unavailable or something went wrong
          while retrieving the data
        </MissingDataText>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRaceReport } from '@/stores/Analysis/race-report'
import MissingDataText from '@/components/UI/Misc/MissingDataText.vue'

const store = useRaceReport()

const getTimeDiff = (index) => {
  const previousLap = store.raceReport.lap_times[index - 1]?.milliseconds
  const currentLap = store.raceReport.lap_times[index]?.milliseconds

  // Calculate the difference in milliseconds
  const timeDiffInMilliseconds = currentLap - previousLap

  // Convert milliseconds to seconds
  const timeDiffInSeconds = timeDiffInMilliseconds / 1000

  const formattedTimeDiff = timeDiffInSeconds.toFixed(3)

  if (timeDiffInMilliseconds > 0) {
    return `+${formattedTimeDiff}` // current lap is slower than the previous lap
  }
  if (timeDiffInMilliseconds < 0) {
    return `${formattedTimeDiff}` // current lap is faster than the previous lap
  }

  return '' // Lap times are equal
}
</script>
