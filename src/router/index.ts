import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', name: 'login', component: () => import('../views/Login.vue')
  },

  {
    path: '/adminView', name: 'adminView', component: () => import('../views/AdminView.vue'),
    children: [
      { path: 'userList', name: 'userList', component: () => import('../components/UserList.vue') },
      { path: 'goodsList', name: 'goodsList', component: () => import('../components/GoodsList.vue') },
      { path: 'messageList', name: 'messageList', component: () => import('../components/MessageList.vue') },
      { path: 'evaluationList', name: 'evaluationList', component: () => import('../components/EvaluationList.vue') },
      { path: 'goodsOrderList', name: 'goodsOrderList', component: () => import('../components/GoodsOrderList.vue') },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
