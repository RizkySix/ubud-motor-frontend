<template>
 <div @click="toggleModal" class=" fixed w-14 md:w-16 -bottom-12 md:bottom-0 mb-10 md:mb-0 left-0 p-4 z-[52] cursor-pointer">
  <div v-if="booking.newBooking > 0" class="notif w-7 h-7 bg-red-500 text-white text-sm font-semibold rounded-full flex items-center justify-center absolute left-12 md:left-14 top-8">
    <!-- Isi badge (misalnya, angka notifikasi) -->
    {{ booking.newBooking }}
  </div>
    <a id="booking-auth" class="text-white py-2 px-4 rounded-full">

      <svg v-if="token" class="icon h-12 w-12 md:h-16 md:w-16 " viewBox="-102.4 -102.4 1228.80 1228.80" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-102.4" y="-102.4" width="1228.80" height="1228.80" rx="614.4" fill="#26515f" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M665.6 870.4c0 14.08-11.52 25.6-25.6 25.6H256c-14.08 0-25.6-11.52-25.6-25.6V281.6c0-14.08 11.52-25.6 25.6-25.6h384c14.08 0 25.6 11.52 25.6 25.6v588.8z" fill="#936e6c"></path><path d="M819.2 870.4c0 14.08-11.52 25.6-25.6 25.6H665.6V256h128c14.08 0 25.6 11.52 25.6 25.6v588.8z" fill="#bb7c81"></path><path d="M793.6 908.8H256c-21.76 0-38.4-16.64-38.4-38.4V281.6c0-21.76 16.64-38.4 38.4-38.4h537.6c21.76 0 38.4 16.64 38.4 38.4v588.8c0 21.76-16.64 38.4-38.4 38.4zM256 268.8c-7.68 0-12.8 5.12-12.8 12.8v588.8c0 7.68 5.12 12.8 12.8 12.8h537.6c7.68 0 12.8-5.12 12.8-12.8V281.6c0-7.68-5.12-12.8-12.8-12.8H256z" fill="#231C1C"></path><path d="M640 908.8H256c-21.76 0-38.4-16.64-38.4-38.4V281.6c0-21.76 16.64-38.4 38.4-38.4h384c21.76 0 38.4 16.64 38.4 38.4v588.8c0 21.76-16.64 38.4-38.4 38.4zM256 268.8c-7.68 0-12.8 5.12-12.8 12.8v588.8c0 7.68 5.12 12.8 12.8 12.8h384c7.68 0 12.8-5.12 12.8-12.8V281.6c0-7.68-5.12-12.8-12.8-12.8H256zM729.6 256h25.6v550.4h-25.6z" fill="#231C1C"></path><path d="M661.76 904.96l-17.92-17.92 99.84-99.84 85.76 99.84-20.48 17.92-67.84-79.36zM614.4 243.2h-25.6c0-71.68-57.6-129.28-128-129.28S332.8 171.52 332.8 243.2h-25.6c0-85.76 69.12-154.88 153.6-154.88S614.4 157.44 614.4 243.2z" fill="#231C1C"></path><path d="M742.4 243.2h-25.6c0-71.68-57.6-129.28-128-129.28S460.8 171.52 460.8 243.2h-25.6c0-85.76 69.12-154.88 153.6-154.88S742.4 157.44 742.4 243.2z" fill="#231C1C"></path></g></svg>

      <svg v-else class="h-12 w-12 md:h-16 md:w-16 " viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#346474" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="#4eda78"></path> <path opacity="0.4" d="M20.7896 14.6999C19.6696 15.4499 18.0996 15.7299 16.6496 15.5399C17.0296 14.7199 17.2296 13.8099 17.2396 12.8499C17.2396 11.8499 17.0196 10.8999 16.5996 10.0699C18.0796 9.86992 19.6496 10.1499 20.7796 10.8999C22.3596 11.9399 22.3596 13.6499 20.7896 14.6999Z" fill="#4eda78"></path> <path opacity="0.4" d="M6.44039 7.77C6.51039 7.76 6.58039 7.76 6.65039 7.77C8.20039 7.72 9.43039 6.45 9.43039 4.89C9.43039 3.3 8.14039 2 6.54039 2C4.95039 2 3.65039 3.29 3.65039 4.89C3.66039 6.45 4.89039 7.72 6.44039 7.77Z" fill="#4eda78"></path> <path opacity="0.4" d="M6.54914 12.8501C6.54914 13.8201 6.75914 14.7401 7.13914 15.5701C5.72914 15.7201 4.25914 15.4201 3.17914 14.7101C1.59914 13.6601 1.59914 11.9501 3.17914 10.9001C4.24914 10.1801 5.75914 9.8901 7.17914 10.0501C6.76914 10.8901 6.54914 11.8401 6.54914 12.8501Z" fill="#4eda78"></path> <path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.55078 10.54 10.0808 9 11.9908 9C13.8908 9 15.4308 10.54 15.4308 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="#4eda78"></path> <path d="M8.87078 17.9399C7.36078 18.9499 7.36078 20.6099 8.87078 21.6099C10.5908 22.7599 13.4108 22.7599 15.1308 21.6099C16.6408 20.5999 16.6408 18.9399 15.1308 17.9399C13.4208 16.7899 10.6008 16.7899 8.87078 17.9399Z" fill="#4eda78"></path> </g></svg>
    </a>
  </div>
  

  <div v-if="token" @click="handleLogout" class=" rounded-full fixed w-10 md:w-10 -bottom-16 md:-bottom-5 mb-10 md:mb-0 left-9 md:left-14 p-4 z-[51] cursor-pointer">
    <a id="logout" class="text-white py-2 px-4 rounded-full">

      <svg class="h-6 w-6 md:h-8 md:w-8 " viewBox="-6.4 -6.4 76.80 76.80" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-6.4" y="-6.4" width="76.80" height="76.80" rx="38.4" fill="#700000" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path fill="#4796E7" d="M1,35.0023695 C1,32.7919219 2.78716697,30.7942228 4.96428975,30.5435455 L18,29.0425936 L31.0357102,30.5435455 C33.225127,30.7956384 35,32.7918218 35,35.0023695 L35,42 L1,42 L1,35.0023695 Z"></path> <path fill="#FFDD95" d="M12,24.3164468 C8.98979073,21.470456 7,16.8615543 7,13 C7,6.92486775 11.9248678,2 18,2 C24.0751322,2 29,6.92486775 29,13 C29,16.8615543 27.0102093,21.470456 24,24.3164468 L24,31 C24,31 19.9325778,32.4486507 18,32.4486507 C16.0674222,32.4486507 12,31 12,31 L12,24.3164468 Z"></path> <circle cx="9" cy="18" r="3" fill="#FFDD95"></circle> <circle cx="27" cy="18" r="3" fill="#FFDD95"></circle> <path fill="#BD7575" d="M29,49.0023695 C29,46.7919219 30.787167,44.7942228 32.9642898,44.5435455 L46,43.0425936 L59.0357102,44.5435455 C61.225127,44.7956384 63,46.7918218 63,49.0023695 L63,56 L29,56 L29,49.0023695 Z"></path> <path fill="#FFDD95" d="M40,38.3164468 C36.9897907,35.470456 35,30.8615543 35,27 C35,20.9248678 39.9248678,16 46,16 C52.0751322,16 57,20.9248678 57,27 C57,30.8615543 55.0102093,35.470456 52,38.3164468 L52,45 C52,45 47.9325778,46.4486507 46,46.4486507 C44.0674222,46.4486507 40,45 40,45 L40,38.3164468 Z"></path> <circle cx="37" cy="32" r="3" fill="#FFDD95"></circle> <circle cx="55" cy="32" r="3" fill="#FFDD95"></circle> <circle cx="15" cy="53" r="8" fill="#F5413E"></circle> <path stroke="#FFDD95" stroke-linecap="round" stroke-width="2" d="M12.007032 50.0268893L18 56M12.0169607 56.0099286L17.9900714 50.0169607"></path> </g> </g></svg>
    </a>

  </div>

  <BaseModal :modalActive="modalActive" :width="'max-w-3xl'" @close-modal="toggleModal">
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
    console.log(response.data)
    token.value = localStorage.getItem('customer_token')
  } catch (error) {
    console.log(error.response.data)
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