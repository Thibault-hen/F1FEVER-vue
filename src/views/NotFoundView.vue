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
            <DefaultButton>
              <RouterLink :to="{ name: 'Home' }" class="rounded-lg px-6 py-2 text-center text-base">
                Go To Home
              </RouterLink>
            </DefaultButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import DefaultButton from '@/components/UI/Misc/DefaultButton.vue'
import { RouterLink } from 'vue-router'
import { useDark } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const isDark = useDark()
</script>
