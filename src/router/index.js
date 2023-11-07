import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue')
const AdminLoginView = () => import('@/views/AdminLoginView.vue')
const BookingView = () => import('@/views/BookingView.vue')
const RenewalView = () => import('@/views/RenewalView.vue')
const MakeCatalogView = () => import('@/views/MakeCatalogView.vue')
const MakeGalleryView = () => import('@/views/MakeGalleryView.vue')
const CatalogView = () => import('@/views/CatalogView.vue')
const AddPackageView = () => import('@/views/AddPackageView.vue')
const GalleriesView = () => import('@/views/GalleriesView.vue')
const CustomerCatalogView = () => import('@/views/CustomerCatalogView.vue')
const CustomerBookingView = () => import('@/views/CustomerBookingView.vue')
const CustomerRenewalView = () => import('@/views/CustomerRenewalView.vue')
const CustomerGalleryView = () => import('@/views/CustomerGalleryView.vue')
const AboutUsView = () => import('@/views/AboutUsView.vue')
const AdminRegisterView = () => import('@/views/AdminRegisterView.vue')
const AdminVerifyOtpView = () => import('@/views/AdminVerifyOtpView.vue')
const ForgotPasswordView = () => import('@/views/ForgotPasswordView.vue')
const ResetPasswordConfirmView = () => import('@/views/ResetPasswordConfirmView.vue')
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
    {
      path: '/admin/confirm/:email',
      name: 'admin.password.confirm',
      component: ResetPasswordConfirmView
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
