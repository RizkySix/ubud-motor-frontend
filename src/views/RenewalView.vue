<template>
<Sidebar>
    <div class="overflow-x-scroll relative">
    <div class="fixed mx-auto lg:mx-52">
    <ul class="flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 px-2">
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchRenewalData('today')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'today', 'border-transparent' : status != 'today'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'today' , 'text-gray-400' : status != 'today'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"></path> <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"></path> 
                </svg>Permintaan Renewal (Today)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchRenewalData('unconfirmed')" class="inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'unconfirmed', 'border-transparent' : status != 'unconfirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500 " :class="{'text-blue-600': status == 'unconfirmed' , 'text-gray-400' : status != 'unconfirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"></path> <path d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"></path> 
                </svg>Permintaan Renewal (All)
            </a>
        </li>
        <li class="mr-2 cursor-pointer">
            <a @click="handleFetchRenewalData('confirmed')" class="inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 group" aria-current="page" :class="{'text-blue-600 border-b-2 border-blue-600': status == 'confirmed' , 'border-transparent' : status != 'confirmed'}">
                <svg class="w-4 h-4 mr-2 group-hover:text-gray-500" :class="{'text-blue-600': status == 'confirmed' , 'text-gray-400' : status != 'confirmed'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M3.11111 6C2.49746 6 2 6.53726 2 7.2V16.8C2 17.4627 2.49746 18 3.11111 18H20.8889C21.5025 18 22 17.4627 22 16.8V7.2C22 6.53726 21.5025 6 20.8889 6H3.11111ZM12 15C13.5341 15 14.7778 13.6569 14.7778 12C14.7778 10.3431 13.5341 9 12 9C10.4659 9 9.22222 10.3431 9.22222 12C9.22222 13.6569 10.4659 15 12 15Z"></path> <path d="M6 9.5V14.5M18 9.5V14.5M3.11111 6H20.8889C21.5025 6 22 6.53726 22 7.2V16.8C22 17.4627 21.5025 18 20.8889 18H3.11111C2.49746 18 2 17.4627 2 16.8V7.2C2 6.53726 2.49746 6 3.11111 6ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>Renewal Terkonfirmasi
            </a>
        </li>
    </ul>
</div>

<table class="long-tbl w-[2000px] text-sm text-left text-gray-500 dark:text-gray-400 mt-44 md:mt-32 border shadow-xl overflow-x-hidden">
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

const status = ref('today')
const items = ref([])
const waiting = ref(false)

const handleFetchRenewalData = async(type) => {
    try {
        items.value = []
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
