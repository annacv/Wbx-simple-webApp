import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Default from '../layouts/Default.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: Default },
    component: Home
  }
]

const router = createRouter ({
  history: createWebHistory(),
  routes
})

export default router
