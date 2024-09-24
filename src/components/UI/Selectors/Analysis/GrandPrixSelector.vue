<template>
  <div class="relative flex">
    <Listbox v-model="selectedGrandPrix" as="div" class="w-full">
      <ListboxButton
        class="bg-white dark:bg-dark-2 dark:text-white p-2 rounded-lg w-full sm:w-64 shadow border dark:border-slate-100/[0.20] text-left flex justify-between dark:ui-open:border-primary ui-open:border-primary"
      >
        <span class="truncate">{{ selectedGrandPrix.name ?? 'Loading grand prix...' }}</span>
        <slot name="loader"></slot> <LoaderSmall v-if="store.isLoading" class="ml-auto" />
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
            v-for="gpList in grandPrix"
            :key="gpList.slug"
            :value="gpList"
            @click="emitGrandPrix()"
            class="px-2 flex py-1 ui-active:bg-primary ui-active:bg-opacity-10 ui-active:text-primary ui-not-active:bg-white ui-not-active:dark:bg-dark-2 ui-not-active:text-black ui-not-active:dark:text-white text-center"
          >
            {{ gpList.name }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import { useAnalysisGrandPrix } from '@/stores/Analysis/grandPrix'
import LoaderSmall from '../../Loader/LoaderSmall.vue'

const store = useAnalysisGrandPrix()
const grandPrix = computed(() => store.grandPrix)

const isDark = useDark()
const selectedGrandPrix = ref({})

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['selectedSeason'])

const getGrandPrix = async (season) => {
  await store.fetchGrandPrix(season)
  selectedGrandPrix.value = grandPrix.value[0]
}

const emitGrandPrix = () => {
  emit('update:modelValue', selectedGrandPrix.value)
}

watch(
  () => props.selectedSeason,
  async () => {
    if (props.selectedSeason && props.selectedSeason.season) {
      await getGrandPrix(props.selectedSeason.season)
      emitGrandPrix()
    }
  }
)
</script>
