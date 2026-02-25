import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // On redirige la racine directement vers notre module de tâches
      redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'tasks',
      // Analogie Java : C'est notre @GetMapping("/tasks")
      // Le chargement dynamique (Lazy Loading) optimise les performances
      component: () => import('@/features/tasks/views/TasksPage.vue'),
    },
    // On peut ajouter d'autres routes ici pour d'autres fonctionnalités/modules],
  ],
})

export default router
