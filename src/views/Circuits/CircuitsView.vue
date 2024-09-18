<template>
  <div>
    <CircuitsHeader />
    <CircuitsTable> </CircuitsTable>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCircuits } from '@/stores/Circuits/circuits'
import CircuitsHeader from '@/components/Pages/circuits/CircuitsHeader.vue'
import CircuitsTable from '@/components/Pages/circuits/CircuitsTable.vue'

const store = useCircuits()

onMounted(async () => {
  await store.fetchAllCircuits()
})
</script>
