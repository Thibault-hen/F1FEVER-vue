<template>
  <section class="relative z-10 py-[120px]">
    <div class="container mx-auto">
      <div class="-mx-4 flex">
        <div class="w-full px-4">
          <div class="mx-auto max-w-[400px] text-center">
            <div class="flex justify-center">
              <Icon
                icon="line-md:emoji-cry-filled"
                height="64px"
                wdith="64px"
                class="mb-8"
                :color="isDark ? 'white' : 'red'"
              />
            </div>
            <h4 class="mb-3 text-lg leading-tight dark:text-white">Oops! something went wrong</h4>
            <p class="mb-8 text-base dark:text-white">The page you are looking for do not exist</p>
            <RouterLink
              :to="{ name: 'Home' }"
              class="mx-auto gap-2 flex items-center max-w-44 justify-center uppercase tracking-widest text-sm text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-2 px-4 rounded-lg my-2 transition-all duration-150"
            >
              <Icon icon="humbleicons:arrow-go-back" height="20px" />
              <span>Go To Home</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
