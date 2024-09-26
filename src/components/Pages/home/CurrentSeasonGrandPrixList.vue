<template>
  <div
    class="relative p-2 flex flex-grow flex-col w-full bg-white dark:bg-dark-1 border dark:border-slate-50/[0.06] shadow rounded-lg"
  >
    <div
      class="absolute top-2 left-2 border-primary border-l-4 dark:text-white text-xs px-2 py-1 uppercase font-bold dark:font-thin tracking-widest"
    >
      {{ $t('home.current_grandprix.label') }}
    </div>
    <div>
      <div class="mt-6 overflow-x-auto">
        <table
          class="dark:text-white min-w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm mt-2"
        >
          <thead class="dark:bg-dark-1 bg-white-2">
            <tr class="text-left border-b tracking-wide text-sm md:text-base">
              <th class="px-2 py-4 min-w-64 rounded-l-lg">
                <span class="uppercase text-sm"> {{ $t('home.current_grandprix.name') }}</span>
              </th>
              <th class="px-2 py-4">
                <span class="uppercase text-sm"> {{ $t('home.current_grandprix.location') }}</span>
              </th>
              <th class="px-2 py-4">
                <span class="uppercase text-sm"> {{ $t('home.current_grandprix.time') }}</span>
              </th>
              <th class="px-2 py-4">
                <span class="uppercase text-sm"> {{ $t('home.current_grandprix.date') }}</span>
              </th>
              <th class="px-2 py-4 rounded-r-lg">
                <span class="uppercase text-sm"> {{ $t('home.current_grandprix.status') }}</span>
              </th>
            </tr>
          </thead>
          <tbody class="dark:bg-dark-1 bg-white">
            <tr
              v-for="(grandPrix, index) in store.grandPrixList"
              :key="index"
              class="hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
            >
              <td class="px-4 py-4 rounded-l-lg">
                <div class="flex">
                  <CountryFlag :country="grandPrix.country" class="mr-2" />
                  <RouterLink
                    :to="`/grand-prix/${grandPrix.year}/${grandPrix.slug}`"
                    class="font-bold hover:text-primary text-nowrap"
                  >
                    {{ grandPrix.name }}
                  </RouterLink>
                </div>
              </td>
              <td class="px-2 text-nowrap">{{ grandPrix.location }}</td>
              <td class="px-2 text-nowrap">{{ grandPrix.time.slice(0, 5) }}</td>
              <td class="px-2 text-nowrap">{{ grandPrix.date }}</td>
              <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
                <span
                  class="rounded-md py-1 px-2 text-white text-center items-center text-nowrap rounded-r-lg"
                  :class="store.isUpcoming[index] ? 'bg-blue-500' : 'bg-green-700'"
                >
                  {{
                    store.isUpcoming[index]
                      ? $t('home.current_grandprix.status_upcoming')
                      : $t('home.current_grandprix.status_completed')
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import CountryFlag from '@/components/UI/Flag/CountryFlag.vue'
import { useHomeData } from '@/stores/home'

const store = useHomeData()
</script>
