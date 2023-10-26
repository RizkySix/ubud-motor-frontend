<template>
    
<div class="px-10 py-10 max-h-[700px] overflow-y-scroll custom-scrollbar">
    <div class="flex flex-col rounded-lg shadow-lg border border-yellow-200 p-3">
        <button @click="handleFetchBooking" class="mb-3 hover:text-blue-400 transition duration-300" type="button">Booking History</button>
        <hr>
        <button class="mt-3 hover:text-blue-400 transition duration-300" type="button">Extension History</button>
    </div>

    <!-- Data -->
    <div v-if="items" class="mt-4">
        <div class="w-full mt-4 max-w-sm overflow-x-scroll custom-scrollbar bg-white rounded-lg shadow-lg border border-dotted p-2" v-for="(item, index) in items" :key="index">
               
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
                    <span class="font-semibold">Expired On: </span>
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

            <div class="grid grid-cols-3 gap-6 w-1/2 mx-auto">
                <div v-if="!item.is_confirmed" class="relative z-0 w-full mt-4 group flex flex-col cursor-pointer">
                    <EditIcon :width="30" :height="30" />
                </div>
                <div v-if="!item.is_confirmed" class="relative z-0 w-full mt-4 group flex flex-col cursor-pointer">
                    <DeleteIcon :width="30" :height="30" />                 
                </div>
                <div @click="toggleModalDetail(item.booking_details)" class="relative z-0 w-full mt-4 group flex flex-col cursor-pointer">
                  <PackageIcon :width="30" :height="30" />
                </div>
            </div>

        </div>
    </div>
</div>

<BaseModal :modalActive="modalActive" @close-modal="toggleModalDetail">
    <BookingDetail :items="bookingDetail" />
  </BaseModal>

</template>

<script setup>
import { ref , defineAsyncComponent } from 'vue';
import { useCatalogStore } from '@/stores/catalog'
import { useAuthenticationStore } from '@/stores/authentication'
import {rpCurrency } from '@/helper/currency';
import {dateFormat } from '@/helper/helperMethod';
import {http , url } from '@/helper/domain';
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import PackageIcon from '@/components/icons/PackageIcon.vue';
import BookingDetail  from '@/components/Customer/BookingDetail.vue'

const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)

const items = ref(null)

const handleFetchBooking = async() => {
    try {
        const response = await http().get('/booking')
        items.value = response.data.data
        console.log(items.value)
    } catch (error) {
        console.log(error.response.data)
    }
}

const modalActive = ref(null)
const bookingDetail = ref(null)

const toggleModalDetail = (detail = {}) => {
    bookingDetail.value = detail
    modalActive.value = !modalActive.value
}

</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px; /* Lebar scrollbar horizontal */
  height: 6px; /* Tinggi scrollbar vertikal */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888; /* Warna thumb scrollbar */
  border-radius: 3px; /* Radius sudut thumb scrollbar */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; /* Warna thumb saat dihover */
}
</style>