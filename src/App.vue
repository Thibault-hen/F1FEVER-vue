<script setup>
import Navbar from '@/components/layouts/navbar.vue'
import LanguageSelector from '@/components/Controls/LanguageSelector.vue'
</script>

<template>
  <div class="flex h-screen">
    <Navbar />
    <main class="flex-grow lg:ml-64 p-8 overflow-y-auto mt-16 lg:mt-0">
      <LanguageSelector />
      <router-view></router-view>
    </main>
  </div>
</template>
