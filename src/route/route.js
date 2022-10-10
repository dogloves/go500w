import * as VueRouter from 'vue-router'
const routes = [
  { path: '/', redirect: { name: 'mobile_home' } },
  { path: '/mobile', name: 'mobile_home', component: import('@/mobile/home.vue') },
  { path: '/mobile/split', name: 'mobile_split', component: import('@/mobile/split.vue') },
  { path: '/mobile/tuijian', name: 'mobile_tuijian', component: import('@/mobile/tuijian.vue') },
]
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
export default router
