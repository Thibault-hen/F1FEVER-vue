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
            v-for="season in seasonList"
            :key="season.year"
            :value="season"
            @click="emitSeason"
            class="ui-active:bg-primary ui-active:bg-opacity-10 ui-active:text-primary ui-not-active:bg-white ui-not-active:dark:bg-dark-2 ui-not-active:text-black ui-not-active:dark:text-white text-center"
          >
            {{ season.year }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import axios from 'axios'

const isDark = useDark()
const seasonList = ref([])
const selectedSeason = ref({})

const emit = defineEmits(['update:modelValue'])

const props = defineProps(['updatedSeason'])

const fetchSeasons = async () => {
  try {
    const response = await axios.get('http://f1fever.test/api/seasons')
    seasonList.value = response.data.data
    if (props.updatedSeason) {
      const foundSeason = seasonList.value.find((season) => season.year === props.updatedSeason)
      selectedSeason.value = foundSeason || seasonList.value[0]
    } else {
      selectedSeason.value = seasonList.value[0]
    }
  } catch (error) {
    console.error('Error while fetching seasons', error)
  }
}
const emitSeason = () => {
  emit('update:modelValue', selectedSeason.value)
}

onMounted(async () => {
  await fetchSeasons()
  emitSeason()
})
</script>
