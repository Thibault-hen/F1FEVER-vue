<script setup>
import Navbar from '@/components/layouts/navbar.vue'
import LanguageSelector from '@/components/Controls/LanguageSelector.vue'
</script>

<template>
  <div class="relative border-t border-solid !border-[2px] gradient-bar"></div>
  <div class="lg:flex h-screen">
    <Navbar />
    <main class="lg:flex-1 p-8 overflow-y-auto">
      <LanguageSelector />
      <router-view></router-view>
    </main>
  </div>
</template>
