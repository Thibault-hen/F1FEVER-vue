<template>
  <div class="relative flex">
    <Listbox v-model="selectedGrandPrix" as="div">
      <ListboxButton
        class="bg-white dark:bg-dark-2 dark:text-white p-2 rounded-lg w-52 shadow border dark:border-slate-100/[0.20] text-left flex justify-between dark:ui-open:border-primary ui-open:border-primary"
      >
        <span class="truncate">{{
          selectedGrandPrix ? selectedGrandPrix.name : 'Select Grand Prix'
        }}</span>

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
            v-for="gpName in grandPrixName"
            :key="gpName.slug"
            :value="gpName"
            @click="handleSelect(gpName)"
            class="flex flex-row py-1 ui-active:bg-primary ui-active:bg-opacity-10 ui-active:text-primary ui-not-active:bg-white ui-not-active:dark:bg-dark-2 ui-not-active:text-black ui-not-active:dark:text-white text-left px-2"
          >
            <CountryFlag class="mr-2 flex items-center" :country="gpName.country" />
            <span class="truncate">{{ gpName.name }}</span>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup>
import { debounce } from 'lodash'
import { ref, computed, onMounted, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import { useGrandPrixNameStore } from '@/stores/grand-prix-name'
import CountryFlag from './Flag/CountryFlag.vue'

const isDark = useDark()
const store = useGrandPrixNameStore()

const selectedGrandPrix = ref(null) // Default to null initially
const grandPrixName = computed(() => store.grandPrixName)

const props = defineProps(['selectedSeason', 'updatedGrandPrix'])
const emit = defineEmits(['update:modelValue'])

const handleSelect = (gpName) => {
  selectedGrandPrix.value = gpName
  emitGrandPrixName()
}

const emitGrandPrixName = () => {
  emit('update:modelValue', {
    selectedSeason: props.selectedSeason.year,
    selectedGrandPrix: selectedGrandPrix.value
  })
}

// Function to fetch Grand Prix names for a specific season
const fetchGrandPrixForSeason = async (season) => {
  await store.fetchGrandPrixName(season)
  const foundGrandPrix = grandPrixName.value.find((gp) => gp.name === props.updatedGrandPrix)
  selectedGrandPrix.value = foundGrandPrix || grandPrixName.value[0]
}

// Watch for changes in selectedSeason and fetch corresponding Grand Prix names
watch(
  () => props.selectedSeason.year,
  debounce(async (season) => {
    if (season) {
      console.log(`Fetching Grand Prix for season: ${season}`)
      await fetchGrandPrixForSeason(season)
    }
  }, 300),
  { immediate: true }
)

// Watch for changes in updatedGrandPrix and update selectedGrandPrix
watch(
  () => props.updatedGrandPrix,
  (grandPrix) => {
    if (grandPrix && grandPrixName.value.length) {
      const foundGrandPrix = grandPrixName.value.find((gp) => gp.name === grandPrix)
      selectedGrandPrix.value = foundGrandPrix || grandPrixName.value[0]
      console.log(`Updated Grand Prix: ${grandPrix}`)
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.selectedSeason.year) {
    fetchGrandPrixForSeason(props.selectedSeason.year)
  }
})
</script>
