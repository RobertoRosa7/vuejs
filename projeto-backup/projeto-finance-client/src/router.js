import Vue from 'vue'
import Router from 'vue-router'
import {
  AUTH_TOKEN
} from '@/plugins/apollo'
import AuthService from '@/modules/auth/services/auth-services.js'
import authRoutes from '@/modules/auth/router'
import dashboardRoutes from '@/modules/dashboard/router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    ...dashboardRoutes,
    {
      path: '',
      redirect: '/login'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // verificar se a rota precisa de autenticação
  if (to.matched.some(route => route.meta.requireAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const signinRoute = {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
    if (token) {
      // verificar se o token é válido ou expirado
      try {
        await AuthService.user({
          fetchPolicy: 'network-only'
        }) // verificar somente no servidor
        return next()
      } catch (err) {
        console.log('Error: no route de login: ', err.message)
        return next(signinRoute)
      }
    }
    return next(signinRoute)
  }
  next()
})
export default router
