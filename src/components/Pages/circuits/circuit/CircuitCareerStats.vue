<template>
  <div class="flex flex-col my-2">
    <div class="flex items-center">
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs tracking-widest px-2 py-1 uppercase my-2"
      >
        Career Stats
      </span>
      <Icon
        icon="ion:stats-chart"
        height="18px"
        width="18px"
        class="mb-1"
        :color="isDark ? 'white' : 'black'"
      />
    </div>
    <div
      v-if="store.circuitData.race_stats"
      class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6"
    >
      <div
        class="dark:text-white flex rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1"
          >Races</span
        >
        <span class="ml-2 rounded-md p-0.5 px-2 font-bold">
          {{ store.circuitData.race_stats.total_races }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCircuit } from '@/stores/Circuits/circuit'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const store = useCircuit()
const isDark = useDark()
</script>
