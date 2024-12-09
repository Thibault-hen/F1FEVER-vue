<template>
  <section class="dark:bg-dark-1 bg-white py-8">
    <div class="">
      <div class="border-primary border-l-[5px] pl-5">
        <h2 class="text-2xl font-extrabold tracking-tight dark:text-white md:text-3xl uppercase">
          All times
          <span class="font-bold text-primary">records</span>
        </h2>
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
</script>
