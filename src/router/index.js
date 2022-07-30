import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import PerfilView from '../views/PerfilView.vue'
import axios from 'axios'

function CheckLogin(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    const req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    axios.post('https://clonebookapi.herokuapp.com/validate',{}, req)
      .then(async (res) => {
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('user_name', res.data.user_name)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('email', res.data.email)
        next()
      })
      .catch((err) => {
        console.log(err)
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
    path: '/perfil',
    name: 'perfil',
    component: PerfilView,
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
