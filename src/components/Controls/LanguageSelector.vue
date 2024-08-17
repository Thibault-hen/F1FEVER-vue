<template>
  <div class="relative">
    <Listbox v-model="selectedLanguage">
      <!-- ListboxButton -->
      <ListboxButton
        class="flex items-center bg-white dark:bg-dark-2 p-2 rounded shadow border border-slate-50/[0.06] mb-2"
      >
        <img :src="flagSrc" width="24px" class="rounded-sm" />
        <span class="tracking-wide px-1 hidden lg:flex font-bold text-xs dark:text-white">
          {{ selectedLanguage.text }}</span
        >
        <box-icon name="chevron-down" :color="isDark ? 'white' : 'black'"></box-icon>
      </ListboxButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <!-- ListboxOptions -->
        <ListboxOptions
          class="bg-white dark:bg-dark-2 absolute w-full shadow items-center flex flex-col rounded py-2"
        >
          <ListboxOption
            v-for="language in languages"
            :key="language.code"
            :value="language"
            class="flex"
          >
            <img
              :src="language.flag"
              width="36px"
              class="p-1 rounded-lg flex items-center cursor-pointer"
            />
            <span
              class="tracking-wide hidden lg:flex items-center font-bold text-xs dark:text-white"
            >
              {{ language.text }}</span
            >
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, watch, computed, watchEffect, onMounted } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// Import the flag images
import gbFlag from '../../assets/flags/4x3/gb.svg'
import frFlag from '../../assets/flags/4x3/fr.svg'

const isDark = useDark() // Reactive variable for dark mode
const { locale } = useI18n()

// List of available languages with their flags
const languages = ref([
  { code: 'en', flag: gbFlag, text: 'English' },
  { code: 'fr', flag: frFlag, text: 'Français' }
])

const selectedLanguage = ref(
  JSON.parse(localStorage.getItem('selectedLanguage')) || languages.value[0]
)

const flagSrc = computed(() => {
  return selectedLanguage.value.flag
})

// Watch for changes to the selectedLanguage and update locale
watch(selectedLanguage, (newLanguage) => {
  locale.value = newLanguage.code
})

watchEffect(() => {
  localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage.value))
})

onMounted(() => {
  const storedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'))
  if (storedLanguage) {
    selectedLanguage.value = storedLanguage
  }
})
</script>
