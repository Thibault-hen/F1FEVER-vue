<template>
  <div class="mt-8 mb-4">
    <span
      class="dark:bg-primary/20 bg-primary border border-primary rounded text-white dark:font-thin text-xs tracking-widest p-2 uppercase"
    >
      Entered Race
    </span>
  </div>
  <div class="flex flex-col gap-2 my-2 md:max-w-[500px]">
    <div
      v-if="store.circuitData.first_race_entered"
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> First race entered </span>
      <RouterLink
        :to="`/grand-prix/${store.circuitData.first_race_entered.year}/${store.circuitData.first_race_entered.slug}`"
        class="hover:text-primary transition-all duration-150"
      >
        <span class="p-1 flex items-center">
          {{ store.circuitData.first_race_entered.year }}
          {{ store.circuitData.first_race_entered.name }}
          <CountryFlag
            :country="store.circuitData.first_race_entered.country"
            class="ml-2 items-center"
          />
        </span>
      </RouterLink>
    </div>

    <div
      v-if="store.circuitData.last_race_entered"
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Last race entered </span>
      <RouterLink
        :to="`/grand-prix/${store.circuitData.last_race_entered.year}/${store.circuitData.last_race_entered.slug}`"
        class="hover:text-primary transition-all duration-150"
      >
        <span class="p-1 flex items-center">
          {{ store.circuitData.last_race_entered.year }}
          {{ store.circuitData.last_race_entered.name }}
          <CountryFlag
            :country="store.circuitData.last_race_entered.country"
            class="ml-2 items-center"
          />
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useCircuit } from '@/stores/Circuits/circuit'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'

const store = useCircuit()
</script>
