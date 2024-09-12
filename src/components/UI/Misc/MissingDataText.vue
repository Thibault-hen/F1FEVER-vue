<template>
  <div class="empty-standings flex flex-col items-center justify-center p-6 text-center">
    <Icon
      icon="line-md:emoji-cry-filled"
      height="64px"
      wdith="64px"
      class="mb-2"
      :color="isDark ? 'white' : 'red'"
    />
    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Data unavailable</h2>
    <p class="text-gray-600 dark:text-gray-400">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const isDark = useDark()
</script>
