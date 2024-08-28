<template>
  <section class="relative z-10 py-[120px]">
    <div class="container mx-auto">
      <div class="-mx-4 flex">
        <div class="w-full px-4">
          <div class="mx-auto max-w-[400px] text-center">
            <div class="flex justify-center">
              <box-icon
                class="mb-4"
                animation="tada"
                name="car-crash"
                type="solid"
                color="red"
                size="100px"
              ></box-icon>
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
import 'boxicons'
import { RouterLink } from 'vue-router'
</script>
