<template>
  <div class="flex flex-col my-4 space-y-4">
    <!-- Active seasons title -->
    <div class="flex items-center">
      <span
        class="border-primary border-l-4 dark:text-white font-bold dark:font-thin text-xs px-2 py-1 uppercase tracking-widest"
      >
        Active Seasons
      </span>
      <Icon
        icon="fluent:checkbox-checked-20-filled"
        height="20px"
        width="20px"
        class="items-center"
        :color="isDark ? 'white' : 'black'"
      />
    </div>

    <!-- Seasons list box -->
    <div
      class="dark:text-white flex flex-col rounded-lg border p-2 dark:border-slate-50/[0.06] shadow-md items-start w-full max-w-lg"
    >
      <span
        class="mb-3 dark:text-white bg-primary/20 border border-primary rounded-md p-1 uppercase text-xs"
      >
        Seasons List
      </span>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="cosntructor in store.constructorData.total_active_seasons.seasons_list"
          :key="cosntructor"
          class="rounded-lg p-1 px-3 text-sm text-center min-w-20"
        >
          <RouterLink
            :to="`/standings/${cosntructor.year}`"
            class="hover:text-primary transition-all duration-150 hover:bg-primary/20 py-1 px-2 rounded"
          >
            {{ cosntructor.year }}
          </RouterLink>
        </span>
      </div>
    </div>

    <div
      class="dark:text-white flex rounded-lg border p-2 dark:border-slate-50/[0.06] shadow-md items-center justify-between w-full max-w-lg"
    >
      <span
        class="dark:text-white bg-primary/20 border border-primary rounded-md p-1 uppercase text-xs"
        >Total Seasons</span
      >
      <span class="ml-4 p-1 px-3">
        {{ store.constructorData.total_active_seasons.total }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useConstructor } from '@/stores/Constructors/constructor'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'

const store = useConstructor()
const isDark = useDark()
</script>
