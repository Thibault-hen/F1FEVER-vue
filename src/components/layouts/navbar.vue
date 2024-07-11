<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useDark } from '@vueuse/core'
import 'boxicons'
import ThemeSwitch from '../Controls/ThemeSwitch.vue'

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
const toggleBrowse = (event) => {
  showBrowse.value = !showBrowse.value
}

// Toggle the mobile menu
const toggleMobileNav = (event) => {
  isMobileActive.value = !isMobileActive.value
}

// Adjust mobile nav visibility based on window width
const handleResize = () => {
  isMobileActive.value = window.innerWidth <= 1024
}

// Watch for resize events
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // Initial check on mount
})
</script>

<template>
  <nav
    class="text-gray-400 lg:flex lg:flex-col lg:w-64 bg-transparent shadow-md border-r dark:border-slate-50/[0.06] border-gray-00 w-full transition-all duration-200 ease-in lg:min-h-screen"
  >
    <div class="flex flex-col flex-grow text-white">
      <div
        class="p-2 flex items-center shadow-inner dark:bg-dark-1 bg-gray-100 border-b dark:border-zinc-700 border-gray-300"
      >
        <img src="/racing-car.png" alt="Logo" class="h-8 ml-2 mr-4" />
        <span
          class="self-center whitespace-nowrap dark:text-white text-gray-600 uppercase w-0 visible text-sm p-4 tracking-widest font"
          >Formula1FEver</span
        >
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
        :class="[
          isMobileActive ? 'flex flex-col border-b border-zinc-700' : 'hidden ',
          'lg:flex lg:flex-col flex-grow'
        ]"
      >
        <RouterLink
          to="/"
          active-class="border-r-4 text-red-500 dark:text-red-500 dark:text-red-500 transition-all duration-200 ease-in"
          class="tracking-wider flex p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600 items-center"
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
          to="/standings"
          :class="{
            'border-r-4 text-red-500 dark:text-red-500 transition-all duration-200 ease-in':
              isStandingsActive
          }"
          class="tracking-wider flex p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600 items-center"
        >
          <box-icon
            class="mr-4"
            name="medal"
            :color="isStandingsActive ? 'red' : isDark ? 'white' : 'black'"
          ></box-icon>
          {{ $t('nav.standings') }}
        </RouterLink>

        <RouterLink
          to="/grand-prix"
          :class="{
            'border-r-4 text-red-500 dark:text-red-600 transition-all duration-200 ease-in':
              isGrandPrixActive
          }"
          class="tracking-wider flex p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600 items-center"
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
          class="tracking-widest w-full flex justify-between p-4 focus:outline-none hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600 items-center"
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
              to="/drivers"
              :class="{
                'border-r-4 text-red-500 dark:text-red-600 transition-all duration-200 ease-in':
                  isDriversActive
              }"
              class="tracking-wider flex p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600 items-center"
            >
              <box-icon
                class="mr-4"
                name="user"
                :color="isDriversActive ? 'red' : isDark ? 'white' : 'black'"
              ></box-icon>
              {{ $t('nav.drivers') }}
            </RouterLink>
            <RouterLink
              to="/constructors"
              :class="{
                'border-r-4 text-red-500 dark:text-red-600 transition-all duration-200 ease-in':
                  isConstructorsActive
              }"
              class="tracking-wider flex p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600 items-center"
            >
              <box-icon
                class="mr-4"
                name="group"
                :color="isConstructorsActive ? 'red' : isDark ? 'white' : 'black'"
              ></box-icon>
              {{ $t('nav.constructors') }}
            </RouterLink>
            <RouterLink
              to="/circuits"
              :class="{
                'border-r-4 text-red-500 dark:text-red-600 transition-all duration-200 ease-in':
                  isCircuitsActive
              }"
              class="tracking-wider flex p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600"
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
          to="/records"
          :class="{
            'border-r-4 text-red-500 dark:text-red-600 transition-all duration-200 ease-in':
              isRecordsActive
          }"
          class="tracking-wider flex items-center p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600"
        >
          <box-icon
            class="mr-4"
            name="star"
            :color="isRecordsActive ? 'red' : isDark ? 'white' : 'black'"
          ></box-icon>
          {{ $t('nav.records') }}
        </RouterLink>

        <RouterLink
          to="/analysis"
          :class="{
            'border-r-4 text-red-500 dark:text-red-600 transition-all duration-200 ease-in':
              isAnalysisActive
          }"
          class="tracking-wider flex items-center p-4 border-red-500 hover:text-red-500 dark:hover:text-red-500 dark:text-white text-gray-600"
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
