<template>
  <div class="flex items-center mt-2">
    <button
      @click="openModal"
      class="flex items-center dark:bg-primary/20 bg-primary/60 hover:bg-primary text-white font-medium text-xs py-2 px-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
      Missing Data
      <Icon icon="bi:database-fill-exclamation" height="18px" wdith="18px" class="ml-2" />
    </button>
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
import { Icon } from '@iconify/vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import DefaultButton from '@/components/UI/Misc/DefaultButton.vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>
