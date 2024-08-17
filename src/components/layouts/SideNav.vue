<template>
  <nav
    class="fixed z-20 top-0 left-0 dark:bg-dark-2 lg:bg-transparent lg:flex lg:flex-col lg:w-64 bg-white shadow-md border-r dark:border-slate-50/[0.06] border-gray-300 w-full transition-all duration-200 ease-in lg:min-h-screen"
  >
    <div class="lg:flex lg:flex-col lg:flex-grow text-white">
      <div
        class="p-2 flex items-center shadow-inner dark:bg-dark-2 border-b dark:border-zinc-700 border-gray-300 h-20"
      >
        <img src="/racing-car.png" alt="Logo" class="ml-2 h-8" />
        <RouterLink :to="{ name: 'Home' }" class="p-4">
          <h1
            class="hover:text-primary dark:text-white text-black dark:hover:text-primary uppercase tracking-widest text-base transition-all ease duration-300"
          >
            F1FEVER
          </h1>
        </RouterLink>
        <span class="lg:hidden flex ml-auto" @click="toggleMobileNav">
          <box-icon
            class="mr-4"
            name="menu-alt-right"
            :color="isDark ? 'white' : 'black'"
            v-if="!isMobileActive"
          ></box-icon>
          <box-icon class="mr-4" name="x" :color="isDark ? 'white' : 'black'" v-else></box-icon>
        </span>
      </div>

      <div
        class="lg:flex lg:flex-col flex-grow text-sm text-black dark:text-white"
        :class="isMobileActive ? 'flex flex-col border-b border-zinc-700' : 'hidden'"
      >
        <div class="relative group">
          <RouterLink
            :to="{ name: 'Home' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="home-alt"
              :color="$route.name === 'Home' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.home') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Home'
            }"
          ></span>
        </div>

        <div class="relative group">
          <RouterLink
            :to="{ name: 'Standings' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="medal"
              :color="$route.name === 'Standings' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.standings') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Standings'
            }"
          ></span>
        </div>

        <div class="relative group">
          <RouterLink
            :to="{ name: 'Grand-prix' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="trophy"
              :color="$route.name === 'Grand-prix' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.grandprix') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Grand-prix'
            }"
          ></span>
        </div>

        <div class="relative group">
          <RouterLink
            :to="{ name: 'Records' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="star"
              :color="$route.name === 'Records' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.records') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Records'
            }"
          ></span>
        </div>

        <div class="relative group border-t dark:border-zinc-700 border-gray-300">
          <RouterLink
            :to="{ name: 'Drivers' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="user"
              :color="$route.name === 'Drivers' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.drivers') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Drivers'
            }"
          ></span>
        </div>

        <div class="relative group">
          <RouterLink
            :to="{ name: 'Constructors' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="group"
              :color="$route.name === 'Constructors' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.constructors') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Constructors'
            }"
          ></span>
        </div>

        <div class="relative group border-b dark:border-zinc-700 border-gray-300">
          <RouterLink
            :to="{ name: 'Circuits' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="map-pin"
              :color="$route.name === 'Citcuits' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.circuits') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Circuits'
            }"
          ></span>
        </div>

        <div class="relative group">
          <RouterLink
            :to="{ name: 'Analysis' }"
            active-class="text-primary dark:text-primary"
            class="font-bold relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <!-- Icon and Text -->
            <box-icon
              class="mr-4"
              name="analyse"
              :color="$route.name === 'Analysis' ? 'red' : isDark ? 'white' : 'black'"
            ></box-icon>
            {{ $t('nav.analysis') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Analysis'
            }"
          ></span>
        </div>

        <!-- Spacer to push ThemeSwitch to bottom -->
        <div class="flex-grow"></div>
        <div class="p-4 border-t dark:border-zinc-700 border-gray-300">
          <div class="flex flex-row row-end-auto justify-center">
            <ThemeSwitch class="" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import 'boxicons'
import ThemeSwitch from '../Controls/ThemeSwitch.vue'

const isMobileActive = ref(false)

const isDark = useDark()

// Toggle the mobile menu
const toggleMobileNav = () => {
  isMobileActive.value = !isMobileActive.value
}
</script>
