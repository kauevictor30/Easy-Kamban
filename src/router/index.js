import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/Login.vue'
import Board from '@/components/Board.vue'
import TutorsIndex from '@/views/tutors/index.vue'
import TutorsAdd from '@/views/tutors/add.vue'
import TutorsEdit from '@/views/tutors/edit.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: () => import('../layouts/layoutDefault.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Board',
        component: Board
      },
      {
        path: 'tutors',
        name: 'tutors.index',
        component: TutorsIndex
      },
      {
        path: 'tutors/add',
        name: 'tutors.add',
        component: TutorsAdd
      },
      {
        path: 'tutors/:id/edit',
        name: 'tutors.edit',
        component: TutorsEdit
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
    alert('Você precisa estar logado para ver o quadro.')
    next('/login')
  } else {
    next()
  }
})

export default router
