<template>
<div class="px-10 py-10 h-[700px] overflow-y-scroll custom-scrollbar">
    <div class="text-center mb-2">
        <CatalogTitle>
           Booking Detail
        </CatalogTitle>
    </div>

    <!-- Data -->
    <div v-if="items" class="mt-4 grid md:grid-cols-2 gap-3">
        <div class="w-full mt-4 max-w-sm custom-scrollbar bg-white rounded-lg shadow-lg border border-dotted p-2" v-for="(item, index) in items" :key="index">
               
            <div class="grid grid-cols-2 gap-6">
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Motor:</span>
                    <span class="font-normal text-sm">{{ item.motor_name }}</span>
                </div>
                <div class="relative z-0 w-full mb-2 group flex flex-col">
                    <span class="font-semibold">Renewal History:</span>
                    <span class="font-normal text-sm">{{ item.renewal_history ?? '*' }}</span>
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
           

            <div class="grid grid-cols-2 gap-6 w-1/5 mx-auto">
                <div @click="toRenewalPage(item)" class="relative z-0 w-full mt-4 group flex flex-col cursor-pointer">
                  <PackageIcon :width="30" :height="30" />
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