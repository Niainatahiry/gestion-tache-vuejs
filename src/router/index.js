import { createRouter, createWebHistory } from 'vue-router'
import InscriptionView from '../views/InscriptionView.vue'
import ConnexionView from '../views/ConnexionView.vue'
import TaskListView from '@/views/tasks/TaskListView.vue'
import CreateTaskView from '@/views/tasks/CreateTaskView.vue'
import EditTaskView from '@/views/tasks/EditTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'inscription',
      component: InscriptionView
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView
    },
    {
      path: '/taskList',
      name: 'taskList',
      component: TaskListView
    },
    {
      path: '/creerTache',
      name: 'creerTache',
      component: CreateTaskView
    },
    {
      path: '/editTask',
      name: 'editTask',
      component: EditTaskView
    }
  ]
})

export default router
