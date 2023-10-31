<template>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
    <a class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <img class="w-14 h-14 mr-2" src="@/assets/logo.png" alt="logo">
          Lavista    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <img v-if="waitingResponse" class="h-8 w-8 mx-auto mt-4 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">  
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Daftar Sebagai Admin
              </h1>
              <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input v-model="credential.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                      <ErrorMessage v-if="errorBag.email">{{ errorBag.email }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                      <input v-model="credential.full_name" type="text" name="full_name" id="full_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nengah Subagia" required="">
                      <ErrorMessage v-if="errorBag.full_name">{{ errorBag.full_name }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No WhatsApp</label>
                      <input v-model="credential.phone_number" type="tel" name="phone_number" id="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="087XXXXX" required="">
                      <ErrorMessage v-if="errorBag.phone_number">{{ errorBag.phone_number }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="credential.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                      <ErrorMessage v-if="errorBag.password">{{ errorBag.password }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konfirmasi Password</label>
                      <input v-model="credential.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <button @submit.prevent="handleRegister" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Sudah terdaftar? <router-link :to="{name: 'admin.login'}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</router-link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication'
import toaster from '@/helper/toaster';
import ErrorMessage from '@/components/Form/ErrorMessage.vue';

const credential = reactive({
    email: '',
    full_name: '',
    phone_number: '',
    password: '',
    password_confirmation: ''
})

const router = useRouter()
const authentication = useAuthenticationStore()

const errorBag = ref({})
const waitingResponse = ref(false)

const handleRegister = async() => {
    waitingResponse.value = true
    const response = await authentication.registerAction('/admin/register' , credential);
    waitingResponse.value = false
   if(response === true){
       router.push({
        name: 'admin.verify'
       })
   }else{
        let errors = ''
        console.log(response)
        if(response.validation_errors){
                errors = response.validation_errors
                Object.keys(errors).forEach(key => {
                errorBag.value[key] =  errors[key][0]
            })
        }
        toaster('Invalid data' , false)
   }
}
</script>