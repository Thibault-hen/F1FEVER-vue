<template>
  <div class="flex flex-col">
    <span
      class="border-primary border-l-4 dark:text-white font-bold text-xs dark:font-thin px-2 py-1 uppercase tracking-wide"
    >
      {{ store.standings.season }} Season Grand Prix List
    </span>
    <div
      class="relative mt-2 p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-1 border dark:border-slate-50/[0.06] rounded-lg"
    >
      <div
        v-if="store.isLoading"
        class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      >
        <CarLoader />
      </div>
      <div class="overflow-x-auto">
        <table
          class="dark:text-white min-w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm"
        >
          <thead class="dark:bg-dark-1">
            <tr class="text-left border-b tracking-wide text-sm md:text-base">
              <th class="px-2 py-2 uppercase text-sm min-w-64 rounded-l-lg">
                {{ $t('home.current_grandprix.name') }}
              </th>
              <th class="px-2 text-sm uppercase">
                {{ $t('home.current_grandprix.location') }}
              </th>
              <th class="px-2 text-sm uppercase">
                {{ $t('home.current_grandprix.time') }}
              </th>
              <th class="px-2 text-sm uppercase rounded-r-lg">
                {{ $t('home.current_grandprix.date') }}
              </th>
            </tr>
          </thead>
          <tbody class="dark:bg-dark-1 rounded-lg">
            <tr
              v-for="(grandPrix, index) in store.standings.schedule"
              :key="index"
              class="hover:bg-primary/20 hover:dark:bg-primary/20 odd:bg-zinc-100 dark:odd:bg-dark-2 transition-all ease-in-out duration-100"
            >
              <td class="rounded-l-lg px-4 py-4">
                <div class="flex">
                  <CountryFlag :country="grandPrix.country" class="mr-2" />
                  <RouterLink
                    :to="`/grand-prix/${grandPrix.year}/${grandPrix.slug}`"
                    class="font-bold hover:text-primary transition-transform duration-100 text-nowrap"
                  >
                    {{ grandPrix.name }}
                  </RouterLink>
                </div>
              </td>
              <td class="px-2 text-nowrap">{{ grandPrix.location }}</td>
              <td class="px-2 text-nowrap">{{ grandPrix.time ?? 'N/A' }}</td>
              <td class="px-2 text-nowrap rounded-r-lg">{{ grandPrix.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import { useStandingsStore } from '@/stores/standings'

const store = useStandingsStore()
</script>
