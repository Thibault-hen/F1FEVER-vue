<template>
  <div
    class="w-full flex justify-between bg-white dark:bg-dark-1 rounded border-l-4 border-l-red-500 p-4 transition-all shadow shadow-gray-400 dark:shadow-transparent border border-slate-50/[0.06]"
  >
    <div class="flex flex-col justify-center">
      <h4
        class="text-xs uppercase text-red-500 tracking-widest font-bold self-start bg-primary/20 px-2 rounded border border-primary"
      >
        Circuit
      </h4>
      <span class="flex dark:text-white truncate"
        >{{ store.grandPrixData.circuit.name }}
        <CountryFlag class="items-center flex ml-2" :country="store.grandPrixData.circuit.country"
      /></span>
      <span class="dark:text-white text-xs"
        >Location : {{ store.grandPrixData.circuit.location }},
        {{ store.grandPrixData.circuit.country }}</span
      >
    </div>
    <div class="flex items-center">
      <Icon
        icon="line-md:map-marker-twotone-loop"
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
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import { useDark } from '@vueuse/core'

const store = useGrandPrix()

const isDark = useDark()
</script>
