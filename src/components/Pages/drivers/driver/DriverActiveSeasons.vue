<template>
  <div class="my-2">
    <span
      class="bg-primary/20 border border-primary rounded dark:text-white dark:font-thin text-xs tracking-widest p-1 my-2 uppercase"
    >
      Active seasons
    </span>
  </div>
  <div
    class="max-w-[500px] dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
  >
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between px-4 py-2 text-left text-sm uppercase hover:bg-primary/20 rounded-lg items-center"
      >
        <span class="text-xs">Active season list</span>
        <Icon
          icon="solar:alt-arrow-down-outline"
          height="24px"
          width="24px"
          class="!transition duration-100 ease-in-out"
          :class="open ? 'rotate-180 transform' : ''"
          :color="isDark ? 'white' : 'black'"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pb-2 pt-4 text-sm">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="driver in store.driverData.total_active_seasons.seasons_list"
            :key="driver"
            class="rounded-lg p-1 px-3 text-sm text-center min-w-20"
          >
            <RouterLink
              :to="`/standings/${driver.year}`"
              class="hover:text-primary transition-all duration-150 hover:bg-primary/20 py-1 px-2 rounded"
            >
              {{ driver.year }}
            </RouterLink>
          </span>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { useDriver } from '@/stores/Drivers/driver'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const isDark = useDark()
const store = useDriver()
</script>
