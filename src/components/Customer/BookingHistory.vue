<template>
    
<div class="px-10 py-10 max-h-[700px] overflow-y-scroll custom-scrollbar">
    <img v-if="waitingResponse" class="h-6 w-6 mb-3 animate-spin mx-auto" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
    <div class="flex flex-col rounded-lg shadow-lg border border-yellow-200 p-3">
        <button v-if="onChoosed !== 'booking'" @click="handleFetchBooking" class="mb-3 hover:text-blue-400 transition duration-300" type="button">Show Booking History</button>
        <hr v-if="!onChoosed">
        <button v-if="onChoosed !== 'renewal'" @click="handleFetchRenewal" class="mt-3 hover:text-blue-400 transition duration-300" type="button">Show Extension History</button>
    </div>

    <!-- Data -->
    <div v-if="items" class="mt-4">
        <div v-if="onChoosed === 'booking'" class="w-full mt-4 overflow-x-scroll custom-scrollbar rounded-lg shadow-lg border border-dotted p-2" v-for="(item, index) in items" :key="index" :class="{'bg-yellow-200': item.is_active, 'bg-red-400': !item.is_active}" >
               
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Motor:</span>
                    <span class="font-normal text-sm">{{ item.motor_name }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Amount:</span>
                    <span class="font-normal text-sm">{{ rpCurrency(item.amount) }}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Package: </span>
                    <span class="font-normal text-sm">{{ item.package }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Unit: </span>
                    <span class="font-normal text-sm">{{ item.total_unit }} Unit</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Name: </span>
                    <span class="font-normal text-sm">{{ item.full_name }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Email: </span>
                    <span class="font-normal text-sm">{{ item.email }}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Whatsapp Number: </span>
                    <span class="font-normal text-sm">{{ item.whatsapp_number }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Message: </span>
                    <span class="font-normal text-sm">{{ item.additional_message ?? '*' }}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Payment Due: </span>
                    <span class="font-normal text-sm">{{ dateFormat(item.expired_payment) }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Status: </span>
                    <span class="font-normal text-sm">{{ item.is_confirmed ? 'Paid' : 'Unpaid' }}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Delivery Address: </span>
                    <span class="font-normal text-sm">{{ item.delivery_address }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Pickup Address: </span>
                    <span class="font-normal text-sm">{{ item.pickup_address }}</span>
                </div>
            </div>

            <div class="border-t-2 w-full">
               <div class="w-1/4 flex">
                <div v-if="!item.is_confirmed" @click="handleCancelBooking(item.uuid)" class="relative z-0 w-full mt-4 group cursor-pointer">
                    <DeleteIcon :width="30" :height="30" />                 
                </div>
                <div @click="toggleModalDetail(item.booking_details)" class="relative z-0 w-full mt-4 group cursor-pointer">
                  <MotorIcon :width="30" :height="30" :border="'border border-whitesmoke rounded-full'" />
                </div>
               </div>
            </div>

        </div>

        <div v-if="onChoosed === 'renewal'" class="w-full mt-4 overflow-x-scroll custom-scrollbar bg-white rounded-lg shadow-lg border border-dotted p-2" v-for="(item, index) in items" :key="index" >

            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Motor:</span>
                    <span class="font-normal text-sm">{{ item.motor_name }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Amount:</span>
                    <span class="font-normal text-sm">{{ rpCurrency(item.amount) }}</span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Package: </span>
                    <span class="font-normal text-sm">{{ item.package }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Email: </span>
                    <span class="font-normal text-sm">{{ item.email }}</span>
                </div>
             
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Name: </span>
                    <span class="font-normal text-sm">{{ item.full_name }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Whatsapp Number: </span>
                    <span class="font-normal text-sm">{{ item.whatsapp_number }}</span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Payment Due: </span>
                    <span class="font-normal text-sm">{{ dateFormat(item.expired_payment) }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Status: </span>
                    <span class="font-normal text-sm">{{ item.is_confirmed ? 'Paid' : 'Unpaid' }}</span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Extension From: </span>
                    <span class="font-normal text-sm">{{ dateFormat(item.extension_from) }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Extension To: </span>
                    <span class="font-normal text-sm">{{ dateFormat(item.extension_to) }}</span>
                </div>
            </div>
            
            <div class="w-full border-t-2">
                <div v-if="!item.is_confirmed" @click="handleCancelRenewal(item.uuid)" class="relative z-0 w-full mt-4 group flex flex-col cursor-pointer">
                    <DeleteIcon :width="30" :height="30" />                 
                </div>
            </div>
        </div>
    </div>
</div>

<BaseModal :modalActive="modalActive" :width="'max-w-3xl'" @close-modal="toggleModalDetail">
    <BookingDetail :items="bookingDetail" />
  </BaseModal>

</template>

<script setup>
import { ref , defineAsyncComponent } from 'vue';
import {rpCurrency } from '@/helper/currency';
import {dateFormat } from '@/helper/helperMethod';
import {http , url } from '@/helper/domain';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import MotorIcon from '@/components/icons/MotorIcon.vue';
import BookingDetail  from '@/components/Customer/BookingDetail.vue'
import {confirmation } from '@/helper/confirmation';
import toaster from '@/helper/toaster';



const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)

const onChoosed = ref('')
const items = ref(null)
const waitingResponse = ref(false)

const handleFetchBooking = async() => {
    try {
        waitingResponse.value = true
        const response = await http().get('/booking')
        items.value = response.data.data
        waitingResponse.value = false
        onChoosed.value = 'booking'
    } catch (error) {
        console.log(error.response.data)
    }
}

const handleFetchRenewal = async() => {
    try {
        waitingResponse.value = true
        const response = await http().get('/booking/extension')
        items.value = response.data.data
        waitingResponse.value = false
        console.log(items.value)
        onChoosed.value = 'renewal'
        
    } catch (error) {
        console.log(error.response.data)
    }
}


const handleCancelBooking = async(uuid) => {
    if(await confirmation() === false){
        return false
    }
    try {
        const response = await http().delete('/booking/cancel/' + uuid)
        await handleFetchBooking()
        console.log(response.data.data)
        toaster('Booking canceled' , true)
    } catch (error) {
        console.log(error.response.data)
        toaster('Fail cancel Booking' , false)
    }
}

const handleCancelRenewal = async(uuid) => {
    if(await confirmation() === false){
        return false
    }
    try {
        const response = await http().delete('/booking/extension/cancel/' + uuid)
        await handleFetchRenewal()
        console.log(response.data.data)
        toaster('Renewal canceled' , true)
    } catch (error) {
        console.log(error.response.data)
        toaster('Fail cancel Renewal' , false)
    }
}

const modalActive = ref(null)
const bookingDetail = ref(null)

const toggleModalDetail = (detail = {}) => {
    bookingDetail.value = detail
    modalActive.value = !modalActive.value
}

</script>


<style scoped>/* Scrollbar Y (tegak lurus) */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px; /* Lebar scrollbar horizontal */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888; /* Warna thumb scrollbar */
  border-radius: 0; /* Radius thumb untuk sudut kanan atas dan sudut kiri bawah */
  border-bottom-right-radius: 3px; /* Radius sudut kanan bawah */
  border-top-right-radius: 3px; /* Radius sudut kiri atas */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; /* Warna thumb saat dihover */
}

/* Scrollbar X (horizontal) */
.custom-scrollbar::-webkit-scrollbar:horizontal {
  height: 4px; /* Tinggi scrollbar vertikal */
}

.custom-scrollbar::-webkit-scrollbar:horizontal-thumb {
  background: #888; /* Warna thumb scrollbar */
  border-radius: 0; /* Radius thumb untuk sudut kanan bawah dan sudut kiri atas */
  border-bottom-left-radius: 3px; /* Radius sudut kiri bawah */
  border-bottom-right-radius: 3px; /* Radius sudut kanan bawah */
}

.custom-scrollbar::-webkit-scrollbar:horizontal-thumb:hover {
  background: #555; /* Warna thumb saat dihover */
}

</style>