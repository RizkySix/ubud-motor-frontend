import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import MakeCatalogView from '@/views/MakeCatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin/login',
      name: 'admin.login',
      component: AdminLoginView
    },
    {
      path: '/admin/dashboard',
      name: 'admin.dashboard',
      component: DashboardView
    },
    {
      path: '/admin/catalog/make',
      name: 'admin.make.catalog',
      component: MakeCatalogView
    }
  ]
})

export default router
