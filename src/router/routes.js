
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

  // 投诉录入
  {
    path: '/complaintEntry',
    name: 'complaintEntry',
    redirect: '/complaintEntry/index',
    children: [
      {
        path: 'index',
        name: 'complaintEntry-index',
        component: () => import('@/views/complaint-entry/complaint-entry-list.vue'),
      },
      {
        path: 'form',
        name: 'complaintEntry-form',
        component: () => import('@/views/complaint-entry/complaint-entry-form.vue'),
      },
    ],
  },

  // // 投诉录入表单
  // {
  //   path: '/complaintEntryForm',
  //   name: 'complaintEntryForm',
  //   redirect: '/complaintEntry',
  //   children: [
  //     {
  //       path: 'form',
  //       name: 'form',
  //       component: () => import('@/views/complaint-entry/complaint-entry-form.vue'),
  //     },
  //   ]
  // },

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
    path: '/statistical-center',
    name: 'statistical-center',
    component: () => import('@/views/statistical-center/statistical-center.vue'),
  },
  // 投诉查询
  {
    path: '/complaint-inquiry',
    name: 'complaint-inquiry',
    redirect: '/complaint-inquiry/index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/complaint-inquiry/complaint-inquiry.vue')
    },
    {
      path: 'form-handle',
      name: 'form-handle',
      component: () => import('@/views/complaint-inquiry/components/form-handle-area.vue'),
    },
    {
      path: 'form-handle-branch',
      name: 'form-handle-branch',
      component: () => import('@/views/complaint-inquiry/components/form-handle-branch.vue'),
    },
    {
      path: 'complaint-type-area',
      name: 'complaint-type-area',
      component: () => import('@/views/complaint-inquiry/components/complaint-type-area.vue'),
    }]
  },
  // 后台管理
  {
    path: '/manage-page',
    name: 'manage-page',
    component: () => import('@/views/manage-page/manage-page.vue'),
  },
  {
    path: '/:path(.*)',
    component: () => import('@/views/not-found/not-found.vue')
  }
];
export default routes;