<script setup>
import GrandPrixPreview from '@/components/Home/GrandPrixPreview.vue'
import GrandPrixList from '@/components/Home/CurrentSeasonGrandPrixList.vue'
import Welcome from '@/components/Home/WelcomeMessage.vue'
</script>

<template>
  <div class="animate-slideLeft">
    <Welcome />

    <div class="xl:flex mt-6">
      <div class="flex-none xl:w-1/3 mb-6 xl:order-2">
        <GrandPrixPreview />
      </div>
      <div class="flex-grow xl:order-1">
        <GrandPrixList />
      </div>
    </div>
  </div>
</template>
