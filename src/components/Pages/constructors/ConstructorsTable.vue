<template>
  <div class="flex justify-between">
    <div class="relative max-w-sm">
      <!-- Icon aligned to the left -->
      <Icon
        icon="line-md:search-twotone"
        height="22px"
        width="22px"
        class="absolute left-3 top-1/2 transform -translate-y-1/2"
        :color="isDark ? 'white' : 'black'"
      />
      <!-- Input with padding to prevent overlap -->
      <input
        class="dark:text-white dark:bg-dark-1 bg-white w-full py-2 pl-12 pr-4 border dark:border-slate-50/[0.06] rounded-md shadow-sm focus:outline-none focus:border-primary dark:focus:border-primary"
        type="search"
        placeholder="Search"
        v-model="searchKey"
      />
    </div>
    <slot name="selector"></slot>
  </div>
  <div class="mt-6 overflow-x-auto">
    <table
      class="relative dark:text-white min-w-full leading-normal border-spacing-y-0.5 text-xs md:text-sm mt-2"
    >
      <div
        v-if="store.isLoading"
        class="absolute inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      >
        <CarLoader />
      </div>
      <thead class="dark:bg-dark-1 bg-white-2">
        <tr class="text-left tracking-wide text-sm md:text-base">
          <th class="px-2 py-4 rounded-l-lg"><span class="uppercase text-sm">Name</span></th>
          <th class="px-2 py-4 rounded-r-lg">
            <span class="uppercase text-sm">Wikipedia link</span>
          </th>
        </tr>
      </thead>

      <tbody class="dark:bg-dark-1 bg-white">
        <tr
          class="hover:bg-primary/10 dark:hover:bg-primary/10 transition-all ease-in-out duration-100 odd:bg-zinc-100 dark:odd:bg-dark-2"
          v-for="(constructor, index) in filteredData"
          :key="constructor.name"
        >
          <template v-if="inRange(index)">
            <td class="px-4 py-4 rounded-l-lg">
              <div class="flex">
                <NationalityFlag :nationality="constructor.nationality" class="mr-2" />
                <RouterLink :to="`/constructor/${constructor.slug}`">
                  {{ constructor.name }}
                </RouterLink>
              </div>
            </td>
            <td class="px-4 py-4 rounded-r-lg">
              <a
                target="_blank"
                :href="constructor.wikipedia_link"
                class="tracking-wider text-primary"
                >{{ constructor.wikipedia_link }}</a
              >
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <div v-if="filteredData.length === 0" class="my-12 flex flex-col justify-center items-center">
      <Icon icon="ic:twotone-error" height="32px" wdith="32px" color="red" />
      <span class="dark:text-white text-base">No matching records found</span>
    </div>
  </div>
  <div class="mt-2 flex flex-row justify-between items-center">
    <span class="dark:text-white bg-primary/20 px-2 rounded border border-primary text-sm">
      <template v-if="totalConstructors === '0'">NO CONSTRUCTORS FOUND</template>
      <template v-else-if="totalConstructors === '1'">
        {{ totalConstructors }} CONSTRUCTORS
      </template>
      <template v-else> {{ totalConstructors }} CONSTRUCTORS </template>
    </span>
    <ul class="flex" v-if="pages >= 1">
      <button
        :disabled="currentPage === 1"
        @click="prevPage()"
        class="flex select-none dark:bg-dark-2 bg-zinc-100 rounded px-2 py-1 dark:text-white mx-1 hover:text-primary dark:hover:text-primary cursor-pointer dark:hover:bg-primary/20 hover:bg-primary/20 border border-transparent hover:border-primary active:scale-75 transition-all ease-in duration-150"
      >
        <Icon
          icon="material-symbols:navigate-before"
          height="26px"
          wdith="26px"
          :color="isDark ? 'white' : 'black'"
        />
      </button>
      <li v-for="page in visiblePages" :key="page" class="flex">
        <button
          class="select-none dark:bg-dark-2 bg-zinc-100 rounded px-4 py-1 dark:text-white mx-1 hover:text-primary dark:hover:text-primary cursor-pointer dark:hover:bg-primary/20 hover:bg-primary/20 border border-transparent hover:border-primary active:scale-75 transition-all ease-in duration-150"
          :class="{
            '!bg-primary/20 !border-primary': page === currentPage
          }"
          @click="setPage(page)"
        >
          {{ page }}
        </button>
      </li>
      <button
        :disabled="currentPage === Math.max(pages)"
        @click="nextPage()"
        class="select-none flex dark:bg-dark-2 bg-zinc-100 rounded px-2 py-1 dark:text-white mx-1 hover:text-primary dark:hover:text-primary cursor-pointer dark:hover:bg-primary/20 hover:bg-primary/20 border border-transparent hover:border-primary active:scale-75 transition-all ease-in duration-150"
      >
        <Icon
          icon="material-symbols:navigate-next"
          height="26px"
          wdith="26px"
          :color="isDark ? 'white' : 'black'"
        />
      </button>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useConstructors } from '@/stores/Constructors/constructors'
import { Icon } from '@iconify/vue'
import { useDark } from '@vueuse/core'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import NationalityFlag from '@/components/UI/Flag/NationalityFlag.vue'

const store = useConstructors()

const isDark = useDark()

const searchKey = ref()

const currentPage = ref(1)
const startRange = ref(0)
const endRange = ref(0)
const perPages = ref(10)

const totalConstructors = computed(() => filteredData.value.length.toString())

const pages = computed(() => Math.ceil(filteredData.value.length / perPages.value))

const filteredData = computed(() => {
  if (!searchKey.value) return store.constructorsData
  return store.constructorsData.filter((constructors) =>
    constructors.name.toLowerCase().includes(searchKey.value.toLowerCase())
  )
})

const setPage = (page) => {
  if (page === '...') return
  currentPage.value = page
}

const nextPage = () => {
  currentPage.value += 1
}

const prevPage = () => {
  currentPage.value -= 1
}
const inRange = (index) => {
  return index >= startRange.value && index < endRange.value
}

const visiblePages = computed(() => {
  const lastPage = pages.value
  if (lastPage <= 4) {
    // If there are 4 or fewer pages, show them all
    return Array.from({ length: lastPage }, (_, i) => i + 1)
  } else if (currentPage.value <= 2) {
    // Show the first 3 pages and the last page
    return [1, 2, 3, '...', lastPage]
  } else if (currentPage.value >= lastPage - 1) {
    // Show the first page and the last 3 pages
    return [1, '...', lastPage - 2, lastPage - 1, lastPage]
  } else {
    // Show the first page, current page, the one before and after it, and the last page
    return [
      1,
      '...',
      currentPage.value - 1,
      currentPage.value,
      currentPage.value + 1,
      '...',
      lastPage
    ]
  }
})

watch(
  currentPage,
  () => {
    startRange.value = (currentPage.value - 1) * perPages.value
    endRange.value = currentPage.value * perPages.value
  },
  { immediate: true }
)

watch(
  searchKey,
  () => {
    currentPage.value = 1
  },
  { immediate: true }
)
</script>
