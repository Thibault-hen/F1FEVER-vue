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
          Race
        </Tab>
        <Tab
          class="border border-transparent hover:text-white ui-selected:text-white text-sm py-2 px-6 rounded outline-none duration-200 ease-in-out transition-all transform active:scale-95 dark:ui-selected:bg-primary/20 ui-selected:border-primary ui-selected:bg-primary/60 ui-not-selected:hover:bg-primary/90 dark:ui-not-selected:hover:bg-primary/20 dark:ui-selected:text-white ui-not-selected:bg-white dark:ui-not-selected:bg-dark-1 dark:ui-not-selected:text-white"
        >
          Qualifying
        </Tab>
      </TabList>
      <slot name="selector"></slot>
    </div>
    <TabPanels class="relative flex w-full rounded p-2">
      <div
        v-if="store.isLoading"
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
        <TabPanel class="w-full"> <RaceResult /> </TabPanel>
      </transition>
      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="transform -translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition-transform duration-300 ease-out"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform -translate-x-full opacity-0"
      >
        <TabPanel class="w-full"> <QualiResult /></TabPanel>
      </transition>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import QualiResult from './QualiResult.vue'
import RaceResult from './RaceResult.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useGrandPrix } from '@/stores/grand-prix'

const store = useGrandPrix()
</script>
