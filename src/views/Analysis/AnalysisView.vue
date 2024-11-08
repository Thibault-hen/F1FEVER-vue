<template>
  <div>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <AnalysisHeader />
    <div class="flex flex-col lg:flex-row space-around gap-10">
      <div class="flex flex-col w-full gap-2">
        <div
          class="flex flex-col rounded-lg border bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 dark:border-slate-50/[0.06] p-4 shadow-md"
        >
          <div class="flex py-4">
            <Icon
              icon="ph:database-thin"
              height="30px"
              wdith="30px"
              class="bg-primary/20 p-1 rounded border border-primary mr-4"
              :color="isDark ? 'white' : 'black'"
            />
            <h3 class="flex items-center text-sm uppercase tracking-wider dark:text-white">
              Lap times comparator
            </h3>
          </div>
          <span class="dark:text-white tracking-tight">
            Analyze and compare lap times between two drivers for the selected Grand Prix, providing
            detailed insights into their performance across each lap
          </span>
          <RouterLink
            to="/analysis/lap-times"
            class="uppercase tracking-widest text-xs self-start w-auto text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-2 px-4 rounded-md my-2 transition-all duration-150"
          >
            Compare lap times
          </RouterLink>
        </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <div
          class="flex flex-col rounded-lg border bg-gradient-to-br dark:from-dark-1 dark:via-dark-1 dark:to-dark-2 from-white via-white bg-white to-zinc-100 dark:border-slate-50/[0.06] p-4 shadow-md"
        >
          <div class="flex py-4">
            <Icon
              icon="mdi:report-finance"
              height="30px"
              wdith="30px"
              class="bg-primary/20 p-1 rounded border border-primary mr-4"
              :color="isDark ? 'white' : 'black'"
            />
            <h3 class="flex items-center text-sm uppercase tracking-wider dark:text-white">
              Race report
            </h3>
          </div>
          <span class="dark:text-white tracking-tight">
            Access a detailed race report with lap times and performance insights for a selected
            driver in the chosen Grand Prix, providing an in-depth view of their race performance.
          </span>
          <RouterLink
            :to="{ name: 'RaceReport' }"
            class="uppercase tracking-widest text-xs self-start w-auto text-white bg-primary dark:bg-primary/20 hover:bg-primary/70 dark:hover:bg-primary dark:text-white border border-primary p-2 px-4 rounded-md my-2 transition-all duration-150"
          >
            Race report
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AnalysisHeader from '@/components/Pages/analysis/AnalysisHeader.vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'
import { useTitle } from '@vueuse/core'

const isDark = useDark()
const title = useTitle()
const breadCrumbLinks = [
  {
    text: 'Analysis',
    route: 'Analysis'
  }
]

const updateTitle = () => {
  title.value = 'F1FEVER - Analysis'
}

updateTitle()
</script>
