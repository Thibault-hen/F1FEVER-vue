<template>
  <aside
    class="w-full md:h-full dark:bg-dark-2 bg-zinc-100 fixed z-40 top-0 left-0 flex flex-col md:overflow-hidden md:min-h-[100vh] transition-all ease-in-out duration-300 border-r dark:border-zinc-700 border-gray-300"
    :class="isExpanded ? 'aside-expanded' : 'aside'"
  >
    <div
      class="flex items-center justify-between md:justify-start min-h-20 border-b dark:border-zinc-700 border-gray-300"
    >
      <div class="md:flex hidden mx-4">
        <button @click="toggleMenu">
          <Icon
            icon="game-icons:hamburger-menu"
            height="20px"
            wdith="20px"
            :color="isDark ? 'white' : 'black'"
          />
        </button>
      </div>
      <RouterLink :to="{ name: 'Home' }" class="p-4 flex items-center gap-2">
        <img src="/racing-car.png" alt="Logo" class="h-8" />
        <h1
          class="hover:text-primary dark:text-white text-black dark:hover:text-primary uppercase tracking-widest text-base transition-all ease duration-300"
        >
          F1FEVER
        </h1>
      </RouterLink>

      <div class="md:hidden flex mx-4">
        <button @click="toggleMobile">
          <Icon
            icon="game-icons:hamburger-menu"
            height="20px"
            wdith="20px"
            :color="isDark ? 'white' : 'black'"
          />
        </button>
      </div>
    </div>

    <div class="dark:text-white md:flex flex-col h-full" :class="isMobile ? 'flex' : 'hidden'">
      <!-- Top section of the navbar links -->
      <div class="flex-grow">
        <RouterLink
          v-for="(link, index) in navLinks"
          :key="index"
          activeClass="text-primary border-l-2 border-l-primary"
          :to="{ name: link.route }"
          class="group flex items-center p-1 border-l-2 border-transparent hover:cursor-pointer gap-2 uppercase tracking-widest text-xs hover:border-l-2 hover:border-l-primary !transition-all !ease-in !duration-200"
          :class="
            link.divider
              ? 'border-b dark:border-b-zinc-700 border-b-gray-300'
              : 'border-b-transparent'
          "
        >
          <div class="flex p-3 gap-6">
            <!-- Apply group-hover to the Icon -->
            <Icon
              :icon="link.icon"
              height="20px"
              width="20px"
              class="group-hover:text-red-500 transition-all ease-in"
            />
            <!-- Apply group-hover to the span -->
            <span class="group-hover:text-red-500 text flex items-center transition-all ease-in">
              {{ link.text }}
            </span>
          </div>
        </RouterLink>
      </div>
      <div
        class="flex justify-center items-center py-4 gap-2 dark:border-zinc-700 border-gray-300 border-t"
      >
        <span
          :class="isExpanded ? 'flex' : 'hidden'"
          class="text-xs tracking-widest dark:text-white"
        >
          Appearance
        </span>
        <ThemeSwitch />
      </div>
    </div>
  </aside>
  <main
    class="transition-all ease-in-out duration-300 h-screen"
    :class="isExpanded ? 'main' : 'main-expanded'"
  >
    <slot name="content"> </slot>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useDark, useBreakpoints } from '@vueuse/core'
import ThemeSwitch from '../Controls/ThemeSwitch.vue'
import { RouterLink } from 'vue-router'

const isExpanded = ref(true)
const isMobile = ref(false)
const isDark = useDark()

const navLinks = [
  {
    text: 'Homepage',
    route: 'Home',
    icon: 'fluent:home-48-regular',
    divider: false
  },
  {
    text: 'Standings',
    route: 'Standings',
    icon: 'material-symbols:leaderboard-outline-rounded',
    divider: false
  },
  {
    text: 'GrandPrix',
    route: 'Grand-prix',
    icon: 'mage:trophy',
    divider: false
  },
  {
    text: 'Records',
    route: 'Records',
    icon: 'circum:medal',
    divider: true
  },
  {
    text: 'Drivers',
    route: 'Drivers',
    icon: 'mdi:racing-helmet',
    divider: false
  },
  {
    text: 'Constructors',
    route: 'Constructors',
    icon: 'mdi:car-wrench',
    divider: false
  },
  {
    text: 'Circuits',
    route: 'Circuits',
    icon: 'healthicons:paved-road-outline',
    divider: true
  },
  {
    text: 'Analysis',
    route: 'Analysis',
    icon: 'material-symbols-light:query-stats',
    divider: false
  }
]

// Define your breakpoints (these can be custom)
const breakpoints = useBreakpoints({
  md: 768,
  xl: 1280
})

// Watch for screen size changes using VueUse breakpoints
const isBelowMd = breakpoints.smaller('md')
const isBelowXl = breakpoints.smaller('xl')

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value
}

const toggleMobile = () => {
  isMobile.value = !isMobile.value
}

watch(isBelowMd, (belowMd) => {
  if (belowMd) {
    isExpanded.value = false
    isMobile.value = false
  }
})

watch(isBelowXl, (belowXl) => {
  if (belowXl) {
    isExpanded.value = false
  } else {
    isExpanded.value = true
  }
})
</script>

<style scoped>
.main {
  margin-left: 250px;
}
.main-expanded {
  margin-left: calc(2rem + 32px);
}
.aside {
  width: calc(2rem + 30px);
}
.aside-expanded {
  width: 250px;
}
@media (max-width: 768px) {
  .main {
    margin-left: 0px;
  }
  .main-expanded {
    margin-left: 0px;
  }
  .aside {
    width: 100% !important;
  }
  .aside.expanded {
    width: 100% !important;
  }
}
</style>
