<template>
  <div class="flex">
    <span class="flex items-center mr-4">Appearance</span>
    <Switch
      v-model="isDark"
      :class="isDark ? 'bg-dark-1' : 'bg-zinc-100'"
      class="shadow-lg dark:hover:bg-primary/20 hover:bg-primary/40 border-primaryrelative inline-flex h-[30px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-400 ease-in-out"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="isDark ? 'translate-x-9 bg-dark-2' : 'translate-x-0 bg-white'"
        class="pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full shadow-lg ring-0 !transition duration-100 ease-in-out"
      >
        <Icon
          icon="line-md:sunny-outline-twotone-loop"
          height="24px"
          wdith="24px"
          color="black"
          v-if="!isDark" />

        <Icon icon="line-md:moon-twotone-loop" height="24px" wdith="24px" color="white" v-else
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
