<template>
  <section class="dark:bg-dark-1 bg-white py-8">
    <div class="">
      <div class="border-primary border-l-[5px] pl-5">
        <GradientTitle class="text-dark mb-2 text-2xl md:text-3xl uppercase">
          Drivers {{ props.updatedSeason ?? 'All times' }}
        </GradientTitle>
        <p class="mb-4 text-body-color dark:text-white text-sm font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices lectus sem.
        </p>
        <DataMissingInfo />
      </div>
    </div>
  </section>
</template>

<script setup>
import DataMissingInfo from '@/components/UI/Misc/DataMissingInfo.vue'
import GradientTitle from '@/components/UI/Misc/GradientTitle.vue'

const props = defineProps(['updatedSeason'])
</script>
