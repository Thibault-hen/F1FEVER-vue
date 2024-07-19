<script setup>
import Navbar from '@/components/layouts/navbar.vue'
import LanguageSelector from '@/components/Controls/LanguageSelector.vue'
import NextGrandPrix from '@/components/UI/NextGrandPrix.vue'
</script>

<template>
  <div class="flex h-screen">
    <Navbar />
    <main class="flex-grow lg:ml-64 p-8 overflow-y-auto mt-16 lg:mt-0">
      <NextGrandPrix />

      <LanguageSelector />
      <div class="container mx-auto py-12">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
