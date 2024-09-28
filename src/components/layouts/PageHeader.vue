<template>
  <div
    class="fixed top-0 w-full dark:bg-dark-1 bg-white border-b dark:border-zinc-700 border-gray-300 mt-20 md:mt-0 min-h-20 z-30"
  >
    <div class="flex items-center justify-between mt-2 md:p-1 md:mx-4">
      <div class="my-4 mx-4 md:mx-0">
        <NextGrandPrix />
      </div>
    </div>
  </div>
</template>

<script setup>
import NextGrandPrix from '@/components/UI/NextGrandPrix.vue'
</script>
