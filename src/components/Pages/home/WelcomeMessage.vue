<template>
  <section class="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row">
    <div class="flex items-center py-5 md:w-1/2">
      <div class="text-left">
        <h2
          class="text-4xl font-extrabold tracking-tight dark:text-white sm:text-5xl sm:leading-none md:text-6xl"
        >
          F1
          <span class="font-bold text-primary">FEVER</span>
        </h2>
        <p class="max-w-md mx-auto mt-3 text-md text-gray-500 md:mt-5 md:text-base md:max-w-3xl">
          {{ $t('home.welcome.description') }}
        </p>
        <div class="mt-10 flex md:mt-5 gap-2">
          <a
            target="_blank"
            rel="noopener"
            href="https://ergast.com/mrd/"
            class="mr-2 flex items-center uppercase tracking-widest text-xs dark:bg-dark2 hover:text-white hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-5 px-4 rounded-md my-2 transition-all duration-300"
          >
            Ergast F1
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/Thibault-hen/F1FEVER-API"
            class="flex items-center uppercase tracking-widest text-xs text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-5 px-4 rounded-md my-2 transition-all duration-300"
          >
            F1FEVER GitHub
            <Icon icon="mdi:github" height="20px" wdith="20px" class="ml-2" />
          </a>
        </div>
      </div>
    </div>
    <div class="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
      <div class="relative w-full p-3 rounded md:p-8">
        <div class="rounded-lg text-black w-full">
          <img class="rounded-xl" src="../../../assets/test.png" />
        </div>
      </div>
    </div>
  </section>

  <section
    class="py-10 shadow-md dark:border-white/[0.2] border-black/20 border border-x-transparent dark:border-x-transparent bg-gradient-to-b dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 flex justify-around"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 text-center">
      <div class="p-6 lg:max-w-[400px] w-full">
        <div class="flex flex-col gap-6">
          <Icon
            icon="ph:database-thin"
            height="40px"
            wdith="40px"
            class="bg-primary/20 p-1 rounded border border-primary mx-auto"
            :color="isDark ? 'white' : 'black'"
          />
          <h3 class="flex justify-center items-center text-xl dark:text-white">
            {{ $t('home.stats.title') }}
          </h3>
        </div>
        <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
          {{ $t('home.stats.description') }}
        </p>
      </div>
      <div class="p-6 lg:max-w-[400px] w-full">
        <div class="flex flex-col gap-6">
          <Icon
            icon="icon-park-outline:history-query"
            height="40px"
            wdith="40px"
            class="bg-primary/20 p-1 rounded border border-primary mx-auto"
            :color="isDark ? 'white' : 'black'"
          />
          <h3 class="flex justify-center items-center text-xl dark:text-white">
            {{ $t('home.historical.title') }}
          </h3>
        </div>
        <p class="mt-2 dark:text-gray-400 text-gray-600 text-sm">
          {{ $t('home.historical.description') }}
        </p>
      </div>
      <div class="p-6 lg:max-w-[400px] w-full">
        <div class="flex flex-col gap-6">
          <Icon
            icon="nimbus:stats"
            height="40px"
            wdith="40px"
            class="bg-primary/20 p-1 rounded border border-primary mx-auto"
            :color="isDark ? 'white' : 'black'"
          />
          <h3 class="flex justify-center items-center text-xl dark:text-white">
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
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
