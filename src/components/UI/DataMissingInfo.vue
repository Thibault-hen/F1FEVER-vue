<template>
  <div class="flex items-center mt-2">
    <span
      @click="openModal"
      class="rounded-md bg-red-950 px-4 py-1 tracking-wider text-sm text-white hover:bg-red-500/70 flex items-center cursor-pointer"
    >
      Missing data
      <box-icon name="info-circle" class="items-center ml-2" color="white"></box-icon>
    </span>
  </div>

  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-100 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl dark:bg-dark-2 bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 dark:text-white">
                Missing data
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Based on the selected season, some data might be missing 🙁
                </p>
              </div>

              <div class="mt-4">
                <DefaultButton @click="closeModal">Got it</DefaultButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import DefaultButton from './DefaultButton.vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>
