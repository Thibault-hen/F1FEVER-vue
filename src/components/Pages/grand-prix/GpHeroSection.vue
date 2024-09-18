<template>
  <section class="dark:bg-dark-1 bg-white py-8">
    <div>
      <div class="border-primary border-l-[5px] pl-5">
        <div class="flex items-center mb-2">
          <CountryFlag
            v-if="store.grandPrixData.circuit"
            :country="store.grandPrixData.circuit.country"
            class="mr-2"
          />
          <GradientTitle class="text-dark text-2xl md:text-3xl uppercase">
            {{ store.grandPrixData.season }}
            {{ store.grandPrixData.name }}
          </GradientTitle>
        </div>
        <p class="mb-4 text-body-color dark:text-white text-sm font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices lectus sem.
        </p>
        <DataMissingInfo />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import DataMissingInfo from '@/components/UI/Misc/DataMissingInfo.vue'
import GradientTitle from '@/components/UI/Misc/GradientTitle.vue'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'

const store = useGrandPrix()
</script>
