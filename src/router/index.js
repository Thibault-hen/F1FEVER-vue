import { createRouter, createWebHistory } from 'vue-router'
import { checkSeason } from '@/services/seasonService'
import { checkGrandPrix } from '@/services/grandPrixService'
import { checkConstructor } from '@/services/constructorService'
import { checkDriver } from '@/services/driverService'
import { checkCircuit } from '@/services/circuitService'
import HomeView from '../views/HomeView.vue'
import StandingsView from '../views/StandingsView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import GrandPrixView from '@/views/GrandPrixView.vue'
import RecordsView from '@/views/RecordsView.vue'
import DriversView from '@/views/Drivers/DriversView.vue'
import DriverView from '@/views/Drivers/DriverView.vue'
import ConstructorsView from '@/views/Constructors/ConstructorsView.vue'
import ConstructorView from '@/views/Constructors/ConstructorView.vue'
import CircuitsView from '@/views/Circuits/CircuitsView.vue'
import CircuitView from '@/views/Circuits/CircuitView.vue'
import AnalysisView from '@/views/Analysis/AnalysisView.vue'
import RaceReportView from '@/views/Analysis/RaceReportView.vue'
import LapTimesView from '@/views/Analysis/LapTimesView.vue'

function redirectToNotFound(to, next) {
  next({
    name: 'NotFound',
    params: { pathMatch: to.path.substring(1).split('/') },
    query: to.query,
    hash: to.hash
  })
}

async function validateSeason(to, from, next) {
  const season = to.params.season

  if (season) {
    const isSeasonValid = await checkSeason(season)
    isSeasonValid ? next() : redirectToNotFound(to, next)
  } else {
    next()
  }
}

async function validateGrandPrix(to, from, next) {
  const season = to.params.season
  const name = to.params.name

  if (season && name) {
    const isGrandPrixValid = await checkGrandPrix(season, name)
    isGrandPrixValid ? next() : redirectToNotFound(to, next)
  } else {
    next()
  }
}

async function validateDriver(to, from, next) {
  const name = to.params.name

  if (name) {
    const isDriverValid = await checkDriver(name)
    isDriverValid ? next() : redirectToNotFound(to, next)
  } else {
    next()
  }
}

async function validateConstructor(to, from, next) {
  const name = to.params.name

  if (name) {
    const isConstructorValid = await checkConstructor(name)
    isConstructorValid ? next() : redirectToNotFound(to, next)
  } else {
    next()
  }
}

async function validateCircuit(to, from, next) {
  const name = to.params.name

  if (name) {
    const isConstructorValid = await checkCircuit(name)
    isConstructorValid ? next() : redirectToNotFound(to, next)
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
      path: '/driver/:name',
      name: 'Driver',
      beforeEnter: validateDriver,
      component: DriverView
    },
    {
      path: '/constructors/:season?',
      name: 'Constructors',
      beforeEnter: validateSeason,
      component: ConstructorsView
    },
    {
      path: '/constructor/:name',
      name: 'Constructor',
      beforeEnter: validateConstructor,
      component: ConstructorView
    },
    {
      path: '/circuits/:season?',
      name: 'Circuits',
      component: CircuitsView
    },
    {
      path: '/circuit/:name',
      name: 'Circuit',
      beforeEnter: validateCircuit,
      component: CircuitView
    },
    {
      path: '/records',
      name: 'Records',
      component: RecordsView
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: AnalysisView
    },
    {
      path: '/analysis/race-report',
      name: 'RaceReport',
      component: RaceReportView
    },
    {
      path: '/analysis/lap-times',
      name: 'LapTimes',
      component: LapTimesView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
