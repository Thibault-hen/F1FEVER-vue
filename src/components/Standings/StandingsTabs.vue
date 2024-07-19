<template>
  <TabGroup>
    <div class="flex md:items-end flex-col-reverse md:flex-row">
      <TabList
        class="flex p-2 bg-white dark:bg-dark-2 rounded-lg shadow border border-slate-50/[0.06] md:mt-0 mt-4"
      >
        <Tab
          selected
          class="text-sm w-full md:w-auto xl:text-base py-2 px-6 ui-selected:bg-red-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:dark:bg-dark-2 ui-not-selected:text-black ui-not-selected:dark:text-white rounded border-none outline-none"
          >Drivers Standings</Tab
        >
        <Tab
          selected
          class="text-sm w-full md:w-auto xl:text-base py-2 px-6 ui-selected:bg-red-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:dark:bg-dark-2 ui-not-selected:text-black ui-not-selected:dark:text-white rounded border-none outline-none"
          >Constructors Standings</Tab
        >
      </TabList>
      <slot name="selector"></slot>
    </div>
    <TabPanels
      class="relative flex bg-white dark:bg-dark-2 rounded shadow border border-slate-50/[0.06] w-full p-2"
    >
      <div
        v-if="props.isLoading"
        class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      >
        <Loader />
      </div>

      <TabPanel class="w-full">
        <DriverStandings :season="props.selectedSeason" :data="props.driverStandings" />
      </TabPanel>
      <TabPanel class="w-full">
        <ConstructorStandings :season="selectedSeason" :data="props.constructorStandings" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import DriverStandings from '@/components/Standings/DriverStandings.vue'
import ConstructorStandings from '@/components/Standings/ConstructorStandings.vue'
import Loader from '../UI/Loader.vue'

const props = defineProps([
  'driverStandings',
  'constructorStandings',
  'selectedSeason',
  'isLoading'
])
</script>
