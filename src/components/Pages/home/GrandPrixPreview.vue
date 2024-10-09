<template>
  <div
    class="xl:ml-4 relative flex flex-col bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 rounded-lg border p-2 dark:text-white dark:border-slate-50/[0.06] shadow"
  >
    <!-- Label for Latest Grand Prix -->
    <div
      class="absolute top-2 left-2 border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest"
    >
      {{ $t('home.latest_grandprix.label') }}
    </div>
    <div>
      <div
        class="flex flex-col justify-center items-center mt-6 md:mt-0 xl:mt-6 text-xs md:text-base"
      >
        <div class="p-2 flex items-center">
          <CountryFlag
            v-if="store.circuit?.country"
            :country="store.circuit.country"
            class="mr-2"
          />
          <span class="tracking-wider text-base flex items-center md:text-xl uppercase"
            >{{ store.grandPrixInfo.name }}
          </span>
        </div>
        <div class="space-x-2 flex items-center mb-5">
          <Icon
            icon="mdi:calendar"
            height="26px"
            wdith="26px"
            :color="isDark ? 'white' : 'black'"
          />
          <span>{{ store.grandPrixInfo.date }}</span>
          <Icon
            icon="material-symbols-light:timer-outline"
            height="26px"
            wdith="26px"
            :color="isDark ? 'white' : 'black'"
          />
          <span>{{ store.grandPrixInfo.time }}</span>
        </div>
      </div>

      <div class="px-10 xl:px-0">
        <div
          v-for="(result, index) in store.raceResults"
          :key="index"
          class="p-2 flex items-center py-2 w-full rounded transition-all ease-in-out"
          :class="{
            'hover:bg-gold ': index === 0,
            'hover:bg-silver ': index === 1,
            'hover:bg-bronze ': index === 2,
            'hover:bg-primary/20 hover:dark:bg-primary/20':
              index !== 0 && index !== 1 && index !== 2
          }"
        >
          <div class="w-8 font-bold text-xs"># {{ result.final_position }}</div>
          <NationalityFlag :nationality="result.nationality" />
          <div class="ml-2 flex-grow uppercase tracking-wide text-xs">{{ result.name }}</div>
          <div class="w-20 text-right font-bold text-xs">{{ result.time }}</div>
        </div>
      </div>
      <div class="py-2 dark:border-slate-50/[0.06] border-b mx-4"></div>
      <div class="flex justify-center mt-4">
        <RouterLink
          :to="`/grand-prix/${store.grandPrixInfo.year}/${store.grandPrixInfo.slug}`"
          class="uppercase tracking-widest text-xs text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-2 px-4 rounded-md my-1 transition-all duration-300"
        >
          Full Result
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import { useHomeData } from '@/stores/home'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()

const store = useHomeData()
</script>
