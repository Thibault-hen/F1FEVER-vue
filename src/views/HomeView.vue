<script setup>
import GrandPrixPreview from '@/components/Pages/home/GrandPrixPreview.vue'
import GrandPrixList from '@/components/Pages/home/CurrentSeasonGrandPrixList.vue'
import Welcome from '@/components/Pages/home/WelcomeMessage.vue'
import { useHomeData } from '@/stores/home'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { onMounted } from 'vue'

const store = useHomeData()

onMounted(() => {
  store.fetchHomepageData()
})
</script>

<template>
  <div>
    <Welcome />
    <transition enter-active-class="animate-fadeInDown" mode="out-in">
      <div v-if="store.isLoading" class="flex justify-center"><CarLoader class="mt-16" /></div>
      <div v-else class="xl:flex mt-6">
        <div class="flex-none xl:w-1/3 mb-6 xl:order-2">
          <GrandPrixPreview />
        </div>
        <div class="flex-grow xl:order-1">
          <GrandPrixList />
        </div>
      </div>
    </transition>
  </div>
</template>
