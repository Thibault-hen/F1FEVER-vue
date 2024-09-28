<template>
  <TopBar />
  <div class="flex flex-col">
    <SideNav2>
      <template #content>
        <div class="flex flex-col h-screen">
          <PageHeader />
          <LanguageSelector />
          <div class="p-6 h-screen mt-40 md:mt-20">
            <router-view v-slot="{ Component }">
              <transition enter-active-class="animate-fadeInDown" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
            <DefaultFooter />
          </div></div></template
    ></SideNav2>
  </div>
</template>

<script setup>
import PageHeader from '@/components/layouts/PageHeader.vue'
import DefaultFooter from '@/components/layouts/DefaultFooter.vue'
import TopBar from './components/layouts/TopBar.vue'
import SideNav2 from './components/layouts/SideNav2.vue'
import LanguageSelector from './components/Controls/LanguageSelector.vue'
import { useTitle } from '@vueuse/core'

useTitle('F1FEVER')
</script>
