<template>
<section class="bg-gray-50">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10">
      <a class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <img class="w-14 h-14 mr-2" src="@/assets/logo.png" alt="logo">
          Lavista    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <img v-if="waitingResponse" class="h-8 w-8 mx-auto mt-4 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
          <div v-if="onLogin" class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Your Username</label>
                      <input v-model="credential.username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input v-model="credential.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " required="">
                  </div>
                  <button @submit.prevent="handleLogin" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                  <p @click="toggleView" class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>

          <div v-else class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign Up
              </h1>
              <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Your Username</label>
                      <input v-model="data.username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " placeholder="gordon666" required="">
                      <ErrorMessage v-if="errorBag.username">{{ errorBag.username }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 ">Your Full Name</label>
                      <input v-model="data.full_name" type="text" name="full_name" id="full_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " placeholder="Axel Rose" required="">
                      <ErrorMessage v-if="errorBag.full_name">{{ errorBag.full_name }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input v-model="data.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " required="">
                      <ErrorMessage v-if="errorBag.password">{{ errorBag.password }}</ErrorMessage>
                  </div>
                  <div>
                      <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 ">Password Confirmation</label>
                      <input v-model="data.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " required="">
                  </div>
                  <button @submit.prevent="handleRegister" type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
                  <p @click="toggleView" class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have account? <a class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
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

const props = defineProps({
    currentRoute: String
})

const onLogin = ref(true)
const credential = reactive({
    username: '',
    password: ''
})
const data = reactive({
    username: '',
    password: '',
    password_confirmation: '',
    full_name: '',
})

const router = useRouter()
const authentication = useAuthenticationStore()


const toggleView = () => {
    onLogin.value = !onLogin.value
}

const errorBag = ref({})
const waitingResponse = ref(false)

const handleRegister = async() => {
    waitingResponse.value = true
    const response = await authentication.registerAction('/customer/register' , data);
    waitingResponse.value = false
   if(response === true){
       navigation()
   }else{
        let errors = ''
        console.log(response)
        if(response.validation_errors){
                errors = response.validation_errors
                Object.keys(errors).forEach(key => {
                errorBag.value[key] =  errors[key][0]
            })
        }
        toaster('Some data invalid' , false)
   }
}

const handleLogin = async () => {
   waitingResponse.value = true
   const response = await authentication.loginAction('/customer/login' , credential);
   waitingResponse.value = false
   if(response === true){
      navigation()
   }else{
    toaster('Invalid Credential' , false)
   }
}

const navigation = () => {
    if(props.currentRoute !== 'home' && props.currentRoute !== 'booking'){
        router.push({
            name: localStorage.getItem('toPage') ?? 'home'
        })
    }else if(props.currentRoute === 'booking'){
        authentication.closeModalAfterAuth = true
    }else{
        router.push({
            name: 'booking'
        })
    }
       
}

</script>