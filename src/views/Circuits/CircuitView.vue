<template>
  <div v-if="store.isLoading" class="flex justify-center items-center mt-36"><CarLoader /></div>
  <div v-else>
    <div v-if="store.circuitData != null">
      <button
        @click="router.go(-1)"
        class="bg-primary/20 border border-transparent hover:border-primary p-1 px-4 rounded-md my-2 transition-all duration-150 hover:scale-105"
      >
        <Icon
          icon="tabler:arrow-back-up"
          height="24px"
          width="24px"
          :color="isDark ? 'white' : 'black'"
        />
      </button>
      <CircuitInformation class="my-6" />
      <CircuitCareerStats class="my-6" />
      <CircuitRaceEntered class="my-6" />
      <CircuitRaceList class="my-6" />
    </div>
  </div>
</template>

<script setup>
import { useCircuit } from '@/stores/Circuits/circuit'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import CircuitInformation from '@/components/Pages/circuits/circuit/CircuitInformation.vue'
import CircuitCareerStats from '@/components/Pages/circuits/circuit/CircuitCareerStats.vue'
import CircuitRaceEntered from '@/components/Pages/circuits/circuit/CircuitRaceEntered.vue'
import CircuitRaceList from '@/components/Pages/circuits/circuit/CircuitRaceList.vue'

const store = useCircuit()
const isDark = useDark()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const name = route.params.name
  await store.fetchCircuit(name)
})
</script>
