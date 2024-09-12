<template>
  <footer class="sticky top-[100vh] mt-8">
    <div class="flex flex-col md:flex-row justify-between w-full space-y-3.5 md:space-y-0">
      <div class="flex max-w-xl xl:max-w-3xl">
        <span class="dark:text-white text-xs xl:text-sm">
          © 2024 FORMULA1FEVER. All Rights Reserved. This website is unofficial and is not
          associated in any way with the Formula One group of companies.
        </span>
      </div>
      <div class="flex">
        <span class="dark:text-white flex text-xs tracking-widest items-center">
          Developed in<CountryFlag class="ml-2" :country="country" />
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'

const country = 'France'
</script>
