<template>
  <h1
    v-if="store.grandPrixData.circuit"
    class="flex items-center border-primary border-l-4 dark:text-white font-bold text-xs dark:font-thin px-2 py-1 uppercase tracking-wide"
  >
    <span class="mr-1">more </span
    ><CountryFlag :country="store.grandPrixData.circuit.country" class="mr-1" />{{
      props.grandPrixName
    }}
  </h1>
  <div
    class="relative mt-2 p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-1 border dark:border-slate-50/[0.06] rounded-lg"
  >
    <div
      v-if="store.isLoading"
      class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
    >
      <CarLoader />
    </div>
    <div class="mt-6 overflow-x-auto">
      <table
        class="dark:text-white min-w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm mt-2"
      >
        <thead class="dark:bg-dark-1">
          <tr class="text-left border-b tracking-wide text-sm md:text-base">
            <th class="px-2 py-2 text-sm uppercase min-w-24 rounded-l-lg">Season</th>
            <th class="px-2 py-2 text-sm uppercase min-w-64">Winner</th>
            <th class="px-2 py-2 text-sm uppercase min-w-64">Second</th>
            <th class="px-2 py-2 text-sm uppercase min-w-64">Third</th>
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
            v-for="(grandPrix, index) in store.grandPrixDataList"
            :key="index"
            class="hover:bg-primary/20 hover:dark:bg-primary/30 odd:bg-zinc-100 dark:odd:bg-dark-2 transition-all ease-in-out duration-100"
          >
            <td class="rounded-l-lg px-4 py-4">
              <div class="flex">
                <RouterLink
                  :to="{
                    name: 'Grand-prix',
                    params: { season: grandPrix.season, name: grandPrix.slug }
                  }"
                  class="font-bold hover:text-primary dark:hover:text-red-400 transition-transform duration-100 text-nowrap"
                >
                  {{ grandPrix.season }}
                </RouterLink>
              </div>
            </td>
            <td class="px-2 text-nowrap">
              <div class="flex items-center">
                <Icon
                  icon="mdi:podium-first"
                  height="32px"
                  wdith="32px"
                  class="mr-2"
                  color="#d4af37"
                />
                <NationalityFlag
                  v-if="grandPrix.podium.winner"
                  class="mr-2"
                  :nationality="extractNationality(grandPrix.podium.winner)"
                />
                {{ grandPrix.podium.winner.replace(/\s*\(.*?\)\s*/g, '') }}
              </div>
            </td>
            <td class="px-2 text-nowrap">
              <div class="flex items-center">
                <Icon
                  icon="mdi:podium-second"
                  height="32px"
                  wdith="32px"
                  class="mr-2"
                  color="#c7d1da"
                />
                {{ grandPrix.podium.second }}
              </div>
            </td>
            <td class="px-2 text-nowrap">
              <div class="flex items-center">
                <Icon
                  icon="mdi:podium-third"
                  height="26px"
                  wdith="26px"
                  class="flex items-center mr-2"
                  color="#88540b"
                />
                {{ grandPrix.podium.third }}
              </div>
            </td>
            <td class="px-2 text-nowrap">{{ grandPrix.time ?? 'N/A' }}</td>
            <td class="px-2 text-nowrap rounded-r-lg">{{ grandPrix.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useGrandPrix } from '@/stores/grand-prix'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { Icon } from '@iconify/vue'

const props = defineProps(['grandPrixName'])
const store = useGrandPrix()

const extractNationality = (string) => {
  const nationalityMatch = string.match(/\((.*?)\)/)
  return nationalityMatch ? nationalityMatch[1] : ''
}
</script>
