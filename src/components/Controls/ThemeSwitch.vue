<template>
  <div class="flex">
    <span class="flex items-center mr-4">Appearance</span>
    <Switch
      v-model="isDark"
      :class="isDark ? 'bg-gray-200' : 'bg-gray-400'"
      class="dark:hover:bg-primary/20 hover:bg-primary/40 relative inline-flex h-[30px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-400 ease-in-out"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="isDark ? 'translate-x-9 bg-slate-950' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[26px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 !transition duration-200 ease-in-out"
        ><box-icon name="sun" class="p-1" v-if="!isDark"></box-icon
        ><box-icon name="moon" color="white" class="p-1" v-else></box-icon
      ></span>
    </Switch>
  </div>
</template>

<script setup>
import { Switch } from '@headlessui/vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
