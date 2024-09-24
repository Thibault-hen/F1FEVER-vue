<template>
  <div
    v-if="store.lapTimes.secondDriver.driver && store.lapTimes.firstDriver.driver"
    class="flex justify-around my-8"
  >
    <div class="flex flex-col items-center">
      <Icon
        icon="mdi:racing-helmet"
        height="60px"
        wdith="60px"
        class="p-1"
        :color="isDark ? 'white' : 'black'"
      />
      <div class="flex items-center">
        <span class="dark:text-white uppercase text-xs tracking-wider mr-2">{{
          store.lapTimes.firstDriver.driver[0].name
        }}</span>
        <NationalityFlag :nationality="store.lapTimes.firstDriver.driver[0].nationality" />
      </div>
    </div>
    <div class="flex justify-center items-center">
      <span class="dark:text-white font-bold">VS</span>
    </div>
    <div class="flex flex-col items-center">
      <Icon
        icon="mdi:racing-helmet"
        height="60px"
        wdith="60px"
        class="p-1"
        :color="isDark ? 'white' : 'black'"
        horizontalFlip="true"
      />
      <div class="flex items-center">
        <span class="dark:text-white uppercase text-xs tracking-wider mr-2">{{
          store.lapTimes.secondDriver.driver[0].name
        }}</span>
        <NationalityFlag :nationality="store.lapTimes.secondDriver.driver[0].nationality" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLapTimes } from '@/stores/Analysis/lap-times'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'

const store = useLapTimes()

const isDark = useDark()
</script>
