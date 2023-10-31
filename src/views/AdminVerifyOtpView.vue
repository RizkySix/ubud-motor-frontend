<template>
    <div class="h-screen px-3 flex items-center justify-center">
    <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
            <div class="w-full">
                <a href="#" class="flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-20 h-auto" src="@/assets/logo.png" alt="logo"> 
                </a>
                <div class="bg-white rounded shadow dark:border h-64 py-3 text-center">
                    <img v-if="waitingResponse" class="h-8 w-8 mx-auto my-2 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
                      <h1 class="text-2xl font-bold">Verifikasi OTP</h1>
                      <div class="flex flex-col mt-4">
                          <span>Masukan 6 digit kode otp yang kamu terima pada email</span>
                          <span class="font-bold">{{ email }}</span>
                      </div>
                      
                      <form action="#" @submit.prevent="handleVerifyOtp">
                        <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" required /> 
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" required /> 
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" required /> 
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" required />
                        <input  class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" required /> 
                        <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" required />
                      </div>
                      <button type="submit" class="w-1/2 mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @submit.prevent="handleVerifyOtp">Send</button>
                      </form>
                      
                      <form class="flex justify-center text-center mt-5" action="#" @submit.prevent="handleResendOtp">
                         <div>
                            <button @submit.prevent="handleResendOtp" class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></button>
                         </div>
                      </form>

                      <form class="flex justify-center text-center mt-5" action="#" @submit.prevent="handleLogout">
                         <div>
                            <button @submit.prevent="handleLogout" class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Sign Out</span><i class='bx bx-caret-right ml-1'></i></button>
                         </div>
                      </form>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication'
import { otpSlider } from '@/helper/otp-slider.js'
import {http , url } from '@/helper/domain';
import toaster from '@/helper/toaster';

const router = useRouter()
const authentication = useAuthenticationStore()

const waitingResponse = ref(false)

const handleResendOtp = async() => {
    try {
        waitingResponse.value = true
        const response = await http().post('/otp/resend')
     
        waitingResponse.value = false
        toaster('Kode otp baru terkirim' , true)
    } catch (error) {
      
        waitingResponse.value = false
        if(error.response.status == 429){
            toaster('Coba 1 menit lagi' , false)
        }else{
            toaster('Permintaan tidak sah' , false)
        }

      
    }
}

const handleVerifyOtp = async() => {
    try {
        waitingResponse.value = true
        const otpCode = document.getElementById('first').value + 
                        document.getElementById('second').value + 
                        document.getElementById('third').value + 
                        document.getElementById('fourth').value + 
                        document.getElementById('fifth').value + 
                        document.getElementById('sixth').value

        const response = await http().post('/otp/send' , {otp_code: otpCode})

        waitingResponse.value = false
        router.push({
            name: 'admin.booking'
        })
    } catch (error) {
        waitingResponse.value = false
        toaster('Kode otp invalid' , false)
    }
}

const handleLogout = async () => {
    const response = await authentication.logoutAction('/admin/logout')

    if(response){
        router.push({
            name: 'home'
        })
    }

    toaster('Gagal Logout' , false)
}

onMounted(() => {
    otpSlider()
})
</script>