import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/index/home-vue.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    mate: {
      isShow: true,
      title: '首页'
    }
  },
  {
    path: '/demo',
    name: 'applycenter',
    redirect: '/demo/index',
    children: [
      {
        path: 'index',
        name: 'demo-index',
        component: () => import('@/views/demo/demo-vue.vue'),
      },
    ]
  },
  {
    path: '/:path(.*)',
    component: () => import('@/views/not-found/not-found.vue')
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router