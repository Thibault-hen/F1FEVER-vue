<template>
  <div v-if="store.circuitData.circuit_info" class="flex flex-row space-x-10">
    <div class="min-w-[300px] min-h-[300px] flex justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <Icon
          icon="hugeicons:album-not-found-02"
          width="80px"
          :color="isDark ? 'white' : 'black'"
        />
        <div class="mt-2">
          <span class="text-xs uppercase dark:text-white mt-4 tracking-widest"
            >image not available</span
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <h1 class="dark:text-white flex items-center text-2xl uppercase tracking-widest py-6">
        {{ store.circuitData.circuit_info.name }}
      </h1>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Location
      </span>
      <span class="dark:text-white flex">
        {{ store.circuitData.circuit_info.location }}
        <CountryFlag
          :country="store.circuitData.circuit_info.country"
          class="ml-2 items-center flex"
      /></span>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Lat
      </span>
      <span class="dark:text-white"> {{ store.circuitData.circuit_info.lat ?? 'N/A' }}</span>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Lng
      </span>
      <span class="dark:text-white truncate"> {{ store.circuitData.circuit_info.lng }}</span>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Alt
      </span>
      <span class="dark:text-white truncate"> {{ store.circuitData.circuit_info.alt }}</span>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Wikipedia link
      </span>
      <span class="dark:text-white truncate">
        {{ store.circuitData.circuit_info.wikipedia_link }}</span
      >
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
