import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/Login.vue'
import Board from '@/components/Board.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: () => import('/src/layouts/layoutDefault.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Board',
        component: Board
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!sessionStorage.getItem('loggedInUser')

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
