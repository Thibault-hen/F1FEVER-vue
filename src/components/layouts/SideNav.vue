<template>
  <nav
    class="fixed z-50 top-0 left-0 dark:bg-dark-2 lg:bg-transparent lg:flex lg:flex-col lg:w-64 bg-white shadow-md border-r dark:border-slate-50/[0.06] border-gray-300 w-full transition-all duration-200 ease-in lg:min-h-screen"
  >
    <div class="z-99 relative w-full border-t border-solid !border-[2px] gradient-bar"></div>
    <div class="lg:flex lg:flex-col lg:flex-grow text-white">
      <div
        class="p-2 flex items-center shadow-inner dark:bg-dark-2 border-b dark:border-zinc-700 border-gray-300"
      >
        <img src="/racing-car.png" alt="Logo" class="ml-2 h-8" />
        <RouterLink
          :to="{ name: 'Home' }"
          class="lg:mx-auto uppercase text-black dark:text-white text-sm p-4 tracking-widest"
        >
          <GradientTitle class="text-base">Formula1FEver</GradientTitle>
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
        <RouterLink
          :to="{ name: 'Home' }"
          active-class="border-r-4 text-primary dark:text-primary transition-all duration-200 ease-in"
          class="tracking-wider flex p-4 border-primary hover:text-primary items-center"
          :class="{ 'border-r-0': isMobileActive }"
        >
          <box-icon
            class="mr-4"
            name="home-alt"
            :color="$route.path === '/' ? 'red' : isDark ? 'white' : 'black'"
          ></box-icon>
          {{ $t('nav.home') }}
        </RouterLink>

        <RouterLink
          :to="{ name: 'Standings' }"
          :class="{
            'border-r-4 text-primary transition-all duration-200 ease-in': isStandingsActive
          }"
          class="tracking-wider flex p-4 border-primary hover:text-primary items-center"
        >
          <box-icon
            class="mr-4"
            name="medal"
            :color="isStandingsActive ? 'red' : isDark ? 'white' : 'black'"
          ></box-icon>
          {{ $t('nav.standings') }}
        </RouterLink>

        <RouterLink
          :to="{ name: 'Grand-prix' }"
          :class="{
            'border-r-4 text-primary transition-all duration-200 ease-in': isGrandPrixActive
          }"
          class="tracking-wider flex p-4 border-primary hover:text-primary items-center"
        >
          <box-icon
            class="mr-4"
            name="trophy"
            :color="isGrandPrixActive ? 'red' : isDark ? 'white' : 'black'"
          ></box-icon>
          {{ $t('nav.grandprix') }}
        </RouterLink>

        <button
          @click="toggleBrowse"
          class="tracking-widest w-full flex justify-between p-4 focus:outline-none hover:text-primary items-center"
        >
          <span class="flex">
            <box-icon class="mr-4" name="category" :color="isDark ? 'white' : 'black'"></box-icon>
            {{ $t('nav.browse') }}
          </span>
          <box-icon
            class="mr-4"
            name="chevron-right"
            :color="isDark ? 'white' : 'black'"
            v-if="!showBrowse"
          ></box-icon>
          <box-icon
            class="mr-4"
            name="chevron-down"
            :color="isDark ? 'white' : 'black'"
            v-else
          ></box-icon>
        </button>

        <!-- Dropdown Submenu -->
        <transition name="fade">
          <div v-if="showBrowse" class="ml-2">
            <RouterLink
              :to="{ name: 'Drivers' }"
              :class="{
                'border-r-4 text-primary transition-all duration-200 ease-in': isDriversActive
              }"
              class="tracking-wider flex p-4 border-primary hover:text-primary items-center"
            >
              <box-icon
                class="mr-4"
                name="user"
                :color="isDriversActive ? 'red' : isDark ? 'white' : 'black'"
              ></box-icon>
              {{ $t('nav.drivers') }}
            </RouterLink>
            <RouterLink
              :to="{ name: 'Constructors' }"
              :class="{
                'border-r-4 text-primary transition-all duration-200 ease-in': isConstructorsActive
              }"
              class="tracking-wider flex p-4 border-primary hover:text-primary items-center"
            >
              <box-icon
                class="mr-4"
                name="group"
                :color="isConstructorsActive ? 'red' : isDark ? 'white' : 'black'"
              ></box-icon>
              {{ $t('nav.constructors') }}
            </RouterLink>
            <RouterLink
              :to="{ name: 'Circuits' }"
              :class="{
                'border-r-4 text-primary transition-all duration-200 ease-in': isCircuitsActive
              }"
              class="tracking-wider flex p-4 border-primary hover:text-primary"
            >
              <box-icon
                class="mr-4"
                name="map-pin"
                :color="isCircuitsActive ? 'red' : isDark ? 'white' : 'black'"
              ></box-icon>
              {{ $t('nav.circuits') }}
            </RouterLink>
          </div>
        </transition>

        <RouterLink
          :to="{ name: 'Records' }"
          :class="{
            'border-r-4 text-primary transition-all duration-200 ease-in': isRecordsActive
          }"
          class="tracking-wider flex items-center p-4 border-primary hover:text-primary"
        >
          <box-icon
            class="mr-4"
            name="star"
            :color="isRecordsActive ? 'red' : isDark ? 'white' : 'black'"
          ></box-icon>
          {{ $t('nav.records') }}
        </RouterLink>

        <RouterLink
          :to="{ name: 'Analysis' }"
          :class="{
            'border-r-4 text-primary transition-all duration-200 ease-in': isAnalysisActive
          }"
          class="tracking-wider flex items-center p-4 border-primary hover:text-primary"
        >
          <box-icon
            class="mr-4"
            name="analyse"
            :color="isAnalysisActive ? 'red' : isDark ? 'white' : 'black'"
          ></box-icon>
          {{ $t('nav.analysis') }}
        </RouterLink>
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
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useDark } from '@vueuse/core'
import 'boxicons'
import ThemeSwitch from '../Controls/ThemeSwitch.vue'
import GradientTitle from '../UI/GradientTitle.vue'

// State to control the visibility of the Browse sub-menu
const showBrowse = ref(false)
const isMobileActive = ref(false)

const isDark = useDark()
const route = useRoute()

const isStandingsActive = computed(() => {
  return route.path.startsWith('/standings')
})

const isGrandPrixActive = computed(() => {
  return route.path.startsWith('/grand-prix')
})

const isDriversActive = computed(() => {
  return route.path.startsWith('/drivers')
})

const isConstructorsActive = computed(() => {
  return route.path.startsWith('/constructors')
})

const isCircuitsActive = computed(() => {
  return route.path.startsWith('/circuits')
})

const isRecordsActive = computed(() => {
  return route.path.startsWith('/records')
})

const isAnalysisActive = computed(() => {
  return route.path.startsWith('/analysis')
})

// Toggle the sub-menu visibility
const toggleBrowse = () => {
  showBrowse.value = !showBrowse.value
}

// Toggle the mobile menu
const toggleMobileNav = () => {
  isMobileActive.value = !isMobileActive.value
}

// // Adjust mobile nav visibility based on window width
// const handleResize = () => {
//   if (!isMobileActive.value) isMobileActive.value = window.innerWidth <= 1024
// }

// Watch for resize events
onMounted(() => {
  // window.addEventListener('resize', handleResize)
  // handleResize() // Initial check on mount
})
</script>

<style scoped>
/* Fade-in animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
