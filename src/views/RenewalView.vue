<template>
<Sidebar>
    <div class="overflow-x-scroll relative">
    <div class="fixed mx-auto lg:mx-52">
    <ul class="flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 px-2">
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchRenewalData('today')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'today', 'border-transparent' : status != 'today'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'today' , 'text-gray-400' : status != 'today'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>Permintaan Renewal (Today)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchRenewalData('unconfirmed')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'unconfirmed', 'border-transparent' : status != 'unconfirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'unconfirmed' , 'text-gray-400' : status != 'unconfirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>Permintaan Renewal (All)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchRenewalData('confirmed')" class="inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" aria-current="page" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'confirmed' , 'border-transparent' : status != 'confirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500" :class="{'text-blue-600': status == 'confirmed' , 'text-gray-400' : status != 'confirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>Renewal Terkonfirmasi
            </a>
        </li>
    </ul>
</div>

<table class="long-tbl w-[2000px] text-sm text-left text-gray-500 dark:text-gray-400 mt-32 border shadow-xl">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 " style="width:3%">
                        No
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Nama
                    </th>
                    <th scope="col" class="px-6 " style="width:8%">
                        WhatsApp
                    </th>
                    <th scope="col" class="px-6 " style="width:10%">
                        Email
                    </th>
                    <th scope="col" class="px-6 "  style="width:8%">
                        Motor
                    </th>
                    <th scope="col" class="px-6 " style="width:8%" >
                        Paket
                    </th>
                    <th scope="col" class="px-6 "  style="width:3%">
                        Total Unit
                    </th>
                    <th scope="col" class="px-6 "  style="width:8%">
                        Total Amount
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Batas Pembayaran
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Perpanjang Dari
                    </th>
                    <th scope="col" class="px-6 "  style="width:10%">
                        Perpanjang Sampai
                    </th>
                    <th scope="col" class="px-6 "  style="width:7%">
                        Status
                    </th>
                    <th v-if="status != 'confirmed'" scope="col" class="px-6 ">
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
                        {{ dateFormat(item.extension_from) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ dateFormat(item.extension_to) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.is_confirmed ? 'Paid' : 'Unpaid' }}
                    </td>
                    <td v-if="status != 'confirmed'" class="px-6 py-4 flex flex-col gap-1">
                        <span @click="handleConfirmRenewal(item.uuid)" class="cursor-pointer rounded-full">
                            <ConfirmIconVue :width="25" :height="25" />
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

 </div>
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

const status = ref('today')
const items = ref([])
const details = ref([])
const waiting = ref(false)

const handleFetchRenewalData = async(type) => {
    try {
        waiting.value = true
        const response = await http().get('/booking/extension/admin?type=' + type)
        waiting.value = false
        items.value = response.data.data
        status.value = type
    } catch (error) {
        console.log(error.response.data)
        waiting.value = false
    }
}

const handleConfirmRenewal = async(uuid) => {
    if(await confirmationAccept() == false){
        return false
    }

    try {
        const response = await http().put('/booking/extension/confirmed/' + uuid)
        await handleFetchRenewalData(status.value)
        toaster('Berhasil Konfirmasi' , true)
    } catch (error) {
        console.log(error.response.data)
        toaster('Gagal Konfirmasi' , true)
    }
}

onMounted(async() => {
    await handleFetchRenewalData('today')
})
</script>


<style scoped>
.long-tbl {
    table-layout: fixed;
}

</style>
