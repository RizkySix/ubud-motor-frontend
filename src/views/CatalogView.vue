<template>
<Sidebar>
  <div class="w-full flex flex-wrap gap-12 md:gap-3 justify-between" v-if="catalogs">
    <div class="w-full md:w-[45%]" v-for="(catalog, index) in catalogs">
        <Swiper :images="[catalog.first_catalog,catalog.second_catalog,catalog.third_catalog].filter(item => item !== null)" /> 
        <div class="my-4 text-center w-full">
            <CatalogTitle v-if="index % 2 != 0" :variant="'variant2'">{{ catalog.motor_name }}</CatalogTitle>
            <CatalogTitle v-else :variant="'variant1'">{{ catalog.motor_name }}</CatalogTitle>
        </div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Paket
                </th>
                <th scope="col" class="px-6 py-3">
                    Durasi
                </th>
                <th scope="col" class="px-6 py-3">
                    Harga
                </th>
                <th scope="col" class="px-6 py-3">
                    Aksi
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(price, index) in catalog.price_lists" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ price.package }}
                </th>
                <td class="px-6 py-4">
                    {{ price.duration }}
                </td>
                <td class="px-6 py-4">
                    {{ rpCurrency(price.price) }}
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </div>
  </div>
</Sidebar>
</template>

<script setup>
import { ref , watch , reactive , onMounted } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import { useCatalogStore } from '@/stores/catalog' 
import {http , url } from '@/helper/domain';
import {rpCurrency } from '@/helper/currency';
import { useRouter } from 'vue-router';
import Swiper from '@/components/Swiper/Swiper.vue';

const catalogs = ref(null)

const fetchCatalog = async() => {
    try {
      const response = await http().get('/catalog')

      catalogs.value = response.data.data
    
    } catch (error) {
        console.log(error.response.data)
    }
}

onMounted(async() => {
     await fetchCatalog()
})


</script>