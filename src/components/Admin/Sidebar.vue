<template>

<nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <button @click="toggleSidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 hover:text-white rounded-lg sm:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="https://flowbite.com" class="flex ml-2 md:mr-24">
          <img  src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="FlowBite Logo" />
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
      </div>
      <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button @click="toggleModal" type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="the-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" :class="{ 'translate-x-0': sidebarActive, '-translate-x-full': !sidebarActive }">
   <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
         <li>
            <router-link :to="{name: 'admin.booking'}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
               <svg :class="{'text-gray-500': route.name !== 'admin.booking' , 'text-blue-600': route.name === 'admin.booking'}" class="w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"></path> <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"></path> 
               </svg>
               <span class="ml-3 group-hover:text-gray-900" :class="{'text-gray-500': route.name !== 'admin.booking' , 'text-blue-600': route.name === 'admin.booking'}">Booking</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'admin.renewal'}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
               <svg :class="{'text-gray-500': route.name !== 'admin.renewal' , 'text-blue-600': route.name === 'admin.renewal'}" class="w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"></path> <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"></path> 
               </svg>
               <span class="ml-3 group-hover:text-gray-900" :class="{'text-gray-500': route.name !== 'admin.renewal' , 'text-blue-600': route.name === 'admin.renewal'}">Renewal</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'admin.make.catalog'}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
               <svg :class="{'text-gray-500': route.name !== 'admin.make.catalog' , 'text-blue-600': route.name === 'admin.make.catalog'}" class="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4 3h11.2A2.4 2.4 0 0 1 22 5.4v11.2a2.4 2.4 0 0 1-2.4 2.4H8.4A2.4 2.4 0 0 1 6 16.6V5.4A2.4 2.4 0 0 1 8.4 3ZM14 6a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3V7a1 1 0 0 1 1-1Z"></path><path d="M4 5a1 1 0 0 0-2 0v11.6C2 20.132 4.868 23 8.4 23H20a1 1 0 1 0 0-2H8.4A4.403 4.403 0 0 1 4 16.6V5Z"></path>
               </svg>
               <span class="ml-3 whitespace-nowrap group-hover:text-gray-900" :class="{'text-gray-500': route.name !== 'admin.make.catalog' , 'text-blue-600': route.name === 'admin.make.catalog'}">Buat Catalog</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'admin.make.gallery'}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
               <svg :class="{'text-gray-500': route.name !== 'admin.make.gallery' , 'text-blue-600': route.name === 'admin.make.gallery'}" class="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4 3h11.2A2.4 2.4 0 0 1 22 5.4v11.2a2.4 2.4 0 0 1-2.4 2.4H8.4A2.4 2.4 0 0 1 6 16.6V5.4A2.4 2.4 0 0 1 8.4 3ZM14 6a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3V7a1 1 0 0 1 1-1Z"></path><path d="M4 5a1 1 0 0 0-2 0v11.6C2 20.132 4.868 23 8.4 23H20a1 1 0 1 0 0-2H8.4A4.403 4.403 0 0 1 4 16.6V5Z"></path>
               </svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Buat Gallery</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'admin.catalogs'}"  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
               <svg :class="{'text-gray-500': route.name !== 'admin.catalogs' , 'text-blue-600': route.name === 'admin.catalogs'}" class="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span class="ml-3 flex-1 whitespace-nowrap group-hover:text-gray-900" :class="{'text-gray-500': route.name !== 'admin.catalogs' , 'text-blue-600': route.name === 'admin.catalogs'}">Catalog</span>
            </router-link>
         </li>
         <li>
            <router-link :to="{name: 'admin.galleries'}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
               <svg :class="{'text-gray-500': route.name !== 'admin.galleries' , 'text-blue-600': route.name === 'admin.galleries'}" class="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span class="ml-3 flex-1 whitespace-nowrap group-hover:text-gray-900" :class="{'text-gray-500': route.name !== 'admin.galleries' , 'text-blue-600': route.name === 'admin.galleries'}">Galleries</span>
            </router-link>
         </li>
      </ul>
   </div>
</aside>

<div class="p-4 sm:ml-64">
   <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
     <slot/>
   </div>
   </div>   

   <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <img v-if="waitingResponse" class="h-8 w-8 mx-auto mt-7 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">  
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Update Profile Anda
              </h1>
              <form @submit.prevent="handleUpdateProfile" class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input v-model="adminData.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" disabled>
                      <ErrorMessage v-if="errorBag.email">{{ errorBag.email }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                      <input v-model="adminData.full_name" type="text" name="full_name" id="full_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nengah Subagia" required="">
                      <ErrorMessage v-if="errorBag.full_name">{{ errorBag.full_name }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No WhatsApp</label>
                      <input v-model="adminData.phone_number" type="tel" name="phone_number" id="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="087XXXXX" required="">
                      <ErrorMessage v-if="errorBag.phone_number">{{ errorBag.phone_number }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="passwordPayload.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <ErrorMessage v-if="errorBag.password">{{ errorBag.password }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konfirmasi Password</label>
                      <input v-model="passwordPayload.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                  <button @submit.prevent="handleUpdateProfile" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
              </form>
          </div>
      </div>
   </BaseModal>
    
</template>

<script setup>
import { reactive, ref, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication'
import toaster from '@/helper/toaster';
import ErrorMessage from '@/components/Form/ErrorMessage.vue';
import {http , url } from '@/helper/domain';

const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)

const route = useRoute()
const authentication = useAuthenticationStore()

const sidebarActive = ref(false)
const modalActive = ref(false)
const adminData = ref(null)
const errorBag = ref([])
const waitingResponse = ref(false)

const passwordPayload = reactive({
   password: '',
   password_confirmation: '',
})

const toggleModal = async() => {
   if(modalActive.value == false){
      await handleFecthAdmin()
   }
   modalActive.value = !modalActive.value
}

const handleFecthAdmin = async() => {

   try {
      const response = await authentication.getUserAction()
      adminData.value = response
      
   } catch (error) {
      console.log(error.response)
   }
}

const handleUpdateProfile = async() => {
   try {
      waitingResponse.value = true

      let payload = {
         full_name: adminData.value.full_name,
         phone_number: adminData.value.phone_number,
      }

      if (passwordPayload.password) {
         payload.password = passwordPayload.password;
         payload.password_confirmation = passwordPayload.password_confirmation;
      }

      console.log(payload)
      const response = await http().put('/admin/profile' , payload)
      waitingResponse.value = false
      toggleModal()
      toaster('Success update profile' , true)
   } catch (error) {
      waitingResponse.value = false
      let errors = ''
        console.log(error.response)
        if(error.response.data.validation_errors){
                errors =error.response.data.validation_errors
                Object.keys(errors).forEach(key => {
                errorBag.value[key] =  errors[key][0]
            })
        }
        toaster('Invalid data' , false)
   }
}

const toggleSidebar = () => {
   sidebarActive.value = !sidebarActive.value
}

</script>