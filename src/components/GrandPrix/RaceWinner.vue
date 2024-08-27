<template>
  <div
    class="w-full flex justify-between bg-white dark:bg-dark-1 rounded border-l-4 border-l-red-500 p-4 mt-2 lg:mt-0 transition-all shadow shadow-gray-400 dark:shadow-transparent border border-slate-50/[0.06]"
  >
    <div class="flex flex-col justify-center">
      <h4 class="text-xs uppercase text-red-500 tracking-widest font-bold">Winner</h4>
      <span class="flex dark:text-white"
        >{{ store.raceWinner.name }}
        <NationalityFlag class="items-center flex ml-2" :nationality="store.raceWinner.nationality"
      /></span>
      <span class="dark:text-white text-xs">Total time : {{ store.raceWinner.time }}</span>
    </div>
    <div class="flex items-center">
      <box-icon name="trophy" type="solid" size="md" color="red"></box-icon>
    </div>
  </div>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import NationalityFlag from '../UI/Flag/NationalityFlag.vue'

const store = useGrandPrix()
</script>
