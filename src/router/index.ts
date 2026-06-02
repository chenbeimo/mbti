import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../pages/LandingPage.vue'),
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../pages/QuizPage.vue'),
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../pages/LoadingPage.vue'),
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../pages/ResultPage.vue'),
    },
  ],
})

export default router
