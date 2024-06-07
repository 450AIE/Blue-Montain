import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user.js'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      redirect:'home',
      component:()=>import  ('@/views/Layout/index.vue'),
      children:[
        {
          path:'home',
          component:()=>import  ('@/views/Home/index.vue')
        },
        {
          path:'rank',
          component:()=>import  ('@/views/Rank/index.vue')
        },
        {
          path:'myself',
          component:()=>import  ('@/views/Myself/index.vue')
        },
        {
          path:'sort',
          component:()=>import('@/views/Sort/index.vue')
        }
      ]
    },
    {
      path:'/login',
      component:()=>import  ('@/views/Login/index.vue')
    },
    {
      path:'/:catchAll(.*)',
      component:()=>import('@/views/404Page/index.vue')
    }
  ],
  scrollBehavior(){
    return {top:0,behavior:'smooth'}
  }
})
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.userInfo.token && to.path !== '/login') return '/login'
  else return true
})
