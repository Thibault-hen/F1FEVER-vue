<template>
  <div class="flex justify-end">
    <div class="relative">
      <Listbox v-model="selectedLanguage">
        <!-- ListboxButton -->
        <ListboxButton
          class="flex items-center bg-white dark:bg-dark-2 p-2 rounded shadow-md border border-slate-50/[0.06]"
        >
          <img :src="flagSrc" width="24px" class="rounded-sm" />
          <box-icon class="ml-2" name="chevron-down" :color="isDark ? 'white' : 'black'"></box-icon>
        </ListboxButton>

        <!-- ListboxOptions -->
        <ListboxOptions
          class="bg-white dark:bg-dark-2 absolute w-full shadow items-center flex flex-col"
        >
          <ListboxOption v-for="language in languages" :key="language.code" :value="language">
            <img
              :src="language.flag"
              width="36px"
              class="p-1 rounded-lg flex items-center cursor-pointer"
            />
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
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
  { code: 'en', flag: gbFlag },
  { code: 'fr', flag: frFlag }
])

const selectedLanguage = ref(
  JSON.parse(localStorage.getItem('selectedLanguage')) || languages.value[0]
)
console.log(selectedLanguage)

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
