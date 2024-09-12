import { createRouter, createWebHistory } from 'vue-router'
import { checkSeason } from '@/services/seasonService'
import { checkGrandPrix } from '@/services/grandPrixService'
import HomeView from '../views/HomeView.vue'
import StandingsView from '../views/StandingsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import GrandPrixView from '@/views/GrandPrixView.vue'
import RecordsView from '@/views/RecordsView.vue'
import DriversView from '@/views/Drivers/DriversView.vue'
import ConstructorsView from '@/views/Constructors/ConstructorsView.vue'
import CircuitsView from '@/views/Circuits/CircuitsView.vue'

async function validateSeason(to, from, next) {
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
}

async function validateGrandPrix(to, from, next) {
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
}

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
      beforeEnter: validateSeason,
      meta: { title: 'F1FEVER - Standings' }
    },
    {
      path: '/grand-prix/:season?/:name?',
      name: 'Grand-prix',
      component: GrandPrixView,
      beforeEnter: validateGrandPrix,
      meta: { title: 'F1FEVER - Grand Prix' }
    },
    {
      path: '/drivers/:season?',
      name: 'Drivers',
      beforeEnter: validateSeason,
      component: DriversView
    },
    {
      path: '/constructors/:season?',
      name: 'Constructors',
      beforeEnter: validateSeason,
      component: ConstructorsView
    },
    {
      path: '/circuits/:season?',
      name: 'Circuits',
      component: CircuitsView
    },
    {
      path: '/records',
      name: 'Records',
      component: RecordsView
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
  ]
})

export default router
