<template>
  <div class="py-4">
    <div
      class="flex flex-col rounded mb-2 border dark:border-slate-50/[0.06] shadow p-4 dark:border-l-primary border-l-primary border-l-4"
    >
      <div class="flex items-center">
        <NationalityFlag
          :nationality="store.raceReport.driver_info.nationality"
          class="mr-2 items-center"
        />
        <h3 class="dark:text-white text-xl uppercase tracking-wider">
          {{ store.raceReport.driver_info.name }}
        </h3>
      </div>
      <h4 class="dark:text-white text-sm uppercase">
        {{ store.raceReport.race_info.name }} - {{ store.raceReport.race_info.season }}
      </h4>
    </div>
  </div>
  <span
    class="bg-primary/20 border border-primary rounded dark:text-white dark:font-thin text-xs tracking-widest px-2 py-1 uppercase"
  >
    Race result
  </span>
  <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-2 my-2">
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Starting Position </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.race_results.starting_position }}
      </span>
    </div>
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Final Position </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.race_results.final_position }}
      </span>
    </div>
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Laps </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.race_results.laps }}
      </span>
    </div>
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Time </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.race_results.time ?? 'N/A' }}
      </span>
    </div>
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Scored Points </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.race_results.points_scored }}
      </span>
    </div>
  </div>

  <span
    v-if="store.raceReport.quali_results"
    class="bg-primary/20 border border-primary rounded dark:text-white dark:font-thin text-xs tracking-widest px-2 py-1 uppercase"
  >
    Qualifying result
  </span>
  <div
    v-if="store.raceReport.quali_results"
    class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-2 my-2"
  >
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Position </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.quali_results.position }}
      </span>
    </div>
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Q1 Time </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.quali_results.q1_time ?? 'N/A' }}
      </span>
    </div>
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Q2 Time </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.quali_results.q2_time ?? 'N/A' }}
      </span>
    </div>
    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Q3 Time </span>
      <span class="mt-1 rounded-md p-0.5 px-1 font-bold text-md">
        {{ store.raceReport.quali_results.q3_time ?? 'N/A' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRaceReport } from '@/stores/Analysis/race-report'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'

const store = useRaceReport()
</script>
