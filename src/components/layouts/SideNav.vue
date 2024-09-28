<template>
  <nav
    class="fixed z-20 top-0 left-0 dark:bg-dark-2 lg:bg-transparent lg:flex lg:flex-col bg-white shadow-md border-r dark:border-slate-50/[0.06] border-gray-300 transition-all duration-200 ease-in lg:min-h-screen"
    :class="isSideNavCollapsed ? 'w-32' : 'lg:w-64 w-full'"
  >
    <div class="lg:flex lg:flex-col lg:flex-grow text-white">
      <div
        class="p-4 flex items-center justify-between shadow-inner dark:bg-dark-2 border-b dark:border-zinc-700 border-gray-300 h-20"
      >
        <span class="hidden lg:flex" @click="toggleSideNav">
          <Icon
            icon="game-icons:hamburger-menu"
            height="20px"
            wdith="20px"
            :color="isDark ? 'white' : 'black'"
          />
        </span>
        <div class="flex items-center mr-4">
          <img src="/racing-car.png" alt="Logo" class="ml-2 h-8" />
          <RouterLink :to="{ name: 'Home' }" class="p-4">
            <h1
              class="hover:text-primary dark:text-white text-black dark:hover:text-primary uppercase tracking-widest text-base transition-all ease duration-300"
            >
              F1FEVER
            </h1>
          </RouterLink>
        </div>
        <span class="lg:hidden flex ml-auto" @click="toggleMobileNav">
          <Icon
            icon="game-icons:hamburger-menu"
            height="20px"
            wdith="20px"
            :color="isDark ? 'white' : 'black'"
            v-if="!isMobileActive"
          />
          <Icon
            icon="mingcute:close-fill"
            height="20px"
            wdith="20px"
            :color="isDark ? 'white' : 'black'"
            v-else
          />
        </span>
      </div>

      <div
        class="lg:flex lg:flex-col flex-grow text-sm text-black dark:text-white"
        :class="isMobileActive ? 'flex flex-col border-b border-zinc-700' : 'hidden'"
      >
        <div class="relative group items-center">
          <RouterLink
            :to="{ name: 'Home' }"
            active-class="text-primary dark:text-primary"
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="fluent:home-48-regular"
              height="22px"
              wdith="22px"
              class="mr-2 flex"
              :color="$route.name === 'Home' ? 'red' : isDark ? 'white' : 'black'"
            />
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
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease-in-out hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="material-symbols:leaderboard-outline-rounded"
              height="22px"
              wdith="22px"
              class="mr-2"
              :color="$route.name === 'Standings' ? 'red' : isDark ? 'white' : 'black'"
            />
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
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="mage:trophy"
              height="22px"
              wdith="22px"
              class="mr-2"
              :color="$route.name === 'Grand-prix' ? 'red' : isDark ? 'white' : 'black'"
            />
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
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="circum:medal"
              height="22px"
              wdith="22px"
              class="mr-2"
              :color="$route.name === 'Records' ? 'red' : isDark ? 'white' : 'black'"
            />
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
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="mdi:racing-helmet"
              height="22px"
              wdith="22px"
              class="mr-2"
              :color="$route.name === 'Drivers' ? 'red' : isDark ? 'white' : 'black'"
            />
            {{ $t('nav.drivers') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Drivers' || $route.name === 'Driver'
            }"
          ></span>
        </div>

        <div class="relative group">
          <RouterLink
            :to="{ name: 'Constructors' }"
            active-class="text-primary dark:text-primary"
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="mdi:car-wrench"
              height="22px"
              wdith="22px"
              class="mr-2"
              :color="$route.name === 'Constructors' ? 'red' : isDark ? 'white' : 'black'"
            />
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
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="healthicons:paved-road-outline"
              height="22px"
              wdith="22px"
              class="mr-2"
              :color="$route.name === 'Circuits' ? 'red' : isDark ? 'white' : 'black'"
            />
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
            class="uppercase tracking-widest text-xs relative flex p-4 items-center transition-all duration-300 ease hover:text-primary"
            :class="{ 'border-r-0': isMobileActive }"
          >
            <Icon
              icon="material-symbols-light:query-stats"
              height="22px"
              wdith="22px"
              class="mr-2"
              :color="$route.name === 'Analysis' ? 'red' : isDark ? 'white' : 'black'"
            />
            {{ $t('nav.analysis') }}
          </RouterLink>

          <!-- Sliding bar on hover and active -->
          <span
            class="absolute left-0 top-0 h-full w-1 transition-all duration-300 ease rounded-r-3xl group-hover:bg-primary"
            :class="{
              'bg-primary': $route.name === 'Analysis' || $route.name === 'LapTimes'
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
import ThemeSwitch from '@/components/Controls/ThemeSwitch.vue'
import { Icon } from '@iconify/vue'

const isMobileActive = ref(false)
const isSideNavCollapsed = ref(false)

const isDark = useDark()

// Toggle the mobile menu
const toggleMobileNav = () => {
  isMobileActive.value = !isMobileActive.value
}

const toggleSideNav = () => {
  isSideNavCollapsed.value = !isSideNavCollapsed.value
}
</script>
