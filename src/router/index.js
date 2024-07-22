import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StandingsView from '../views/StandingsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { checkSeason } from '@/services/seasonService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { title: 'F1FEVER - Homepage' }
    },
    {
      path: '/standings/:season?',
      name: 'Standings',
      component: StandingsView,
      beforeEnter: async (to, from, next) => {
        const season = to.params.season

        if (season) {
          const isValidSeason = await checkSeason(season)
          if (isValidSeason) {
            next()
          } else {
            next({
              name: 'NotFound',
              params: { pathMatch: to.path.substring(1).split('/') },
              query: to.hash,
              hash: to.hash
            })
          }
        } else {
          next()
        }
      },
      meta: { title: 'F1FEVER - Standings' }
    },
    {
      path: '/grand-prix/:year?/:slug?',
      name: 'Grand-prix'
    },
    {
      path: '/drivers',
      name: 'Drivers'
    },
    {
      path: '/constructors',
      name: 'Constructors'
    },
    {
      path: '/circuits',
      name: 'Circuits'
    },
    {
      path: '/records',
      name: 'Records'
    },
    {
      path: '/analysis',
      name: 'Analysis'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    },
    {
      path: '/standings/:pathMatch(.*)*',
      name: 'StandingsNotFound',
      component: NotFoundView
    }
  ]
})

export default router
