<template>
  <div
    class="w-full flex justify-between bg-white dark:bg-dark-1 rounded border-l-4 border-l-red-500 p-4 mt-2 lg:mt-0 transition-all shadow shadow-gray-400 dark:shadow-transparent border border-slate-50/[0.06]"
  >
    <div class="flex flex-col justify-center">
      <h4
        class="px-2 text-xs uppercase font-bold text-primary tracking-widest bg-primary/20 border border-primary rounded self-start"
      >
        Winner
      </h4>
      <span class="flex dark:text-white truncate">
        {{ store.grandPrixData.raceWinner.name }}
        <NationalityFlag
          v-if="store.grandPrixData.raceWinner.nationality"
          class="items-center flex ml-2"
          :nationality="store.grandPrixData.raceWinner.nationality"
        />
      </span>
      <span class="dark:text-white text-xs">
        Total time : {{ store.grandPrixData.raceWinner.time }}
      </span>
    </div>
    <div class="flex items-center">
      <Icon
        icon="fluent:trophy-24-filled"
        height="46px"
        width="46px"
        class="bg-primary/20 p-1 rounded border border-primary mr-2"
        :color="isDark ? 'white' : 'black'"
      />
    </div>
  </div>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'

const store = useGrandPrix()

const isDark = useDark()
</script>
