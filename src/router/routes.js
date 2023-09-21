
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
    path: '/complaintEntry',
    name: 'complaintEntry',
    component: () => import('@/views/complaint-entry/complaint-entry-list.vue'),
    mate: {
      isShow: true,
      title: '投诉录入'
    }
  },
  {
    path: '/demo',
    name: 'demo',
    redirect: '/demo/index',
    children: [
      {
        path: 'index',
        name: 'demo-index',
        component: () => import('@/views/demo/demo-vue.vue'),
      },
    ]
  },
  // 投诉要素
  {
    path: '/complaint-element',
    name: 'complaintElement',
    component: () => import('@/views/complaint-element/complaint-element.vue'),
  },
  // 投诉处理   
  {
    path: '/complaintHandling',
    name: 'complaintHandling',
    redirect: '/complaintHandling/list',
    children: [
      {
        path: 'list',
        name: 'complaintHandling-list',
        component: () => import('@/views/complaint-handling/complaint-handling-list.vue'),
      },
    ]
  },
  {
    path: '/:path(.*)',
    component: () => import('@/views/not-found/not-found.vue')
  }
];
export default routes;