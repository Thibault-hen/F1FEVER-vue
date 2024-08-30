<template>
  <div class="empty-standings flex flex-col items-center justify-center p-6 text-center">
    <box-icon
      name="flag-checkered"
      type="solid"
      :color="isDark ? 'white' : 'black'"
      size="lg"
    ></box-icon>
    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Data unavailable</h2>
    <p class="text-gray-600 dark:text-gray-400">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
