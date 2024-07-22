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

  <hr
    class="my-4 bg-gradient-to-r from-transparent via-primary to-transparent h-0.5 border-transparent"
  />

  <section class="py-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      <div
        class="bg-white dark:bg-dark-2 p-6 rounded shadow-md flex flex-col items-center md:items-start border hover:scale-105 hover:bg-primary/40 dark:hover:bg-primary/10 duration-100 dark:border-slate-50/[0.06]"
      >
        <div class="text-center md:text-left">
          <box-icon type="solid" name="data" color="red"></box-icon>
          <h3 class="text-xl dark:text-white font-semibold">{{ $t('home.stats.title') }}</h3>
          <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
            {{ $t('home.stats.description') }}
          </p>
        </div>
      </div>
      <div
        class="bg-white dark:bg-dark-2 p-6 rounded shadow-md flex flex-col items-center md:items-start border hover:scale-105 hover:bg-primary/40 dark:hover:bg-primary/10 duration-100 dark:border-slate-50/[0.06]"
      >
        <div class="text-center md:text-left">
          <box-icon type="solid" name="flag-checkered" color="red"></box-icon>
          <h3 class="text-xl dark:text-white font-semibold">{{ $t('home.historical.title') }}</h3>
          <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
            {{ $t('home.historical.description') }}
          </p>
        </div>
      </div>
      <div
        class="bg-white dark:bg-dark-2 p-6 rounded shadow-md flex flex-col items-center md:items-start border hover:scale-105 hover:bg-primary/40 dark:hover:bg-primary/10 duration-100 dark:border-slate-50/[0.06]"
      >
        <div class="text-center md:text-left">
          <box-icon name="analyse" color="red"></box-icon>
          <h3 class="text-xl dark:text-white font-semibold">{{ $t('home.analysis.title') }}</h3>
          <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
            {{ $t('home.analysis.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import GradientTitle from '../UI/GradientTitle.vue'
</script>
