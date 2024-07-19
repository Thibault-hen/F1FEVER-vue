<template>
  <div
    class="relative p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-2 border border-slate-50/[0.06] shadow rounded"
  >
    <div
      class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded px-2 py-1 uppercase tracking-wide"
    >
      {{ props.season }} Season Grand Prix List
    </div>
    <div
      v-if="props.isLoading"
      class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
    >
      <Loader />
    </div>
    <div class="mt-6 overflow-x-auto">
      <table
        class="dark:text-white min-w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm mt-2"
      >
        <thead class="bg-gray-100 dark:bg-dark-1">
          <tr class="text-left border-b tracking-wide text-sm md:text-base">
            <th class="px-2 py-2 font-bold min-w-64 rounded-l-lg">
              {{ $t('home.current_grandprix.name') }}
            </th>
            <th class="px-2 font-bold">
              {{ $t('home.current_grandprix.location') }}
            </th>
            <th class="px-2 font-bold">
              {{ $t('home.current_grandprix.time') }}
            </th>
            <th class="px-2 font-bold rounded-r-lg">{{ $t('home.current_grandprix.date') }}</th>
          </tr>
        </thead>
        <tbody class="dark:bg-dark-1 bg-gray-100 rounded-lg">
          <tr
            v-for="(grandPrix, index) in props.data"
            :key="index"
            class="hover:bg-red-500/20 hover:dark:bg-red-500/20 transition-all ease-in-out duration-100"
          >
            <td class="rounded-l-lg px-4 py-4">
              <div class="flex">
                <CountryFlag :country="grandPrix.country" class="mr-2" />
                <RouterLink
                  :to="`/grand-prix/${grandPrix.year}/${grandPrix.slug}`"
                  class="font-bold hover:text-red-500 transition-transform duration-100 text-nowrap"
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
</template>

<script setup>
import { defineProps } from 'vue'
import Loader from '../UI/Loader.vue'
import CountryFlag from '../UI/CountryFlag.vue'

const props = defineProps(['season', 'data', 'isLoading'])
</script>
