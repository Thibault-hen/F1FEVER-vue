<template>
  <div class="relative flex">
    <Listbox v-model="selectedSeason" as="div" class="w-full">
      <ListboxButton
        class="bg-white dark:bg-dark-2 dark:text-white p-2 w-full rounded-lg sm:w-64 shadow border dark:border-slate-100/[0.20] text-left flex justify-between dark:ui-open:border-primary ui-open:border-primary"
      >
        {{ selectedSeason.season ?? 'something went wrong' }}
        <LoaderSmall v-if="store.isLoading" class="ml-auto" />
        <Icon
          icon="solar:alt-arrow-down-outline"
          height="24px"
          width="24px"
          class="flex ui-open:hidden"
          :color="isDark ? 'white' : 'black'"
        />
        <Icon
          icon="solar:alt-arrow-up-outline"
          height="24px"
          width="24px"
          class="hidden ui-open:flex"
          :color="isDark ? 'white' : 'black'"
        />
      </ListboxButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 sm:min-w-64 w-full shadow items-center dark:text-white rounded-lg border border-slate-50/[0.06] py-1 bg-white dark:bg-dark-2 max-h-60 overflow-auto mt-2"
        >
          <ListboxOption
            v-for="season in seasons"
            :key="season.season"
            :value="season"
            @click="emitSeason()"
            class="py-1 ui-active:bg-primary ui-active:bg-opacity-10 ui-active:text-primary ui-not-active:bg-white ui-not-active:dark:bg-dark-2 ui-not-active:text-black ui-not-active:dark:text-white text-center"
          >
            {{ season.season }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import { useAnalysisSeasons } from '@/stores/Analysis/seasons'
import LoaderSmall from '../../Loader/LoaderSmall.vue'

const store = useAnalysisSeasons()
const seasons = computed(() => store.seasons)

const isDark = useDark()
const selectedSeason = ref({})

const emit = defineEmits(['update:modelValue'])

const getSeasons = async () => {
  await store.fetchSeasons()
  selectedSeason.value = seasons.value[0]
}

const emitSeason = () => {
  emit('update:modelValue', selectedSeason.value)
}

onMounted(async () => {
  await getSeasons()
  // Emit update event only if no updatedSeason prop is provided initially
  emitSeason()
})
</script>
