<template>
  <div
    class="flex w-full flex-col bg-white dark:bg-dark-2 p-10 rounded-lg shadow-lg border dark:border-slate-50/[0.06]"
  >
    <div class="flex justify-center md:justify-start">
      <GradientTitle class="text-3xl tracking-wide">
        {{ props.updatedSeason || props.selectedSeason }} Standings</GradientTitle
      >
    </div>
    <hr
      class="my-4 bg-gradient-to-r from-transparent via-primary to-transparent h-0.5 border-transparent max-w-lg"
    />
    <p class="text-sm lg:text-base text-left dark:text-white max-w-lg tracking-wide">
      View the latest standings for drivers, constructors, and race schedules for the selected
      season.
    </p>
    <slot></slot>
    <DataMissingInfo />
  </div>
</template>

<script setup>
import DataMissingInfo from '../UI/DataMissingInfo.vue'
import GradientTitle from '../UI/GradientTitle.vue'

const props = defineProps(['selectedSeason', 'updatedSeason'])
</script>
