<template>
  <div class="my-2">
    <span
      class="bg-primary/20 border border-primary rounded dark:text-white dark:font-thin text-xs tracking-widest p-1 my-2 uppercase"
    >
      Race stats
    </span>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-2 my-2">
    <div
      class="uppercase dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="p-1 text-xs"> Total races </span>
      <span class="p-1">{{ store.driverData.race_stats[0].total_races }}</span>
    </div>

    <div
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Total podiums </span>
      <div class="p-1">
        <span class="font-bold">{{ store.driverData.race_stats[0].total_podiums }} </span>
        <span class="mx-1">/ </span>
        <span class="text-xs">{{ store.driverData.race_stats[0].total_races }}</span>
      </div>
    </div>

    <div
      class="dark:text-white flex flex-col uppercase rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="text-xs p-1"> Total Poles </span>
      <div class="p-1">
        <span class="p-1 font-bold">{{ store.driverData.race_stats[0].total_poles }} </span>
        <span class="mx-1">/ </span>
        <span class="text-xs">{{ store.driverData.race_stats[0].total_races }}</span>
      </div>
    </div>

    <div
      class="dark:text-white flex flex-col uppercase rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="text-xs p-1"> Total Wins </span>
      <div class="p-1">
        <span class="p-1 font-bold">{{ store.driverData.race_stats[0].total_wins }} </span>
        <span class="mx-1">/ </span>
        <span class="text-xs">{{ store.driverData.race_stats[0].total_races }}</span>
      </div>
    </div>

    <div
      class="dark:text-white flex flex-col uppercase rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="text-xs p-1"> Total Laps </span>
      <div class="p-1">
        <span class="p-1 font-bold">{{ store.driverData.race_stats[0].total_laps }} </span>
      </div>
    </div>

    <div
      class="dark:text-white flex flex-col uppercase rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="text-xs p-1"> Total Points</span>
      <div class="p-1">
        <span class="p-1 font-bold">{{ store.driverData.race_stats[0].total_points }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDriver } from '@/stores/Drivers/driver'

const store = useDriver()
</script>
