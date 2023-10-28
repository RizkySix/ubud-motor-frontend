<template>

<Sidebar>
    
    <div class="overflow-x-scroll relative">
    <div class="fixed mx-auto lg:mx-52">
    <ul class="flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 px-2">
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('today')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'today', 'border-transparent' : status != 'today'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'today' , 'text-gray-400' : status != 'today'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>Booking (Today)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('unconfirmed')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'unconfirmed', 'border-transparent' : status != 'unconfirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'unconfirmed' , 'text-gray-400' : status != 'unconfirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>Booking (All)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('confirmed')" class="inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" aria-current="page" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'confirmed' , 'border-transparent' : status != 'confirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500" :class="{'text-blue-600': status == 'confirmed' , 'text-gray-400' : status != 'confirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>Booking Aktif
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchBookingData('expired')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'expired', 'border-transparent' : status != 'expired'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'expired' , 'text-gray-400' : status != 'expired'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z"/>
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

<table v-if="['today' , 'confirmed' , 'unconfirmed' , 'expired'].includes(status)" class="long-tbl w-[2500px] text-sm text-left text-gray-500 dark:text-gray-400 mt-32 border shadow-xl">
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
                        <img :src="item.card_image" class="w-50 h-20 object-cover" alt="passport">
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


<table v-if="status == 'charge'" class="long-tbl w-[1700px] text-sm text-left text-gray-500 dark:text-gray-400 mt-32 border shadow-xl">
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
                        <img :src="item.card_image" class="w-50 h-50 object-cover">
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
   <span class="flex justify-center">
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

const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)

const status = ref('today')
const items = ref([])
const details = ref([])
const waiting = ref(false)

const handleFetchBookingData = async(type) => {
    try {
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