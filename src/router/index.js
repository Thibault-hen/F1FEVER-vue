import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StandingsView from '../views/StandingsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import GrandPrixView from '@/views/GrandPrixView.vue'
import { checkSeason } from '@/services/seasonService'
import { checkGrandPrix } from '@/services/grandPrixService'

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
          const isSeasonValid = await checkSeason(season)
          if (isSeasonValid) {
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
      path: '/grand-prix/:season?/:name?',
      name: 'Grand-prix',
      component: GrandPrixView,
      beforeEnter: async (to, from, next) => {
        const season = to.params.season
        const name = to.params.name
        if (season && name) {
          const isGrandPrixValid = await checkGrandPrix(season, name)
          if (isGrandPrixValid) {
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
      meta: { title: 'F1FEVER - Grand Prix' }
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
    }
  ],
  scrollBehavior: function (to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 500)
    }
  }
})

export default router
