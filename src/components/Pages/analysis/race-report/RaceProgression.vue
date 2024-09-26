<template>
  <div class="py-4">
    <span
      class="border-primary border-l-4 dark:text-white dark:font-thin text-xs tracking-widest px-2 py-1 uppercase"
    >
      Race Progression
    </span>
    <div class="max-w-[1000px] mt-2">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
} from 'chart.js' // Import necessary components
import { useRaceReport } from '@/stores/Analysis/race-report'
import { computed, onMounted } from 'vue'

const store = useRaceReport()

// Register necessary components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip)
Chart.defaults.borderColor = 'rgba(50, 50, 50, 0.2)'

// Compute positions and lap numbers
const positions = computed(() => store.raceReport.lap_times.map((lap) => lap.position))
const lapNumbers = computed(() => store.raceReport.lap_times.map((lap) => lap.lap))
const lapTimes = computed(() => store.raceReport.lap_times.map((lap) => lap.time))

const data = {
  labels: lapNumbers.value, // Lap numbers on the x-axis
  datasets: [
    {
      label: 'Positions',
      data: positions.value, // Use filtered positions as dataset
      borderWidth: 2,
      fill: false,
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderColor: 'rgba(239, 68, 68, 1)',
      pointRadius: 3 // Adjust point radius for better visibility
    }
  ]
}

// Configure the chart
const config = {
  type: 'line', // Set chart type to line
  data: data,
  options: {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        min: 0, // Set minimum value of y-axis
        max: 20, // Set maximum value of y-axis (positions)
        ticks: {
          stepSize: 1 // Show every integer tick
        },
        title: {
          display: true,
          text: 'Position' // Label for y-axis
        }
      },
      x: {
        title: {
          display: true,
          text: 'Lap Number' // Label for x-axis
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const lapIndex = tooltipItem.dataIndex // Get the index of the current lap
            const lapTime = lapTimes.value[lapIndex] // Get the lap time corresponding to the index
            const position = positions.value[lapIndex] // Get the position corresponding to the index

            return `Lap: ${lapNumbers.value[lapIndex]}, Position: ${position}, Time: ${lapTime}`
          }
        }
      }
    }
  }
}

onMounted(() => {
  const ctx = document.getElementById('myChart').getContext('2d') // Get the context for the canvas
  new Chart(ctx, config) // Create the chart instance
})
</script>
