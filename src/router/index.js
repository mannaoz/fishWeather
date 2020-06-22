import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/fishhome'
  },
  {
    path: '/fishhome',
    name: 'fishome',
    component: () => import('../views/FishHome')
  },
  {
    path: '/fishtodo',
    name: 'fishtodo',
    component: () => import('../views/FishTodo')
  },
  {
    path: '/fishnew',
    name: 'fishnew',
    component: () => import('../views/Fishnew')
  },
  {
    path: '/fishperson',
    name: 'fishperson',
    component: () => import('../views/Fishperson')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})


router.beforeEach((to, from, next) => {
  let isLogin = JSON.parse(window.sessionStorage.getItem('isLogin'))
  if(to.path.indexOf('fishperson')>0){
    if(isLogin){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router
