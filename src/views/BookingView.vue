<template>

<Sidebar>
    
    <div class="overflow-x-scroll relative">
    <div class="sticky left-0 mx-auto lg:mx-52 px-10 md:px-0">
    <ul class="bg-white shadow-lg flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 px-2">
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('today')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'today', 'border-transparent' : status != 'today'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500" :class="{'text-blue-600': status == 'today', 'text-gray-400': status != 'today'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"></path> <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"></path> 
            </svg>Booking (Today)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('unconfirmed')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'unconfirmed', 'border-transparent' : status != 'unconfirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'unconfirmed' , 'text-gray-400' : status != 'unconfirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"></path> <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"></path> 
                </svg>Booking (All)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('confirmed')" class="inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" aria-current="page" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'confirmed' , 'border-transparent' : status != 'confirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500" :class="{'text-blue-600': status == 'confirmed' , 'text-gray-400' : status != 'confirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M3.11111 6C2.49746 6 2 6.53726 2 7.2V16.8C2 17.4627 2.49746 18 3.11111 18H20.8889C21.5025 18 22 17.4627 22 16.8V7.2C22 6.53726 21.5025 6 20.8889 6H3.11111ZM12 15C13.5341 15 14.7778 13.6569 14.7778 12C14.7778 10.3431 13.5341 9 12 9C10.4659 9 9.22222 10.3431 9.22222 12C9.22222 13.6569 10.4659 15 12 15Z"></path> <path d="M6 9.5V14.5M18 9.5V14.5M3.11111 6H20.8889C21.5025 6 22 6.53726 22 7.2V16.8C22 17.4627 21.5025 18 20.8889 18H3.11111C2.49746 18 2 17.4627 2 16.8V7.2C2 6.53726 2.49746 6 3.11111 6ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>Booking Aktif
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('expired')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'expired', 'border-transparent' : status != 'expired'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'expired' , 'text-gray-400' : status != 'expired'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17 4H7C4 4 2 5.5 2 9V12.56C2 12.93 2.38 13.16 2.71 13.01C3.69 12.56 4.82 12.39 6.01 12.6C8.64 13.07 10.57 15.51 10.5 18.18C10.49 18.6 10.43 19.01 10.32 19.41C10.24 19.72 10.49 20.01 10.81 20.01H17C20 20.01 22 18.51 22 15.01V9C22 5.5 20 4 17 4ZM12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5ZM19.25 14C19.25 14.41 18.91 14.75 18.5 14.75C18.09 14.75 17.75 14.41 17.75 14V10C17.75 9.59 18.09 9.25 18.5 9.25C18.91 9.25 19.25 9.59 19.25 10V14Z"></path> <path d="M5 14C3.8 14 2.73 14.53 2 15.36C1.38 16.07 1 16.99 1 18C1 18.75 1.21 19.46 1.58 20.06C2.27 21.22 3.54 22 5 22C6.01 22 6.93 21.63 7.63 21C7.94 20.74 8.21 20.42 8.42 20.06C8.79 19.46 9 18.75 9 18C9 15.79 7.21 14 5 14ZM6.6 19.58C6.45 19.73 6.26 19.8 6.07 19.8C5.88 19.8 5.69 19.73 5.54 19.58L5.01 19.05L4.46 19.6C4.31 19.75 4.12 19.82 3.93 19.82C3.74 19.82 3.55 19.75 3.4 19.6C3.11 19.31 3.11 18.83 3.4 18.54L3.95 17.99L3.42 17.46C3.13 17.17 3.13 16.69 3.42 16.4C3.71 16.11 4.19 16.11 4.48 16.4L5.01 16.93L5.51 16.43C5.8 16.14 6.28 16.14 6.57 16.43C6.86 16.72 6.86 17.2 6.57 17.49L6.07 17.99L6.6 18.52C6.89 18.81 6.89 19.28 6.6 19.58Z"></path> 
                </svg>Booking Non-active
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('charge')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'charge' , 'border-transparent' : status != 'charge'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'charge' , 'text-gray-400' : status != 'charge'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                </svg>Denda
            </a>
        </li>
    </ul>
</div>

<table v-if="['today' , 'confirmed' , 'unconfirmed' , 'expired'].includes(status)" class="long-tbl w-[2500px] text-sm text-left text-gray-500 dark:text-gray-400 mt-10 border shadow-xl">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 " style="width:3%">
                        No
                    </th>
                    <th scope="col" class="px-6 "  style="width:7%">
                        Nama
                    </th>
                    <th scope="col" class="px-6 " style="width:7%">
                        WhatsApp
                    </th>
                    <th scope="col" class="px-6" style="width:10%">
                        Email
                    </th>
                    <th scope="col" class="px-6 "  style="width:5%">
                        Motor
                    </th>
                    <th scope="col" class="px-6 "  style="width:7%">
                        Paket
                    </th>
                    <th scope="col" class="px-6 " style="width: 3%;">
                        Total Unit
                    </th>
                    <th scope="col" class="px-6 "  style="width:6%">
                        Amount
                    </th>
                    <th scope="col" class="px-6 "  style="width:8%">
                        Batas Pembayaran
                    </th>
                    <th scope="col" class="px-6 "  style="width:4%">
                        Status
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Alamat Pengiriman
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Alamat Pengambilan
                    </th>
                    <th scope="col" class="px-6 "  style="width:5%">
                       Passport
                    </th>
                    <th scope="col" class="px-6 "  style="width:8%">
                       Pesan
                    </th>
                    <th scope="col" class="px-6 " style="width:5%">
                       Aksi
                    </th>
                </tr>
            </thead>
            <tbody v-if="items.length > 0" v-for="(item, index) in items" :key="index" >
                <tr class="bg-white border-b break-words" >
                    <th class="px-6 py-4 font-medium text-gray-900">
                        {{ index + 1 }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.full_name }}
                    </td>
                    <td class="px-6 py-4">
                       {{ item.whatsapp_number }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.motor_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.package }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.total_unit }}
                    </td>
                    <td class="px-6 py-4">
                        {{ rpCurrency(item.amount) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ dateFormat(item.expired_payment) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.is_confirmed ? 'Paid' : 'Unpaid' }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.delivery_address }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.pickup_address }}
                    </td>
                    <td class="px-6 py-4">
                        <img :src="item.card_image" class="w-50 h-20 object-cover" alt="passport" @click="lightToggle(item.card_image)">
                    </td>
                    <td class="px-6 py-4">
                        {{ item.additional_message ?? 'NULL' }}
                    </td>
                    <td class="px-6 py-4 flex gap-4 mt-5 cursor-pointer">
                        <span v-if="['today' , 'unconfirmed'].includes(status)" @click="handleConfirmBooking(item.uuid)" class="border-2 border-blue-700 rounded-full">
                            <ConfirmIconVue :width="25" :height="25" />
                        </span>
                        <span @click="toggleModal(item.booking_details)" class="border-2 border-blue-700 rounded-full">
                            <MotorIconVue :width="25" :height="25" />
                        </span>
                    </td>
                
                </tr>
            </tbody>

           <TableSkeletonLong v-else-if="waiting" />

           <tbody v-else>
                <td colspan="2" class="px-6 py-4 font-bold">
                    NO DATA
                </td>
            </tbody>
</table>


<table v-if="status == 'charge'" class="long-tbl w-[1700px] text-sm text-left text-gray-500 dark:text-gray-400 mt-10 border shadow-xl">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 " style="width:3%">
                        No
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Nama
                    </th>
                    <th scope="col" class="px-6 " style="width:10%">
                        WhatsApp
                    </th>
                    <th scope="col" class="px-6 " style="width:10%">
                        Email
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Motor
                    </th>
                    <th scope="col" class="px-6 "  >
                        Hari Lewat
                    </th>
                    <th scope="col" class="px-6 "  style="width:8%">
                        Total Denda
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Tanggal Sewa
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Tanggal Kembali
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Status Kembali
                    </th>
                    <th scope="col" class="px-6 "  >
                       Passport
                    </th>
                    <th scope="col" class="px-6 ">
                       Aksi
                    </th>
                </tr>
            </thead>
            <tbody v-if="items.length > 0" v-for="(item, index) in items" :key="index" >
                <tr class="bg-white border-b break-words">
                    <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ index + 1 }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.full_name }}
                    </td>
                    <td class="px-6 py-4">
                       {{ item.whatsapp_number }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.motor_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.passed_days }}
                    </td>
                    <td class="px-6 py-4">
                        {{ rpCurrency(item.total_charge) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ dateFormat(item.rental_date) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ dateFormat(item.return_date) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.is_done ? 'Kembali' : 'Belum Kembali' }}
                    </td>
                    <td class="px-6 py-4">
                        <img :src="item.card_image" class="w-50 h-50 object-cover" @click="lightToggle(item.card_image)">
                    </td>
                    <td class="px-6 py-4 flex flex-col gap-1">
                        <span @click="handleDoneRental(item.id)" class="cursor-pointer rounded-full">
                            <ConfirmIconVue :width="25" :height="25" />
                        </span>
                    </td>
                
                </tr>
            </tbody>
            <TableSkeleton v-else-if="waiting" />
            <tbody v-else>
                <td colspan="2" class="px-6 py-4 font-bold">
                    NO DATA
                </td>
            </tbody>
</table>
 </div>

<BaseModal :width="'max-w-6xl'" :modalActive="modalActive" @close-modal="toggleModal">
  <div class="overflow-x-scroll relative p-4">
   <span class="sticky left-0 flex justify-center">
    <CatalogTitle :variant="'variant2'">Detail Booking</CatalogTitle>
   </span>
    <table class="w-[1000px] md:w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10 border shadow-xl">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 ">
                        No
                    </th>
                    <th scope="col" class="px-6 ">
                        Motor
                    </th>
                    <th scope="col" class="px-6 "  >
                        Hari Lewat
                    </th>
                    <th scope="col" class="px-6 ">
                        Total Denda
                    </th>
                    <th scope="col" class="px-6 ">
                        Tanggal Sewa
                    </th>
                    <th scope="col" class="px-6 ">
                        Tanggal Kembali
                    </th>
                    <th scope="col" class="px-6 "  >
                       Status Kembali
                    </th>
                    <th scope="col" class="px-6 ">
                       Aksi
                    </th>
                </tr>
            </thead>
            <tbody v-if="details.length > 0" v-for="(detail, index) in details" :key="index" >
                <tr class="bg-white border-b break-words">
                    <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ index + 1 }}
                    </th>
                    <td class="px-6 py-4">
                        {{ detail.motor_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ detail.passed_days }}
                    </td>
                    <td class="px-6 py-4">
                        {{ rpCurrency(detail.total_charge) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ dateFormat(detail.rental_date) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ dateFormat(detail.return_date) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ detail.is_done ? 'Kembali' : 'Belum Kembali' }}
                    </td>
                    <td class="px-6 py-4 flex flex-col gap-1">
                        <span v-if="!detail.is_done" @click="handleDoneRental(detail.id , index)" class="cursor-pointer rounded-full">
                            <ConfirmIconVue :width="25" :height="25" />
                        </span>
                    </td>
                
                </tr>
            </tbody>
            <tbody v-else>
                <td colspan="2" class="px-6 py-4 font-bold">
                    NO DATA
                </td>
            </tbody>
</table>
  </div>
</BaseModal>


<FsLightbox
    :toggler="toggler"
    :sources="[lightImage]"
    type="image"
/>
</Sidebar>

</template>

<script setup>
import Sidebar from '@/components/Admin/Sidebar.vue';
import { ref , onMounted , defineAsyncComponent } from 'vue';
import {http , url } from '@/helper/domain';
import {rpCurrency } from '@/helper/currency';
import {confirmationAccept } from '@/helper/confirmation';
import {dateFormat } from '@/helper/helperMethod';
import TableSkeleton from '@/components/Skeleton/TableSkeleton.vue'
import TableSkeletonLong from '@/components/Skeleton/TableSkeletonLong.vue'
import toaster from '@/helper/toaster';
import ConfirmIconVue from '@/components/icons/ConfirmIcon.vue';
import MotorIconVue from '@/components/icons/MotorIcon.vue';
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import FsLightbox from "fslightbox-vue/v3";


const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)

const toggler = ref(null)
const status = ref('today')
const items = ref([])
const details = ref([])
const waiting = ref(false)

const lightImage = ref([])
const lightToggle = (image) => {
    lightImage.value = image
    toggler.value = !toggler.value
}

const handleFetchBookingData = async(type) => {
    try {
        items.value = []
        waiting.value = true
        const response = await http().get('/booking/admin?type=' + type)
        waiting.value = false
        items.value = response.data.data
        status.value = type
    } catch (error) {
        console.log(error.response.data)
        waiting.value = false
    }
}

const handleConfirmBooking = async(uuid) => {

    if(await confirmationAccept() === false){
        return false
    }

    try {
        items.value = []
        waiting.value = true
        const response = await http().put('/booking/confirmed/' + uuid)
        setTimeout(() => {
            waiting.value = false
        }, 10);
        await handleFetchBookingData(status.value)
        toaster('Berhasil Konfirmasi' , true)

    } catch (error) {
      
        console.log(error.response.data)
        await handleFetchBookingData(status.value)
        toaster('Gagal Konfirmasi' , false)
    }   
}

const modalActive = ref(null)

const toggleModal = (detail = null) => {
    details.value = detail
    modalActive.value = !modalActive.value
}

const handleDoneRental = async(id , index = 0) => {
    if(await confirmationAccept() == false){
        return false
    }

    try {
        const response = await http().put('/booking/done/' + id)
        
        if(index > 0){
            details.value[index].is_done = 1
        }else{
            await handleFetchBookingData(status.value) 
        }

        toaster('Berhasil Konfirmasi' , true)
    } catch (error) {
        console.log(error.response.data)
        toaster('Gagal Konfirmasi' , false)
    }
}

onMounted(async() => {
    await handleFetchBookingData('today')
})
</script>


<style scoped>
.long-tbl {
    table-layout: fixed;
}

</style>