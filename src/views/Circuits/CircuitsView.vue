<template>
  <div>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <CircuitsHeader />
    <transition enter-active-class="animate-fadeInDown" mode="out-in">
      <div v-if="store.isLoading" class="flex justify-center">
        <CarLoader class="mt-16" />
      </div>
      <div v-else>
        <CircuitsTable> </CircuitsTable>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCircuits } from '@/stores/Circuits/circuits'
import CircuitsHeader from '@/components/Pages/circuits/CircuitsHeader.vue'
import CircuitsTable from '@/components/Pages/circuits/CircuitsTable.vue'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'

const store = useCircuits()
const breadCrumbLinks = [
  {
    text: 'Circuits',
    route: 'Circuits'
  }
]

onMounted(async () => {
  await store.fetchAllCircuits()
})
</script>
