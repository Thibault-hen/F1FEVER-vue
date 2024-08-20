<template>
  <TabGroup>
    <div class="flex md:items-end flex-col-reverse md:flex-row">
      <TabList
        class="flex p-2 gap-2 rounded-lg border shadow dark:border-slate-50/[0.06] md:mt-0 mt-4 w-auto max-w-max"
      >
        <Tab
          selected
          class="border border-transparent hover:text-white ui-selected:text-white text-sm py-2 px-6 rounded outline-none duration-200 ease-in-out transition-all transform active:scale-95 dark:ui-selected:bg-primary/20 ui-selected:border-primary ui-selected:bg-primary/60 ui-not-selected:hover:bg-primary/90 dark:ui-not-selected:hover:bg-primary/20 dark:ui-selected:text-white ui-not-selected:bg-white dark:ui-not-selected:bg-dark-1 dark:ui-not-selected:text-white"
        >
          Drivers Standings
        </Tab>
        <Tab
          class="border border-transparent hover:text-white ui-selected:text-white text-sm py-2 px-6 rounded outline-none duration-200 ease-in-out transition-all transform active:scale-95 dark:ui-selected:bg-primary/20 ui-selected:border-primary ui-selected:bg-primary/60 ui-not-selected:hover:bg-primary/90 dark:ui-not-selected:hover:bg-primary/20 dark:ui-selected:text-white ui-not-selected:bg-white dark:ui-not-selected:bg-dark-1 dark:ui-not-selected:text-white"
        >
          Constructors Standings
        </Tab>
      </TabList>
      <slot name="selector"></slot>
    </div>
    <TabPanels class="relative flex w-full rounded p-2">
      <div
        v-if="props.isLoading"
        class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      >
        <CarLoader />
      </div>
      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="transform -translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-transform duration-300 ease-out"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform -translate-x-full opacity-0"
      >
        <TabPanel class="w-full">
          <DriverStandings :season="props.selectedSeason" :data="props.driverStandings" />
        </TabPanel>
      </transition>
      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="transform -translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-transform duration-300 ease-out"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform -translate-x-full opacity-0"
      >
        <TabPanel class="w-full">
          <ConstructorStandings :season="selectedSeason" :data="props.constructorStandings" />
        </TabPanel>
      </transition>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import DriverStandings from '@/components/Standings/DriverStandings.vue'
import ConstructorStandings from '@/components/Standings/ConstructorStandings.vue'
import CarLoader from '../UI/Loader/CarLoader.vue'

const props = defineProps([
  'driverStandings',
  'constructorStandings',
  'selectedSeason',
  'isLoading'
])
</script>
