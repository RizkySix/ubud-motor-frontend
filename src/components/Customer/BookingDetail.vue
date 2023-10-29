<template>
<div class="px-10 py-10 h-[700px] overflow-y-scroll custom-scrollbar">
    <div class="text-center mb-2">
        <CatalogTitle>
           Booking Detail
        </CatalogTitle>
    </div>

    <!-- Data -->
    <div v-if="items" class="mt-4 grid md:grid-cols-2 gap-3">
        <div class="w-full mt-4 max-w-sm max-h-[250px] overflow-y-scroll custom-scrollbar rounded-lg shadow-lg border border-dotted p-2 custom-scrollbar" v-for="(item, index) in items" :key="index" :class="{'bg-red-400': item.total_charge > 0}">
               
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Motor:</span>
                    <span class="font-normal text-sm">{{ item.motor_name }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Renewal History:</span>
                    <span v-if="item.renewal_history" v-for="(history , index) in JSON.parse(item.renewal_history)" :key="index" class="font-normal text-sm flex flex-col">
                        <span>{{ history.package }}</span>
                        <span class="font-semibold">from: <span class="font-normal">{{ dateFormat(history.extension_from) }}</span></span>
                        <span class="font-semibold">to: <span class="font-normal">{{ dateFormat(history.extension_to) }},</span></span>
                    </span>
                    <span v-else class="font-normal text-sm">*</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Rental Date: </span>
                    <span class="font-normal text-sm">{{ dateFormat(item.rental_date) }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Return Date: </span>
                    <span class="font-normal text-sm">{{ dateFormat(item.return_date) }}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Passed Days: </span>
                    <span class="font-normal text-sm">{{ item.passed_days }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Charge: </span>
                    <span class="font-normal text-sm">{{ rpCurrency(item.total_charge) }}</span>
                </div>
            </div>
           

            <div class="w-full border-t-2">
                <div v-if="item.total_charge == 0" @click="toRenewalPage(item)" class="relative z-0 w-full mt-4 group flex flex-col cursor-pointer">
                  <DateIcon :width="30" :height="30" />
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script setup>
import {dateFormat } from '@/helper/helperMethod';
import {rpCurrency } from '@/helper/currency';
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import PackageIcon from '@/components/icons/PackageIcon.vue';
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import { useRouter } from 'vue-router';
import DateIcon from '@/components/icons/DateIcon.vue';

const props = defineProps({
    items: Object
})
const router = useRouter()

const toRenewalPage = (item) => {
    router.push({
        name: 'renewal',
        params: {
            motor_name : item.motor_name,
            id: item.id,
            return_date: item.return_date
        }
    })
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