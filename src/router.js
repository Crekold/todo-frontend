import { createRouter, createWebHistory } from 'vue-router'
import Tasks from './components/Tasks.vue'
import Login from './components/Login.vue'

const routes = [
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
