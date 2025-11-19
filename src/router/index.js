import { createRouter, createWebHistory } from 'vue-router'

// 1. Importar o Layout do Template (PetClinic)
import LayoutDefault from '@/layouts/layoutDefault.vue'

// 2. Importar as suas Views (Telas)
import Login from '@/Login.vue'
import Board from '@/components/Board.vue'
// Se quiser manter as telas de tutores do template:
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
    // Rota Pai: Carrega o Layout (Menu Lateral + Navbar)
    path: '/',
    component: LayoutDefault,
    meta: { requiresAuth: true },
    children: [
      {
        // Rota Filha: O Kanban aparece DENTRO do layout
        path: '',
        name: 'Board',
        component: Board
      },
      // Rotas do PetClinic (Opcional, se quiser manter para consulta)
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