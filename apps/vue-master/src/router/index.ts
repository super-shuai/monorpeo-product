import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
export const Layout = () => import('@/layout/index.vue')
export const HomeRoute = {
  path: '/',
  name: 'Index',
  redirect: '',
  meta: {
    title: 'Index',
  },
  component: Layout,
  children: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        title: 'Home',
      },
      component: () => import('@/views/home/home.vue'),
    },
  ],
}


//Ordinary route  No authentication permission required
export const constantRouter: RouteRecordRaw[] = [ HomeRoute ]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router
