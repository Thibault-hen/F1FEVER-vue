<template>
  <div class="mt-8 mb-4">
    <span
      class="dark:bg-primary/20 bg-primary border border-primary rounded text-white dark:font-thin text-xs tracking-widest p-2 uppercase"
    >
      Stats
    </span>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-2 my-2">
    <div
      class="uppercase dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="p-1 text-xs"> Total races </span>
      <span class="p-1">{{ store.circuitData.race_stats.total_races }}</span>
    </div>
  </div>
</template>

<script setup>
import { useCircuit } from '@/stores/Circuits/circuit'

const store = useCircuit()
</script>
