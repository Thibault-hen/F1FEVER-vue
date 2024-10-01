<template>
  <!-- Breadcrumb -->
  <div
    class="w-full md:w-auto inline-flex px-5 py-3 dark:text-white border dark:border-slate-50/[0.06] shadow rounded-lg"
    aria-label="Breadcrumb"
  >
    <ol class="flex items-center space-x-1 md:space-x-2">
      <li class="flex items-center gap-2">
        <Icon icon="fluent:home-48-regular" class="" />
        <RouterLink
          active-class="text-primary"
          :to="{ name: 'Home' }"
          class="flex items-center font-medium hover:text-primary text-xs uppercase tracking-wider"
        >
          Home
        </RouterLink>
      </li>
      <li v-for="link in props.linksData" :key="link">
        <div class="flex items-center">
          <Icon icon="iconamoon:arrow-right-2-bold" class="me-2.5" />
          <RouterLink
            active-class="text-primary"
            :to="{ name: link.route }"
            class="flex items-center font-medium hover:text-primary text-xs uppercase tracking-wider"
          >
            {{ link.text }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

const props = defineProps(['linksData'])
</script>
