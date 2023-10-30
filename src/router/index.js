import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import BookingView from '@/views/BookingView.vue'
import RenewalView from '@/views/RenewalView.vue'
import MakeCatalogView from '@/views/MakeCatalogView.vue'
import MakeGalleryView from '@/views/MakeGalleryView.vue'
import CatalogView from '@/views/CatalogView.vue'
import AddPackageView from '@/views/AddPackageView.vue'
import GalleriesView from '@/views/GalleriesView.vue'
import CustomerCatalogView from '@/views/CustomerCatalogView.vue'
import CustomerBookingView from '@/views/CustomerBookingView.vue'
import CustomerRenewalView from '@/views/CustomerRenewalView.vue'
import CustomerGalleryView from '@/views/CustomerGalleryView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import AdminRegisterView from '@/views/AdminRegisterView.vue'
import AdminVerifyOtpView from '@/views/AdminVerifyOtpView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import { useAuthenticationStore } from '@/stores/authentication'

let verifiedAdminRoute = [
  'admin.booking',
  'admin.renewal',
  'admin.make.catalog',
  'admin.make.gallery',
  'admin.add.package',
  'admin.catalogs',
  'admin.galleries',
]

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
      path: '/booking',
      name: 'booking',
      component: CustomerBookingView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: CustomerGalleryView
    },
    {
      path: '/about-us',
      name: 'about.us',
      component: AboutUsView
    },
    {
      path: '/renewal/:motor_name/:id/:return_date',
      name: 'renewal',
      params: true,
      component: CustomerRenewalView
    },
    {
      path: '/admin/login',
      name: 'admin.login',
      component: AdminLoginView
    },
    {
      path: '/admin/register',
      name: 'admin.register',
      component: AdminRegisterView
    },
    {
      path: '/admin/forgot/password',
      name: 'admin.forgot.password',
      component: ForgotPasswordView
    },
    {
      path: '/admin/verify',
      name: 'admin.verify',
      component: AdminVerifyOtpView
    },
    {
      path: '/admin/booking',
      name: 'admin.booking',
      component: BookingView
    },
    {
      path: '/admin/renewal',
      name: 'admin.renewal',
      component: RenewalView
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

router.beforeEach(async (to , from) => {
  
  //ADMIN ROUTE
  if(localStorage.getItem('token')){
    const authentication = useAuthenticationStore()
    
    await checkVerify()
    if(to.name == 'admin.verify'){
       if(authentication.adminVerify){
          return {
            name: 'admin.booking'
          }
       }
    }

    if(verifiedAdminRoute.includes(to.name)){
      if(!authentication.adminVerify){
        return {
          name: 'admin.verify'
        }
     }
    }

    if(to.name == 'admin.login' || to.name == 'admin.register' || to.name == 'admin.forgot.password'){
        return {
          name: authentication.adminVerify ? 'admin.booking' : 'admin.verify'
        }
    }
  }

  if(!localStorage.getItem('token')){
      if(verifiedAdminRoute.includes(to.name) || to.name == 'admin.verify'){
        return {
          name: 'home'
        }
      }
  }


})


const checkVerify = async() => {
  const authentication = useAuthenticationStore()
    
  if(!authentication.adminVerify){
     const isVerified = await authentication.getUserAction()
     authentication.adminVerify = isVerified.email_verified_at ?? null
  }
}

export default router
