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
      v-if="store.constructorData.race_stats"
      class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6"
    >
      <div
        class="dark:text-white flex rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1"
          >Races</span
        >
        <span class="ml-2 rounded-md p-0.5 px-2 font-bold">
          {{ store.constructorData.race_stats[0].total_races }}
        </span>
      </div>
      <div
        class="dark:text-white flex rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1"
          >Podiums</span
        >
        <div>
          <span class="p-1 px-2 font-bold"
            >{{ store.constructorData.race_stats[0].total_podiums }}
          </span>
          <span class="mx-1">/ </span>
          <span class="text-xs">{{ store.constructorData.race_stats[0].total_races }}</span>
        </div>
      </div>
      <div
        class="dark:text-white flex rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1"
          >Poles</span
        >
        <div>
          <span class="font-bold">{{ store.constructorData.race_stats[0].total_poles }} </span>
          <span class="mx-1">/ </span>
          <span class="text-xs">{{ store.constructorData.race_stats[0].total_races }}</span>
        </div>
      </div>
      <div
        class="dark:text-white flex rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1">
          Wins</span
        >
        <div>
          <span class="font-bold">{{ store.constructorData.race_stats[0].total_wins }} </span>
          <span class="mx-1">/ </span>
          <span class="text-xs">{{ store.constructorData.race_stats[0].total_races }}</span>
        </div>
      </div>
      <div
        class="dark:text-white flex rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1"
          >Laps</span
        >
        <span class="font-bold">{{ store.constructorData.race_stats[0].total_laps }}</span>
      </div>
      <div
        class="dark:text-white flex rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1"
          >Points</span
        >
        <span class="font-bold">{{ store.constructorData.race_stats[0].total_points }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConstructor } from '@/stores/Constructors/constructor'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const store = useConstructor()
const isDark = useDark()
</script>
