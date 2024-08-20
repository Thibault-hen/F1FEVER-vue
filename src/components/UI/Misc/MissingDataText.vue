<template>
  <div class="empty-standings flex flex-col items-center justify-center p-6 text-center">
    <box-icon
      name="flag-checkered"
      type="solid"
      animation="tada"
      :color="isDark ? 'white' : 'black'"
      size="lg"
    ></box-icon>
    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
      {{ props.title }}
    </h2>
    <p class="text-gray-600 dark:text-gray-400">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'
import 'boxicons'

const props = defineProps(['title', 'description'])

const isDark = useDark()
</script>
