<template>
  <div
    class="xl:ml-4 relative flex flex-col bg-white dark:bg-dark-1 rounded-lg border p-2 dark:text-white dark:border-slate-50/[0.06] shadow"
  >
    <!-- Label for Latest Grand Prix -->
    <div
      class="absolute top-2 left-2 bg-primary text-white text-xs rounded px-2 py-1 uppercase tracking-widest"
    >
      {{ $t('home.latest_grandprix.label') }}
    </div>
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <CarLoader class="mt-6" />
    </div>
    <div v-else>
      <div
        class="flex flex-col justify-center items-center mt-6 md:mt-0 xl:mt-6 text-xs md:text-base"
      >
        <div class="p-2 flex items-center">
          <span class="font-bold text-base flex items-center md:text-xl">
            <CountryFlag v-if="circuit?.country" :country="circuit.country" class="mr-2" />
            {{ grandPrixInfo.name }}
          </span>
        </div>
        <div class="space-x-2 flex items-center mb-5">
          <Icon
            icon="material-symbols-light:event-outline"
            height="26px"
            wdith="26px"
            :color="isDark ? 'white' : 'black'"
          />
          <span>{{ grandPrixInfo.date }}</span>
          <Icon
            icon="material-symbols-light:timer-outline"
            height="26px"
            wdith="26px"
            :color="isDark ? 'white' : 'black'"
          />
          <span>{{ grandPrixInfo.time }}</span>
        </div>
      </div>

      <LineSeparator class="mx-auto" />

      <div
        v-for="(result, index) in raceResults"
        :key="index"
        class="p-2 text-xs md:text-sm flex items-center py-2 w-full rounded transition-all ease-in-out"
        :class="{
          'hover:bg-gold ': index === 0,
          'hover:bg-silver ': index === 1,
          'hover:bg-bronze ': index === 2,
          'hover:bg-primary/20 hover:dark:bg-primary/20': index !== 0 && index !== 1 && index !== 2
        }"
      >
        <div
          class="w-8"
          :class="{
            'dark:text-yellow-300 text-yellow-600': index === 0,
            'text-blue-400': index === 1,
            'text-amber-800': index === 2
          }"
        >
          # {{ result.final_position }}
        </div>
        <NationalityFlag :nationality="result.nationality" />
        <div class="ml-2 flex-grow">{{ result.name }}</div>
        <div class="w-20 text-right">{{ result.time }}</div>
      </div>
      <div class="flex justify-center mt-4">
        <DefaultButton>
          <RouterLink
            :to="`/grand-prix/${grandPrixInfo.year}/${grandPrixInfo.slug}`"
            class="rounded text-white px-4 py-2 tracking-wider transition ease-in-out hover:scale-110"
          >
            Full Result
          </RouterLink>
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import NationalityFlag from '../UI/Flag/NationalityFlag.vue'
import CountryFlag from '../UI/Flag/CountryFlag.vue'
import CarLoader from '../UI/Loader/CarLoader.vue'
import LineSeparator from '../UI/Misc/LineSeparator.vue'
import DefaultButton from '../UI/Misc/DefaultButton.vue'
import { useGrandPrixPreview } from '@/composables/last-grand-prix-preview'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()

const { grandPrixInfo, raceResults, circuit, isLoading, fetchGrandPrixPreview } =
  useGrandPrixPreview()

onMounted(() => {
  fetchGrandPrixPreview()
})
</script>
