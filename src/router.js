import { createRouter, createWebHistory } from 'vue-router'
import Tasks from './components/Tasks.vue'
import Login from './components/Login.vue'
import CreateTask from './components/CreateTask.vue'

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
  },
  {
    path: '/create-task',
    name: 'CreateTask',
    component: CreateTask
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
