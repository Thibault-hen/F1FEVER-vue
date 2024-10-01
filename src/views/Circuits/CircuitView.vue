<template>
  <div v-if="store.isLoading" class="flex justify-center items-center mt-36"><CarLoader /></div>
  <div v-else>
    <BreadCrumbs :links-data="breadCrumbLinks" />
    <div v-if="store.circuitData != null">
      <CircuitInformation class="my-6" />
      <CircuitCareerStats class="my-6" />
      <CircuitRaceEntered class="my-6" />
      <CircuitRaceList class="my-6" />
    </div>
  </div>
</template>

<script setup>
import { useCircuit } from '@/stores/Circuits/circuit'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import CircuitInformation from '@/components/Pages/circuits/circuit/CircuitInformation.vue'
import CircuitCareerStats from '@/components/Pages/circuits/circuit/CircuitCareerStats.vue'
import CircuitRaceEntered from '@/components/Pages/circuits/circuit/CircuitRaceEntered.vue'
import CircuitRaceList from '@/components/Pages/circuits/circuit/CircuitRaceList.vue'
import BreadCrumbs from '@/components/UI/Misc/BreadCrumbs.vue'

const store = useCircuit()
const route = useRoute()
const breadCrumbLinks = [
  {
    text: 'Circuits',
    route: 'Circuits'
  },
  {
    text: 'Circuit',
    route: 'Circuit'
  }
]

onMounted(async () => {
  const name = route.params.name
  await store.fetchCircuit(name)
})
</script>
