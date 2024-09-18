<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 tracking-widest uppercase my-2"
      >
        Race entered
      </span>
      <Icon
        icon="icons8:finish-flag"
        height="20px"
        width="20px"
        class="mb-1"
        :color="isDark ? 'white' : 'black'"
      />
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div
        v-if="store.circuitData.first_race_entered"
        class="dark:text-white rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center flex justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1 mr-2"
          >First race</span
        >
        <RouterLink
          :to="`/grand-prix/${store.circuitData.first_race_entered.season}/${store.circuitData.first_race_entered.slug}`"
          class="hover:text-primary transition-all duration-150"
        >
          <span class="p-1 flex items-center">
            {{ store.circuitData.first_race_entered.season }}
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
        class="dark:text-white rounded-md border p-2 dark:border-slate-50/[0.06] shadow items-center flex justify-between"
      >
        <span class="bg-primary/20 border border-primary rounded-md px-2 uppercase text-xs p-1 mr-2"
          >Last race</span
        >
        <RouterLink
          :to="`/grand-prix/${store.circuitData.last_race_entered.season}/${store.circuitData.last_race_entered.slug}`"
          class="hover:text-primary transition-all duration-150"
        >
          <span class="p-1 flex items-center">
            {{ store.circuitData.last_race_entered.season }}
            {{ store.circuitData.last_race_entered.name }}
            <CountryFlag
              :country="store.circuitData.last_race_entered.country"
              class="ml-2 items-center"
            />
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCircuit } from '@/stores/Circuits/circuit'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const store = useCircuit()
const isDark = useDark()
</script>
