<template>
  <div v-if="store.driverData.driver_info" class="flex flex-row space-x-10">
    <div class="min-w-[300px] min-h-[300px] flex justify-center items-center">
      <div v-if="store.driverData.driver_info.wikipedia_img">
        <img class="rounded-3xl" :src="store.driverData.driver_info.wikipedia_img" width="200px" />
      </div>
      <div v-else class="flex flex-col justify-center items-center">
        <Icon
          icon="hugeicons:album-not-found-02"
          width="80px"
          :color="isDark ? 'white' : 'black'"
        />
        <div class="mt-2">
          <span class="text-xs uppercase dark:text-white mt-4 tracking-widest"
            >image not available</span
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <h1 class="dark:text-white flex items-center text-2xl uppercase tracking-widest py-6">
        {{ store.driverData.driver_info.name }}
        <NationalityFlag :nationality="store.driverData.driver_info.nationality" class="ml-2" />
      </h1>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Date of birth
      </span>
      <span class="dark:text-white"> {{ store.driverData.driver_info.date_of_birth }}</span>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Number
      </span>
      <span class="dark:text-white"> {{ store.driverData.driver_info.number ?? 'N/A' }}</span>
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest my-2"
      >
        Wiki link
      </span>
      <span class="dark:text-white truncate">
        {{ store.driverData.driver_info.wikipedia_link }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { useDriver } from '@/stores/Drivers/driver'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const store = useDriver()
const isDark = useDark()
</script>
