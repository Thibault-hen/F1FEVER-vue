<template>
  <div class="flex items-center">
    <span class="p-1 mr-1 dark:text-white text-gray-500">{{ $t('theme.light') }}</span>
    <Switch
      @click="toggleDark"
      v-model="isDark"
      :class="isDark ? 'bg-dark-2 border-2' : 'bg-gray-200 border-zinc-950 border-2'"
      class="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 hover:border-red-500 border-2"
    >
      <span
        :class="isDark ? 'translate-x-9' : 'translate-x-1'"
        class="inline-block h-6 w-6 transform rounded-full transition-transform duration-300"
      >
        <box-icon name="moon" color="white" v-if="isDark"></box-icon>
        <box-icon class="shadow-xl text-white" name="sun" color="black" v-else></box-icon>
      </span>
    </Switch>
    <span class="p-1 ml-1 dark:text-white text-gray-500">{{ $t('theme.dark') }}</span>
  </div>
</template>

<script setup>
import { Switch } from '@headlessui/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
