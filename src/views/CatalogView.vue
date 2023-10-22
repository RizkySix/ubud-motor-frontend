<template>
<Sidebar>
  <div class="w-full flex flex-wrap gap-12 md:gap-3 justify-between" v-if="catalogs">
    <div class="w-full md:w-[45%]" v-for="(catalog, index) in catalogs">
        <Swiper :images="[catalog.first_catalog,catalog.second_catalog,catalog.third_catalog].filter(item => item !== null)" /> 
        <div class="my-4 text-center w-full flex justify-center">
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
                    {{ price.duration + ' ' + price.duration_suffix }}
                </td>
                <td class="px-6 py-4">
                    {{ rpCurrency(price.price) }}
                </td>
                <td class="px-6 py-4">
                    <button @click="toggleModal(catalog.motor_name, price)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
               
            </tr>
        </tbody>
    </table>
</div>

    </div>
  </div>
  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <form @submit.prevent="handleUpdatePrice" class="p-5">
        <span class="font-bold"> {{ motorName }}</span>
        <div class="grid md:gap-6 mt-10">
            <div class="relative z-0 w-full mb-6 group">
                <FloatingInput v-model="prices.price" :type="'number'" :name="'price'" :id="'price'" :label="'Harga'" />
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <FloatingInput v-model="prices.package" :type="'text'" :name="'package'" :id="'package'" :label="'Nama Paket (ex: Daily/Monthly)'" />
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <FloatingInput v-model="prices.duration" :type="'number'" :name="'duration'" :id="'duration'" :label="'Durasi Paket (ex: 24)'" />
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <FloatingInput v-model="prices.duration_suffix" :type="'text'" :name="'duration_suffix'" :id="'duration_suffix'" :label="'Tipe (ex: hours/days)'" />
            </div>
        </div>
        <button @submit.prevent="handleUpdatePrice" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perbarui</button>
        </form>
    </BaseModal>
</Sidebar>
</template>

<script setup>
import { ref , watch , reactive , onMounted } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import {http , url } from '@/helper/domain';
import {rpCurrency } from '@/helper/currency';
import FloatingInput from '../components/Form/FloatingInput.vue';
import BaseModal from "@/components/Modal/BaseModal.vue"
import Swiper from '@/components/Swiper/Swiper.vue';
import toaster from '@/helper/toaster';

const catalogs = ref(null)

//fetch catalog
const handleFetchCatalog = async() => {
    try {
      const response = await http().get('/catalog')
      catalogs.value = response.data.data
    } catch (error) {
        console.log(error.response.data)
    }
}

const prices = reactive({
    price: null,
    package: '',
    duration: null,
    duration_suffix: '',
    id: null
})
const motorName = ref('')

//update catalog price
const handleUpdatePrice = async() => {
    try {
        const response = await http().put('/catalog/prices/' + prices.id , prices)
        toggleModal()
        await handleFetchCatalog()
        toaster('Price berhasil diperbarui' , true)
    } catch (error) {
        console.log(error.response.data)
    }
}

const modalActive = ref(null)

const toggleModal = (motor_name = null , data = []) => {
    modalActive.value = !modalActive.value

    motorName.value = motor_name
    for (const propName in prices) {
        prices[propName] = data[propName]
    }
    
}

onMounted(async() => {
     await handleFetchCatalog()
})


</script>