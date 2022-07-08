import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import axios from 'axios'

function CheckLogin(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    let req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    axios.post('http://localhost:3000/validate', {}, req)
      .then(() => {
        next()
      })
      .catch(() => {
        next('/login')
      })
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: CheckLogin
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
