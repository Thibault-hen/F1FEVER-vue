<template>
  <div
    class="w-full flex justify-between bg-white dark:bg-dark-1 rounded border-l-4 border-l-red-500 p-4 mt-2 lg:mt-0 transition-all shadow shadow-gray-400 dark:shadow-transparent border border-slate-50/[0.06]"
  >
    <div class="flex flex-col justify-center">
      <h4 class="text-xs uppercase text-red-500 tracking-widest font-bold">Pole Sitter</h4>
      <span class="flex dark:text-white"
        >{{ store.poleSitter.name }}
        <NationalityFlag
          class="items-center flex ml-2"
          v-if="store.poleSitter.nationality"
          :nationality="store.poleSitter.nationality"
      /></span>
      <span class="dark:text-white text-xs">Pole time : {{ store.poleSitter.time }}</span>
    </div>
    <div class="flex items-center">
      <Icon
        icon="line-md:speedometer"
        height="46px"
        wdith="46px"
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
import NationalityFlag from '../UI/Flag/NationalityFlag.vue'

const store = useGrandPrix()

const isDark = useDark()
</script>
