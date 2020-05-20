import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import("../views/Login/index")

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
