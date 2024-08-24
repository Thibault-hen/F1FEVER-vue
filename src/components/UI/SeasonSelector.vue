<template>
  <div class="relative flex">
    <Listbox v-model="selectedSeason" as="div">
      <ListboxButton
        class="bg-white dark:bg-dark-2 dark:text-white p-2 rounded-lg w-52 shadow border dark:border-slate-100/[0.20] text-left flex justify-between dark:ui-open:border-primary ui-open:border-primary"
      >
        {{ selectedSeason.year }}
        <slot name="loader"></slot>
        <box-icon
          name="chevron-down"
          class="flex ui-open:hidden"
          :color="isDark ? 'white' : 'black'"
        />
        <box-icon
          name="chevron-up"
          class="hidden ui-open:flex"
          :color="isDark ? 'white' : 'black'"
        />
      </ListboxButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 min-w-52 shadow items-center dark:text-white rounded-lg border border-slate-50/[0.06] py-1 bg-white dark:bg-dark-2 max-h-60 overflow-auto mt-2"
        >
          <ListboxOption
            v-for="season in seasons"
            :key="season.year"
            :value="season"
            @click="emitSeason(true)"
            class="py-1 ui-active:bg-primary ui-active:bg-opacity-10 ui-active:text-primary ui-not-active:bg-white ui-not-active:dark:bg-dark-2 ui-not-active:text-black ui-not-active:dark:text-white text-center"
          >
            {{ season.year }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import { useSeasonsStore } from '@/stores/seasons'

const store = useSeasonsStore()
const seasons = computed(() => store.seasons)

const isDark = useDark()
const selectedSeason = ref({})

const emit = defineEmits(['update:modelValue'])

const props = defineProps(['updatedSeason'])

const manualUpdate = ref(false) // Add a flag for manual updates

const getSeasons = async () => {
  await store.fetchSeasons()

  const foundSeason = props.updatedSeason
    ? seasons.value.find((season) => season.year === props.updatedSeason)
    : seasons.value[0]
  manualUpdate.value = false // Disable manual update flag during initialization
  selectedSeason.value = foundSeason || seasons.value[0]
  manualUpdate.value = true // Re-enable manual update flag after initialization
}

const emitSeason = (isManual = false) => {
  if (manualUpdate.value && isManual) {
    emit('update:modelValue', selectedSeason.value)
  }
}

onMounted(async () => {
  await getSeasons()
  if (!props.updatedSeason) {
    emitSeason(true) // Only emit on mount if updatedSeason is not provided
  }
})
</script>
