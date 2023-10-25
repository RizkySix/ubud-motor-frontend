import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import MakeCatalogView from '@/views/MakeCatalogView.vue'
import MakeGalleryView from '@/views/MakeGalleryView.vue'
import CatalogView from '@/views/CatalogView.vue'
import AddPackageView from '@/views/AddPackageView.vue'
import GalleriesView from '@/views/GalleriesView.vue'
import CustomerCatalogView from '@/views/CustomerCatalogView.vue'
import CustomerBookingView from '@/views/CustomerBookingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalogs',
      name: 'catalogs',
      component: CustomerCatalogView
    },
    {
      path: '/booking/:motor_name',
      name: 'booking',
      params: true,
      component: CustomerBookingView
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
    },
    {
      path: '/admin/catalog/:motor_name/package',
      name: 'admin.add.package',
      params: true,
      component: AddPackageView
    },
    {
      path: '/admin/gallery/make',
      name: 'admin.make.gallery',
      component: MakeGalleryView
    },
    {
      path: '/admin/catalogs',
      name: 'admin.catalogs',
      component: CatalogView
    },
    {
      path: '/admin/galleries',
      name: 'admin.galleries',
      component: GalleriesView
    },
  ]
})

export default router
