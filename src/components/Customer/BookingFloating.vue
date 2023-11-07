<template>
 <div @click="toggleModal" class=" fixed w-14 md:w-16 -bottom-12 md:bottom-0 mb-10 md:mb-0 left-0 p-4 z-[52] cursor-pointer">
  <div v-if="booking.newBooking > 0" class="notif w-7 h-7 bg-red-500 text-white text-sm font-semibold rounded-full flex items-center justify-center absolute left-12 md:left-14 top-8">
    <!-- Isi badge (misalnya, angka notifikasi) -->
    {{ booking.newBooking }}
  </div>
    <a id="booking-auth" class="text-white py-2 px-4 rounded-full">

      <svg v-if="token" class="icon h-12 w-12 md:h-16 md:w-16 " viewBox="-102.4 -102.4 1228.80 1228.80" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-102.4" y="-102.4" width="1228.80" height="1228.80" rx="614.4" fill="#26515f" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M665.6 870.4c0 14.08-11.52 25.6-25.6 25.6H256c-14.08 0-25.6-11.52-25.6-25.6V281.6c0-14.08 11.52-25.6 25.6-25.6h384c14.08 0 25.6 11.52 25.6 25.6v588.8z" fill="#936e6c"></path><path d="M819.2 870.4c0 14.08-11.52 25.6-25.6 25.6H665.6V256h128c14.08 0 25.6 11.52 25.6 25.6v588.8z" fill="#bb7c81"></path><path d="M793.6 908.8H256c-21.76 0-38.4-16.64-38.4-38.4V281.6c0-21.76 16.64-38.4 38.4-38.4h537.6c21.76 0 38.4 16.64 38.4 38.4v588.8c0 21.76-16.64 38.4-38.4 38.4zM256 268.8c-7.68 0-12.8 5.12-12.8 12.8v588.8c0 7.68 5.12 12.8 12.8 12.8h537.6c7.68 0 12.8-5.12 12.8-12.8V281.6c0-7.68-5.12-12.8-12.8-12.8H256z" fill="#231C1C"></path><path d="M640 908.8H256c-21.76 0-38.4-16.64-38.4-38.4V281.6c0-21.76 16.64-38.4 38.4-38.4h384c21.76 0 38.4 16.64 38.4 38.4v588.8c0 21.76-16.64 38.4-38.4 38.4zM256 268.8c-7.68 0-12.8 5.12-12.8 12.8v588.8c0 7.68 5.12 12.8 12.8 12.8h384c7.68 0 12.8-5.12 12.8-12.8V281.6c0-7.68-5.12-12.8-12.8-12.8H256zM729.6 256h25.6v550.4h-25.6z" fill="#231C1C"></path><path d="M661.76 904.96l-17.92-17.92 99.84-99.84 85.76 99.84-20.48 17.92-67.84-79.36zM614.4 243.2h-25.6c0-71.68-57.6-129.28-128-129.28S332.8 171.52 332.8 243.2h-25.6c0-85.76 69.12-154.88 153.6-154.88S614.4 157.44 614.4 243.2z" fill="#231C1C"></path><path d="M742.4 243.2h-25.6c0-71.68-57.6-129.28-128-129.28S460.8 171.52 460.8 243.2h-25.6c0-85.76 69.12-154.88 153.6-154.88S742.4 157.44 742.4 243.2z" fill="#231C1C"></path></g></svg>

      <svg v-else class="h-12 w-12 md:h-16 md:w-16" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#0e30a0"></path> <path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#0e30a0"></path> <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#0e30a0"></path> </g></svg>
    </a>
  </div>
  

  <div v-if="token" @click="handleLogout" class=" rounded-full fixed w-10 md:w-10 -bottom-16 md:-bottom-5 mb-10 md:mb-0 left-9 md:left-14 p-4 z-[51] cursor-pointer">
    <a id="logout" class="text-white py-2 px-4 rounded-full">

      <svg class="h-6 w-6 md:h-8 md:w-8 " viewBox="-6.4 -6.4 76.80 76.80" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-6.4" y="-6.4" width="76.80" height="76.80" rx="38.4" fill="#700000" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path fill="#4796E7" d="M1,35.0023695 C1,32.7919219 2.78716697,30.7942228 4.96428975,30.5435455 L18,29.0425936 L31.0357102,30.5435455 C33.225127,30.7956384 35,32.7918218 35,35.0023695 L35,42 L1,42 L1,35.0023695 Z"></path> <path fill="#FFDD95" d="M12,24.3164468 C8.98979073,21.470456 7,16.8615543 7,13 C7,6.92486775 11.9248678,2 18,2 C24.0751322,2 29,6.92486775 29,13 C29,16.8615543 27.0102093,21.470456 24,24.3164468 L24,31 C24,31 19.9325778,32.4486507 18,32.4486507 C16.0674222,32.4486507 12,31 12,31 L12,24.3164468 Z"></path> <circle cx="9" cy="18" r="3" fill="#FFDD95"></circle> <circle cx="27" cy="18" r="3" fill="#FFDD95"></circle> <path fill="#BD7575" d="M29,49.0023695 C29,46.7919219 30.787167,44.7942228 32.9642898,44.5435455 L46,43.0425936 L59.0357102,44.5435455 C61.225127,44.7956384 63,46.7918218 63,49.0023695 L63,56 L29,56 L29,49.0023695 Z"></path> <path fill="#FFDD95" d="M40,38.3164468 C36.9897907,35.470456 35,30.8615543 35,27 C35,20.9248678 39.9248678,16 46,16 C52.0751322,16 57,20.9248678 57,27 C57,30.8615543 55.0102093,35.470456 52,38.3164468 L52,45 C52,45 47.9325778,46.4486507 46,46.4486507 C44.0674222,46.4486507 40,45 40,45 L40,38.3164468 Z"></path> <circle cx="37" cy="32" r="3" fill="#FFDD95"></circle> <circle cx="55" cy="32" r="3" fill="#FFDD95"></circle> <circle cx="15" cy="53" r="8" fill="#F5413E"></circle> <path stroke="#FFDD95" stroke-linecap="round" stroke-width="2" d="M12.007032 50.0268893L18 56M12.0169607 56.0099286L17.9900714 50.0169607"></path> </g> </g></svg>
    </a>

  </div>

  <BaseModal :modalActive="modalActive" :width="token ? 'max-w-3xl' : 'max-w-md'" @close-modal="toggleModal">
    <BookingHistory v-if="token" />
    <LoginRegis :currentRoute="route.name" v-else />
  </BaseModal>
</template>

<script setup>
import { ref , defineAsyncComponent, watch , onMounted } from 'vue';
import BookingHistory  from '@/components/Customer/BookingHistory.vue'
import LoginRegis  from '@/components/Customer/LoginRegis.vue'
import { useBookingStore } from '@/stores/booking';
import { useRoute } from 'vue-router';
import {logoutConfirmationCustomer } from '@/helper/confirmation';
import { useAuthenticationStore } from '@/stores/authentication';

const route = useRoute()
const booking = useBookingStore()
const authentication = useAuthenticationStore()

const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)

const token = ref(null)
const modalActive = ref(null)
const toggleModal = () => {
    token.value = localStorage.getItem('customer_token')
    modalActive.value = !modalActive.value
}

const handleLogout = async() => {
  
  if(await logoutConfirmationCustomer() == false){
    return false
  }

  try {
    const response = await authentication.logoutAction('/customer/logout')
    //console.log(response.data)
    token.value = localStorage.getItem('customer_token')
  } catch (error) {
    //console.log(error.response.data)
  }
}

onMounted(() => {
  token.value = localStorage.getItem('customer_token')
})


watch([() => authentication.closeModalAfterAuth], ([newState] , [oldState]) => {
  if(newState == true){
    modalActive.value = false
    token.value = localStorage.getItem('customer_token')
    authentication.closeModalAfterAuth = false
  }
})

</script>


<style scoped>
/* Tambahan CSS untuk badge */
.notif {
  border: 2px solid white; /* Tambahkan border */
  animation: pulse 1.5s infinite; /* Animasi pulse */
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>