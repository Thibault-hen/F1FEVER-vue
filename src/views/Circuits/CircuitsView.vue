<template>
  <div>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <CircuitsHeader />
    <CircuitsTable> </CircuitsTable>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCircuits } from '@/stores/Circuits/circuits'
import CircuitsHeader from '@/components/Pages/circuits/CircuitsHeader.vue'
import CircuitsTable from '@/components/Pages/circuits/CircuitsTable.vue'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'

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
