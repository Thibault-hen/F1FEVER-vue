<template>
  <div class="flex flex-col h-screen">
    <TopBar />
    <Navbar />
    <PageHeader />
    <main class="flex-grow lg:ml-64 lg:px-20 lg:py-10 p-4 overflow-y-auto lg:mt-0">
      <router-view v-slot="{ Component }">
        <transition enter-active-class="animate-fadeIn" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <DefaultFooter />
    </main>
  </div>
</template>

<script setup>
import PageHeader from '@/components/layouts/PageHeader.vue'
import Navbar from '@/components/layouts/SideNav.vue'
import DefaultFooter from '@/components/layouts/DefaultFooter.vue'
import TopBar from './components/layouts/TopBar.vue'
</script>
