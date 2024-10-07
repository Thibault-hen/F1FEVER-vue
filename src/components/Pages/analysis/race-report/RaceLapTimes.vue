<template>
  <div class="flex flex-col w-full py-2">
    <span
      class="border-primary border-l-4 dark:text-white font-bold text-xs dark:font-thin px-2 py-1 uppercase tracking-wide"
    >
      LAP TIMES
    </span>
    <div class="grid grid-cols-2 md:grid-cols-3 justify-between gap-2 my-2">
      <div
        class="flex w-full rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow justify-around items-center"
      >
        <span class="dark:text-white uppercase text-xs">Fastest</span>
        <div class="flex items-center">
          <span class="uppercase text-xs lg:text-sm text-yellow-500">{{ getFastestTime() }}</span>
          <Icon icon="meteocons:lightning-bolt" height="30px" width="30px" color="eab308" />
        </div>
      </div>
      <div
        class="flex w-full rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow justify-around items-center"
      >
        <span class="dark:text-white uppercase text-xs">Slowest</span>
        <div class="flex items-center">
          <span class="uppercase text-xs lg:text-sm text-primary mr-2">{{ getSlowestTime() }}</span>
          <Icon icon="mdi-light:sleep" height="30px" width="30px" color="ef4444" />
        </div>
      </div>
      <div
        class="flex w-full rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow justify-around items-center"
      >
        <span class="dark:text-white uppercase text-xs">Average</span>
        <div class="flex items-center">
          <span class="uppercase text-xs lg:text-sm text-blue-500 mr-2">{{
            getAverageTime()
          }}</span>
          <Icon icon="tabler:alarm-average" height="30px" width="30px" color="3b82f6" />
        </div>
      </div>
    </div>
    <div class="bg-white dark:bg-dark-1 border dark:border-slate-50/[0.06] rounded-lg">
      <div v-if="store.raceReport.lap_times.length > 0" class="overflow-x-auto">
        <table
          class="dark:text-white w-full leading-normal border-separate border-spacing-y-0.5 text-xs lg:text-sm"
        >
          <thead class="dark:bg-dark-1">
            <tr class="text-left border-b tracking-wide text-xs md:text-base bg-pri">
              <th
                class="px-2 py-2 uppercase text-xs rounded-l-lg min-w-16 font-bold tracking-widest"
              >
                Lap
              </th>
              <th class="px-2 text-xs uppercase min-w-32 font-bold tracking-widest">Position</th>
              <th class="px-2 text-xs uppercase min-w-32 font-bold tracking-widest">Time</th>
              <th class="px-2 text-xs uppercase rounded-r-lg min-w-32 font-bold tracking-widest">
                Prev lap
              </th>
            </tr>
          </thead>
          <tbody class="dark:bg-dark-1 rounded-lg">
            <tr
              v-for="(lapTimes, index) in store.raceReport.lap_times"
              :key="index"
              class="hover:bg-primary/20 hover:dark:bg-primary/20 odd:bg-zinc-100 dark:odd:bg-dark-2 transition-all ease-in-out duration-100 text-xs lg:text-sm"
            >
              <td class="rounded-l-lg px-4 py-4">
                {{ lapTimes.lap }}
              </td>
              <td class="px-2 text-nowrap">{{ lapTimes.position }}</td>
              <td class="px-2 text-nowrap">
                <div class="flex gap-2 items-center" v-if="getFastestTime() === lapTimes.time">
                  <span class="text-yellow-500">{{ lapTimes.time }}</span>
                  <Icon icon="meteocons:lightning-bolt" height="40px" width="40px" color="white" />
                </div>
                <div class="flex gap-2 items-center" v-else-if="getSlowestTime() === lapTimes.time">
                  <span class="text-primary">{{ lapTimes.time }}</span>
                  <Icon icon="mdi-light:sleep" height="30px" width="30px" color="red" />
                </div>
                <div v-else>
                  <span>{{ lapTimes.time ?? 'N/A' }}</span>
                </div>
              </td>
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
import { Icon } from '@iconify/vue'

const store = useRaceReport()

const getFastestTime = () => {
  return store.raceReport.lap_times.reduce((fastest, current) => {
    if (!fastest) return current.time
    if (!current.time) return fastest

    return current.time < fastest ? current.time : fastest
  }, null)
}
const getAverageTime = () => {
  const lapTimes = store.raceReport.lap_times.map((lap) => lap.time).filter(Boolean)
  const totalMilliseconds = lapTimes.reduce((total, time) => total + timeToMilliseconds(time), 0)

  const averageMilliseconds = totalMilliseconds / lapTimes.length

  return millisecondsToTime(averageMilliseconds)
}
const getSlowestTime = () => {
  return store.raceReport.lap_times.reduce((slowest, current) => {
    if (!slowest) return current.time
    if (!current.time) return slowest

    return timeToMilliseconds(current.time) > timeToMilliseconds(slowest) ? current.time : slowest
  }, null)
}

const timeToMilliseconds = (time) => {
  const [minutes, seconds] = time.split(':')
  const [sec, millis] = seconds.split('.')

  return parseInt(minutes) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(millis)
}

const millisecondsToTime = (millis) => {
  const minutes = Math.floor(millis / 60000)
  millis %= 60000
  const seconds = Math.floor(millis / 1000)
  const milliseconds = millis % 1000

  return `${minutes}:${seconds.toString()}.${Math.floor(milliseconds.toString())}`
}

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
