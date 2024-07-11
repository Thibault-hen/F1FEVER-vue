import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/standings/:season?',
      name: 'standings',
      component: AboutView
    },
    {
      path: '/grand-prix',
      name: 'grand-prix',
    },
    {
      path: '/drivers',
      name: 'drivers',
    },
    {
      path: '/constructors',
      name: 'constructors',
    },
    {
      path: '/circuits',
      name: 'circuits',
    },
    {
      path: '/records',
      name: 'records',
    },
    {
      path: '/analysis',
      name: 'analysis',
    },
  ]
})

export default router
