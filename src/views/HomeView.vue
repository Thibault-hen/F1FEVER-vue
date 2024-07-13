<script setup>
import GrandPrixPreview from '@/components/Home/GrandPrixPreview.vue'
import GrandPrixList from '@/components/Home/CurrentSeasonGrandPrixList.vue'
</script>

<template>
  <div class="animate-slideLeft container mx-auto py-12">
    <section class="mb-8 text-center">
      <h2 class="text-2xl dark:text-gray-300 text-red-500 font-semibold uppercase tracking-wider">
        {{ $t('home.welcome.title') }}
      </h2>
      <p class="mt-4 dark:text-white tracking-wider text-sm max-w-lg mx-auto">
        {{ $t('home.welcome.description') }}
      </p>
      <p class="mt-4 dark:text-white tracking-wider text-sm max-w-lg mx-auto">
        Powered by the <a href="#" class="text-red-500">F1 Ergast database</a>
      </p>
    </section>

    <hr
      class="my-4 bg-gradient-to-r from-transparent via-red-500 to-transparent h-0.5 border-transparent"
    />

    <section class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        <div
          class="bg-white dark:bg-dark-2 p-6 rounded shadow-md flex flex-col items-center md:items-start border-b-4 dark:border-b-2 border-red-500 hover:-translate-y-1 hover:scale-105 dark:hover:bg-red-950/50 duration-200 border border-slate-50/[0.06]"
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
          class="bg-white dark:bg-dark-2 p-6 rounded shadow-md flex flex-col items-center md:items-start border-b-4 dark:border-b-2 border-red-500 hover:-translate-y-1 hover:scale-105 dark:hover:bg-red-950/50 duration-200 border border-slate-50/[0.06]"
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
          class="bg-white dark:bg-dark-2 p-6 rounded shadow-md flex flex-col items-center md:items-start border-b-4 dark:border-b-2 border-red-500 hover:-translate-y-1 hover:scale-105 dark:hover:bg-red-950/50 duration-200 border border-slate-50/[0.06]"
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
      <div class="xl:flex xl:space-x-2 mt-6">
        <div class="flex-none w-full xl:w-1/3 mb-6">
          <GrandPrixPreview />
        </div>
        <div class="flex-grow">
          <GrandPrixList />
        </div>
      </div>
    </section>
  </div>
</template>
