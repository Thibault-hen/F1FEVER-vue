<template>
  <div
    class="flex flex-row border justify-between dark:border-slate-50/[0.06] shadow-md dark:text-white p-4 rounded-md"
  >
    <!-- First Driver Lap Times -->
    <div class="flex flex-col">
      <!-- Optional: Add a title for clarity -->
      <div
        v-for="(lap_info, index) in store.lapTimes.firstDriver.lap_times"
        :key="index"
        class="flex flex-row min-h-12"
      >
        <span class="flex self-start rounded border border-primary bg-primary/20 px-2 mr-4"
          >{{ lap_info.lap_position }}th</span
        >
        <span>{{ lap_info.lap_time }}</span>
      </div>
    </div>

    <div class="flex flex-col">
      <div v-for="(lap, index) in getTotalLaps" :key="index" class="flex flex-col min-h-12">
        <h3 class="text-center">Lap {{ lap.lap_number }}</h3>
        <span
          class="text-xs text-center"
          :class="{
            'text-green-600': getTimeDiff(index).charAt(0) === '-',
            'text-primary': getTimeDiff(index).charAt(0) === '+'
          }"
          >{{ getTimeDiff(index) }}</span
        >
      </div>
    </div>

    <!-- Second Driver Lap Times -->
    <div class="flex flex-col">
      <div
        v-for="(lap_info, index) in store.lapTimes.secondDriver.lap_times"
        :key="index"
        class="flex flex-row min-h-12 justify-between"
      >
        <span>{{ lap_info.lap_time }}</span>
        <span class="flex self-start rounded border border-primary bg-primary/20 px-2 ml-4">
          {{ lap_info.lap_position }}th
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLapTimes } from '@/stores/Analysis/lap-times'

const store = useLapTimes()

// Define a computed property that returns the driver with the most lap times
const getTotalLaps = computed(() => {
  const firstDriverLapTimes = store.lapTimes.firstDriver?.lap_times?.length || 0
  const secondDriverLapTimes = store.lapTimes.secondDriver?.lap_times?.length || 0

  // Compare the lap times count and return the driver with the most laps
  if (firstDriverLapTimes > secondDriverLapTimes) {
    return store.lapTimes.firstDriver.lap_times
  } else if (secondDriverLapTimes > firstDriverLapTimes) {
    return store.lapTimes.secondDriver.lap_times
  } else {
    return store.lapTimes.firstDriver.lap_times
  }
})

const getTimeDiff = (index) => {
  const firstDriverLapTime = store.lapTimes.firstDriver.lap_times[index]?.milliseconds
  const secondDriverLapTime = store.lapTimes.secondDriver.lap_times[index]?.milliseconds

  if (firstDriverLapTime == null || secondDriverLapTime == null) {
    console.error('Lap time is undefined or null for one of the drivers')
    return ''
  }

  // Calculate the difference in milliseconds
  const timeDiffInMilliseconds = firstDriverLapTime - secondDriverLapTime

  // Convert milliseconds to seconds
  const timeDiffInSeconds = timeDiffInMilliseconds / 1000

  const formattedTimeDiff = timeDiffInSeconds.toFixed(3)

  if (timeDiffInMilliseconds > 0) {
    return `+${formattedTimeDiff}` // First driver is slower
  }
  if (timeDiffInMilliseconds < 0) {
    return `${formattedTimeDiff}` // First driver is faster
  }

  return '' // Lap times are equal
}
</script>
