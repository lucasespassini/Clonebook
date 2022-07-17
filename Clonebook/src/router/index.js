import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import axios from 'axios'

function CheckLogin(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    const req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    axios.get('http://localhost:3000/user', req)
      .then(async (res) => {
        const user = await JSON.parse(res.request.response)[0]
        localStorage.setItem('id', user.id)
        localStorage.setItem('user_name', user.user_name)
        localStorage.setItem('name', user.name)
        localStorage.setItem('email', user.email)
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
