/*
 * @Author: new-wang
 * @Date: 2023-07-07 13:53:58
 * @LastEditors: new-wang
 * @LastEditTime: 2023-07-31 16:31:26
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/three',
      name:'three',
      component:() => import('../views/three/index.vue')
    },
    {
      path:'/geometry',
      name:'geometry',
      component:() => import('../views/three/geometry.vue')
    },
    {
      path:'/level',
      name:'level',
      component:() => import('../views/three/level.vue')
    },
    {
      path:'/texture',
      name:'texture',
      component:() => import('../views/three/texture.vue')
    },
    {
      path:'/gltf',
      name:'gltf',
      component:() => import('../views/three/gltf.vue')
    }
  ]
})

export default router
