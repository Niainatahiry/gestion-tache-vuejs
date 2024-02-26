import { createRouter, createWebHistory } from 'vue-router';
import InscriptionView from '../views/InscriptionView.vue';
import ConnexionView from '../views/ConnexionView.vue';
import TaskListView from '@/views/tasks/TaskListView.vue';
import CreateTaskView from '@/views/tasks/CreateTaskView.vue';
import EditTaskView from '@/views/tasks/EditTaskView.vue';
import store from '@/stores/connexion'; // Assurez-vous d'importer votre store Vuex

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
      component: TaskListView,
      meta: { requiresAuth: true } // Indique que cette route nécessite une authentification
    },
    {
      path: '/creerTache',
      name: 'creerTache',
      component: CreateTaskView,
      meta: { requiresAuth: true } // Indique que cette route nécessite une authentification
    },
    {
      path: '/editTask',
      name: 'editTask',
      component: EditTaskView,
      meta: { requiresAuth: true } // Indique que cette route nécessite une authentification
    }
  ]
});

// Gardien de route pour vérifier l'authentification
router.beforeEach((to, from, next) => {
  // Vérifiez si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    if (!store.state.auth.isLoggedIn) {
      next({
        name: 'connexion',
        // Vous pouvez passer des paramètres supplémentaires si nécessaire
      });
    } else {
      next(); // Si l'utilisateur est authentifié, continuez la navigation
    }
  } else {
    next(); // Si la route n'a pas besoin d'authentification, continuez la navigation
  }
});

export default router;
