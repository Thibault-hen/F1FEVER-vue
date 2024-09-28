<template>
  <footer class="sticky top-[100vh] dark:text-white py-2">
    <!-- Add a background and padding -->
    <div class="dark:border-zinc-700 border-gray-300 border-t mt-8 py-2"></div>
    <div class="flex flex-col md:flex-row justify-between w-full space-y-3.5 md:space-y-0">
      <div class="flex max-w-xl xl:max-w-3xl">
        <span class="text-xs xl:text-sm">
          © 2024 F1FEVER. All Rights Reserved. This website is unofficial and is not associated in
          any way with the Formula One group of companies.
        </span>
      </div>
      <div class="flex">
        <span class="flex text-xs tracking-widest items-center">
          Developed in<CountryFlag
            class="ml-2 border border-black dark:border-white"
            :country="country"
          />
        </span>
      </div>
    </div>
  </footer>
</template>
<script setup>
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'

const country = 'France'
</script>
