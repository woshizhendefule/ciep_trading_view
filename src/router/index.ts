import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', redirect: '/homeView'
  },
  {
    path: '/homeView', name: 'homeView', component: () => import('../views/User/HomeView.vue')
  },
  {
    path: '/searchView', name: 'searchView', component: () => import('../views/User/SearchView.vue')
  },
  {
    path: '/userLogin', name: 'userLogin', component: () => import('../views/User/UserLogin.vue')
  },
  {
    path: '/userRegistered', name: 'userRegistered', component: () => import('../views/User/UserRegistered.vue')
  },
  {
    path: '/userRetrievePassword', name: 'userRetrievePassword', component: () => import('../views/User/UserRetrievePassword.vue')
  },


  {
    path: '/adminLogin', name: 'adminLogin', component: () => import('../views/Admin/AdminLogin.vue')
  },
  {
    path: '/adminView', name: 'adminView', component: () => import('../views/Admin/AdminView.vue'),
    children: [
      { path: '', name: 'userList', component: () => import('../components/UserList.vue') },
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
