<template>
  <div
    class="flex w-full flex-col bg-white dark:bg-dark-2 p-10 rounded-lg shadow-lg border dark:border-slate-50/[0.06]"
  >
    <div class="flex justify-center md:justify-start mb-5">
      <GradientTitle class="text-3xl tracking-wide">
        {{ props.updatedSeason || props.selectedSeason }} Standings</GradientTitle
      >
    </div>

    <LineSeparator class="mx-auto md:mx-0" />

    <p class="text-sm lg:text-base text-left dark:text-white max-w-lg tracking-wide mt-5">
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
import LineSeparator from '../UI/LineSeparator.vue'

const props = defineProps(['selectedSeason', 'updatedSeason'])
</script>
