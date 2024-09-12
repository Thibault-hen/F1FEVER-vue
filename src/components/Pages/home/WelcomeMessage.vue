<template>
  <section class="mb-8 text-center">
    <GradientTitle class="text-3xl uppercase tracking-wider">{{
      $t('home.welcome.title')
    }}</GradientTitle>
    <p class="mt-4 dark:text-white tracking-wider text-sm max-w-lg mx-auto">
      {{ $t('home.welcome.description') }}
    </p>
    <p class="mt-4 dark:text-white tracking-wider text-sm max-w-lg mx-auto">
      Powered by the <a href="#" class="text-primary">F1 Ergast database</a>
    </p>
  </section>

  <LineSeparator class="mx-auto" />

  <section class="py-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      <div
        class="relative p-6 bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 rounded-lg shadow-md dark:border-slate-50/[0.06] border"
      >
        <div class="flex">
          <Icon
            icon="ph:database-thin"
            height="30px"
            wdith="30px"
            class="bg-primary/20 p-1 rounded border border-primary mr-4"
            :color="isDark ? 'white' : 'black'"
          />
          <h3 class="flex items-center text-xl dark:text-white">
            {{ $t('home.stats.title') }}
          </h3>
        </div>
        <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
          {{ $t('home.stats.description') }}
        </p>
      </div>
      <div
        class="relative p-6 bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 rounded-lg shadow-md dark:border-slate-50/[0.06] border"
      >
        <div class="flex">
          <Icon
            icon="icon-park-outline:history-query"
            height="30px"
            wdith="30px"
            class="bg-primary/20 p-1 rounded border border-primary mr-4"
            :color="isDark ? 'white' : 'black'"
          />
          <h3 class="flex items-center text-xl dark:text-white">
            {{ $t('home.historical.title') }}
          </h3>
        </div>
        <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
          {{ $t('home.historical.description') }}
        </p>
      </div>
      <div
        class="relative p-6 bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 rounded-lg shadow-md dark:border-slate-50/[0.06] border"
      >
        <div class="flex">
          <Icon
            icon="nimbus:stats"
            height="30px"
            wdith="30px"
            class="bg-primary/20 p-1 rounded border border-primary mr-4"
            :color="isDark ? 'white' : 'black'"
          />
          <h3 class="flex items-center text-xl dark:text-white">
            {{ $t('home.analysis.title') }}
          </h3>
        </div>
        <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
          {{ $t('home.analysis.description') }}
        </p>
      </div>
    </div>
  </section>
</template>
<script setup>
import GradientTitle from '@/components/UI/Misc/GradientTitle.vue'
import LineSeparator from '@/components/UI/Misc/LineSeparator.vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
