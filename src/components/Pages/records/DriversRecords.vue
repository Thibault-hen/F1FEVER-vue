<template>
  <div class="mt-2 overflow-x-auto">
    <table
      class="dark:text-white min-w-full leading-normal border-separate border-spacing-y-0.5 text-xs md:text-sm mt-2"
    >
      <thead class="dark:bg-dark-1 bg-white-2">
        <tr class="text-left border-b tracking-wide text-sm md:text-base">
          <!-- Fixed width for the Record column -->
          <th class="px-2 py-4 w-[40%] min-w-[250px] rounded-l-lg">
            <span class="border-l-4 px-2 border-primary uppercase text-sm">Drivers records</span>
          </th>
          <!-- Fixed width for the Name column -->
          <th class="px-2 py-4 w-[40%] min-w-[200px]">
            <span class="border-l-4 px-2 border-primary uppercase text-sm">Name</span>
          </th>
          <!-- Small width for the icon column -->
          <th class="px-2 py-4 w-[20%] min-w-[80px]">
            <box-icon type="solid" name="award" color="red" class=""></box-icon>
          </th>
        </tr>
      </thead>
      <tbody class="dark:bg-dark-1 bg-white">
        <tr
          class="hover:bg-primary/10 max-w-[700px] dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
        >
          <td class="px-4 py-4 rounded-l-lg">Most wins</td>
          <td class="px-2 text-nowrap">
            <div class="flex">
              <NationalityFlag
                class="mr-2"
                :nationality="store.driversRecords.wins_record.nationality"
              />{{ store.driversRecords.wins_record.name }}
            </div>
          </td>
          <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
            {{ store.driversRecords.wins_record.total }} wins
          </td>
        </tr>

        <tr
          class="hover:bg-primary/10 dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
        >
          <td class="px-4 py-4 rounded-l-lg">Hightest win percentage</td>
          <td class="px-2 text-nowrap">
            <div class="flex">
              <NationalityFlag
                class="mr-2"
                :nationality="store.driversRecords.wins_percentage.nationality"
              />{{ store.driversRecords.wins_percentage.name }}
            </div>
          </td>
          <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
            {{ store.driversRecords.wins_percentage.total }} %
          </td>
        </tr>

        <tr
          class="hover:bg-primary/10 dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
        >
          <td class="px-4 py-4 rounded-l-lg">Most podiums</td>
          <td class="px-2 text-nowrap">
            <div class="flex">
              <NationalityFlag
                class="mr-2"
                :nationality="store.driversRecords.podiums_record.nationality"
              />{{ store.driversRecords.podiums_record.name }}
            </div>
          </td>
          <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
            {{ store.driversRecords.podiums_record.total }} podiums
          </td>
        </tr>

        <tr
          class="hover:bg-primary/10 dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
        >
          <td class="px-4 py-4 rounded-l-lg">Most poles position</td>
          <td class="px-2 text-nowrap">
            <div class="flex">
              <NationalityFlag
                class="mr-2"
                :nationality="store.driversRecords.poles_record.nationality"
              />{{ store.driversRecords.poles_record.name }}
            </div>
          </td>
          <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
            {{ store.driversRecords.poles_record.total }} poles position
          </td>
        </tr>

        <tr
          class="hover:bg-primary/10 dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
        >
          <td class="px-4 py-4 rounded-l-lg">Most laps driven</td>
          <td class="px-2 text-nowrap">
            <div class="flex">
              <NationalityFlag
                class="mr-2"
                :nationality="store.driversRecords.laps_record.nationality"
              />{{ store.driversRecords.laps_record.name }}
            </div>
          </td>
          <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
            {{ store.driversRecords.laps_record.total }} laps
          </td>
        </tr>

        <tr
          class="hover:bg-primary/10 dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
        >
          <td class="px-4 py-4 rounded-l-lg">Most points earned</td>
          <td class="px-2 text-nowrap">
            <div class="flex">
              <NationalityFlag
                class="mr-2"
                :nationality="store.driversRecords.points_record.nationality"
              />{{ store.driversRecords.points_record.name }}
            </div>
          </td>
          <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
            {{ store.driversRecords.points_record.total }} points
          </td>
        </tr>

        <tr
          class="hover:bg-primary/10 dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
        >
          <td class="px-4 py-4 rounded-l-lg">Most sprints wins</td>
          <td class="px-2 text-nowrap">
            <div class="flex">
              <NationalityFlag
                class="mr-2"
                :nationality="store.driversRecords.sprint_record.nationality"
              />{{ store.driversRecords.sprint_record.name }}
            </div>
          </td>
          <td class="px-2 rounded-r-lg border-b border-transparent text-nowrap">
            {{ store.driversRecords.sprint_record.total }} sprint wins
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRecordsStore } from '@/stores/records'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'

const store = useRecordsStore()
</script>
