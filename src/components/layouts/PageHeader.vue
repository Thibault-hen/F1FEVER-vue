<template>
  <div
    class="dark:bg-dark-1 bg-white lg:ml-64 border-b dark:border-zinc-700 border-gray-300 mt-20 lg:mt-0 min-h-20"
  >
    <div class="flex items-center justify-between p-2 mt-2 lg:px-20 px-4">
      <NextGrandPrix />

      <LanguageSelector />
    </div>
  </div>
</template>

<script setup>
import LanguageSelector from '@/components/Controls/LanguageSelector.vue'
import NextGrandPrix from '@/components/UI/NextGrandPrix.vue'
</script>
