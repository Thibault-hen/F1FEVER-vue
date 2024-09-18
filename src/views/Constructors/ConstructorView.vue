<template>
  <div v-if="store.isLoading" class="flex justify-center items-center mt-36"><CarLoader /></div>
  <div v-else>
    <div v-if="store.constructorData != null">
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
      <ConstructorInformation />
      <ConstructorCareerStats class="my-6" />
      <ConstructorRaceEntered class="my-6" />
      <ConstructorActiveSeasons />
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import CarLoader from '@/components/UI/Loader/CarLoader.vue'
import { useConstructor } from '@/stores/Constructors/constructor'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'
import ConstructorInformation from '@/components/Pages/constructors/constructor/ConstructorInformation.vue'
import ConstructorCareerStats from '@/components/Pages/constructors/constructor/ConstructorCareerStats.vue'
import ConstructorRaceEntered from '@/components/Pages/constructors/constructor/ConstructorRaceEntered.vue'
import ConstructorActiveSeasons from '@/components/Pages/constructors/constructor/ConstructorActiveSeasons.vue'

const store = useConstructor()
const route = useRoute()
const router = useRouter()
const isDark = useDark()

onMounted(async () => {
  const name = route.params.name
  console.log(name)
  await store.fetchConstructor(name)
  console.log(store.constructorData.constructor_info)
})
</script>
