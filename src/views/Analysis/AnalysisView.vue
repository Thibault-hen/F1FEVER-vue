<template>
  <div>
    <AnalysisHeader />
    <div class="flex flex-col lg:flex-row space-around gap-10">
      <div class="flex flex-col w-full gap-2">
        <h1
          class="dark:text-white border-l-4 border-primary p-1 px-2 uppercase text-xs tracking-widest"
        >
          Lap times comparator
        </h1>
        <div
          class="flex flex-col rounded-lg border border-slate-50/[0.06] p-4 shadow shadow-gray-400 dark:shadow-transparent"
        >
          <span class="dark:text-white tracking-tight">
            Analyze and compare lap times between two drivers for the selected Grand Prix, providing
            detailed insights into their performance across each lap
          </span>
          <RouterLink
            to="/analysis/lap-times"
            class="uppercase tracking-widest text-xs self-start w-auto text-white bg-primary border border-transparent p-2 px-4 rounded-md my-2 transition-all duration-150 hover:scale-105"
          >
            Compare lap times
          </RouterLink>
        </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <h1
          class="dark:text-white border-l-4 border-primary p-1 px-2 uppercase text-xs tracking-widest"
        >
          Race report
        </h1>
        <div
          class="flex flex-col rounded-lg border border-slate-50/[0.06] p-4 shadow shadow-gray-400 dark:shadow-transparent"
        >
          <span class="dark:text-white tracking-tight">
            Access a detailed race report with lap times and performance insights for a selected
            driver in the chosen Grand Prix, providing an in-depth view of their race performance.
          </span>
          <RouterLink
            to="/analysis/race-report"
            class="uppercase tracking-widest text-xs self-start w-auto text-white bg-primary border border-transparent p-2 px-4 rounded-md my-2 transition-all duration-150 hover:scale-105"
          >
            Race report
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AnalysisHeader from '@/components/Pages/analysis/AnalysisHeader.vue'
import { RouterLink } from 'vue-router'
</script>
