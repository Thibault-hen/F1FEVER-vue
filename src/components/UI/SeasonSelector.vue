<template>
  <div class="relative flex">
    <Listbox v-model="selectedSeason" as="div">
      <ListboxButton
        class="bg-white dark:bg-dark-2 dark:text-white p-2 rounded-lg w-52 shadow border dark:border-slate-100/[0.20] text-left flex justify-between dark:ui-open:border-primary ui-open:border-primary"
      >
        {{ selectedSeason.year ?? 'something went wrong' }}
        <slot name="loader"></slot>
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
import { onMounted, ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import { useSeasonsStore } from '@/stores/seasons'

const store = useSeasonsStore()
const seasons = computed(() => store.seasons)

const isDark = useDark()
const selectedSeason = ref({})
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['updatedSeason'])

const manualUpdate = ref(false)

const getSeasons = async () => {
  await store.fetchSeasons()
  const foundSeason = props.updatedSeason
    ? seasons.value.find((season) => season.year === props.updatedSeason)
    : seasons.value[0]

  selectedSeason.value = foundSeason || seasons.value[0]
  manualUpdate.value = true
}

const emitSeason = (isManual = false) => {
  if (manualUpdate.value && isManual) {
    emit('update:modelValue', selectedSeason.value)
  }
}

onMounted(async () => {
  await getSeasons()
  // Emit update event only if no updatedSeason prop is provided initially
  if (!props.updatedSeason) {
    emitSeason(true)
  }
})

// Watch for changes in updatedSeason prop
watch(
  () => props.updatedSeason,
  (newSeason) => {
    if (!manualUpdate.value) {
      const foundSeason = seasons.value.find((season) => season.year === newSeason)
      if (foundSeason) {
        selectedSeason.value = foundSeason
      }
    }
  },
  { immediate: true }
)
</script>
