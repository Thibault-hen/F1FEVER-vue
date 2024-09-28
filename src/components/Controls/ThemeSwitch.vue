<template>
  <div class="flex">
    <Switch
      v-model="isDark"
      :class="isDark ? 'bg-dark-1' : 'bg-zinc-100'"
      class="hover:!border-primary dark:border-zinc-700 border-gray-300 shadow-lg relative inline-flex h-[22px] w-[46px] cursor-pointer rounded-full border transition-all duration-400 ease-in-out"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="isDark ? 'translate-x-6 bg-dark-2' : 'translate-x-0 bg-white'"
        class="flex pointer-events-none h-[20px] w-[20px] transform rounded-full !transition duration-100 ease-in-out items-center"
      >
        <Icon icon="ph:sun-thin" height="20px" wdith="20px" color="black" v-if="!isDark" />

        <Icon icon="ph:moon-thin" height="20px" wdith="20px" color="white" v-else
      /></span>
    </Switch>
  </div>
</template>

<script setup>
import { Switch } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const isDark = useDark()
</script>
