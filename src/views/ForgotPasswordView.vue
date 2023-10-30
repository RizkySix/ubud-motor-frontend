<template>
<section class="bg-gray-50 dark:bg-gray-900">
<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    <img class="w-32 h-auto" src="@/assets/logo.svg" alt="logo"> 
    </a>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <img v-if="waitingResponse" class="h-8 w-8 mx-auto mt-4 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                Password baru akan dikirim untuk anda
            </h1>
            <form @submit.prevent="handleResetPassword" class="space-y-4 md:space-y-6" action="#">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email terdaftar</label>
                    <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-start">
                    
                    </div>
                    <button v-if="resendStatus == false" @submit.prevent="handleResetPassword" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"><i class="fa-solid fa-share" style="color: #81d41c;"></i> Send reset password </button> 
                    <button v-else @submit.prevent="handleResetPassword" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"><i class="fa-solid fa-share" style="color: #81d41c;"></i> Resend reset password</button>
                </div>
            </form>
        </div>
        </div>
    </div>

</section>
</template>

<script setup>
import { ref } from 'vue';
import {http , url } from '@/helper/domain';
import toaster from '@/helper/toaster';

const email = ref('')
const waitingResponse = ref(false)
const resendStatus = ref(false)

const handleResetPassword = async() => {
    try {
        const response = await http().post('/admin/reset/password' , {email: email.value})
        resendStatus.value = true
        toaster('Reset konfirmasi terkirim' , true)
    } catch (error) {
        console.log(error.response)

        if(error.response.status == 429){
            toaster('Coba 1 menit lagi' , false)
        }else{
            toaster('Email tidak ditemukan' , false)
        }
    }
}
</script>
