<template>
  <div class="mt-8 mb-4">
    <span
      class="dark:bg-primary/20 bg-primary border border-primary rounded text-white dark:font-thin text-xs tracking-widest p-2 uppercase"
    >
      Entered Race
    </span>
  </div>
  <div class="flex flex-col gap-2 my-2 md:max-w-[500px]">
    <div
      v-if="store.constructorData.first_race_entered.length > 0"
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> First race entered </span>
      <RouterLink
        :to="`/grand-prix/${store.constructorData.first_race_entered[0].year}/${store.constructorData.first_race_entered[0].slug}`"
        class="hover:text-primary transition-all duration-150"
      >
        <span class="p-1 flex items-center">
          {{ store.constructorData.first_race_entered[0].year }}
          {{ store.constructorData.first_race_entered[0].name }}
          <CountryFlag
            :country="store.constructorData.first_race_entered[0].country"
            class="ml-2 items-center"
          />
        </span>
      </RouterLink>
    </div>

    <div
      v-if="store.constructorData.last_race_entered.length > 0"
      class="dark:text-white flex flex-col rounded border p-2 dark:border-slate-50/[0.06] border-l-4 border-l-primary dark:border-l-primary shadow items-start justify-between"
    >
      <span class="rounded-md uppercase text-xs p-1"> Last race entered </span>
      <RouterLink
        :to="`/grand-prix/${store.constructorData.last_race_entered[0].year}/${store.constructorData.last_race_entered[0].slug}`"
        class="hover:text-primary transition-all duration-150"
      >
        <span class="p-1 flex items-center">
          {{ store.constructorData.last_race_entered[0].year }}
          {{ store.constructorData.last_race_entered[0].name }}
          <CountryFlag
            :country="store.constructorData.last_race_entered[0].country"
            class="ml-2 items-center"
          />
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useConstructor } from '@/stores/Constructors/constructor'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'

const store = useConstructor()
</script>
