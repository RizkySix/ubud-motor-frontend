<template>

<Sidebar>
    
   <FilePond :uploadTempEndpoint="url+'/temp/catalog'" :deleteTempEndpoint="'/temp/catalog'" :maxMultipleFile="3" />

<ValidationError v-if="hasError">
    <div v-for="(error , index) in errorBag" :key="index">
        <span class="text-xs md:text-sm" v-if="error">- {{ error }}</span>
    </div>
</ValidationError>
<form @submit.prevent="storeCatalog">
  <div class="relative z-0 w-full mt-14 mb-6 group">
      <input v-model="catalogPayload.motor_name" type="text" name="motor_name" id="motor_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="motor_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nama Motor</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input v-model="catalogPayload.charge" type="number" name="charge" id="charge" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="charge" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Denda (Telat Pengembalian)</label>
  </div>

  <div class="mt-4 md:mt-10 md:mb-4 w-full flex justify-end">
    <div class="mt-2 w-[30%] md:w-[15%] flex justify-between text-xs md:text-base">
        <span class="cursor-pointer hover:text-gray-400" @click="addPriceLists">+ Price list</span>
        <span class="cursor-pointer hover:text-gray-400" @click="removePriceLists">- Price list</span>
    </div>
  </div>
<div v-for="(item , index) in items" :key="index">
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input v-model="priceLists[index].price" type="number" name="price" :id="'price'+index" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label :for="'price'+index" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Harga</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
        <input v-model="priceLists[index].package" type="text" name="package" :id="'package'+index" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
        <label :for="'package'+index" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 package-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nama Paket (ex: Daily/Monthly)</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6 mb-10">
    <div class="relative z-0 w-full mb-6 group">
        <input v-model="priceLists[index].duration" type="number" name="duration" :id="'duration'+index" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label :for="'duration'+index" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Durasi Paket (ex: 24)</label>
    </div>
    <div class="relative z-0 w-full mb-6 group">
        <input v-model="priceLists[index].duration_suffix" type="text" name="duration_suffix" :id="'duration_suffix'+index" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label :for="'duration_suffix'+index" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipe (ex: hours/days)</label>
    </div>
  </div>
</div>
  <button @submit.prevent="storeCatalog" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tambah Catalog</button>
</form>

</Sidebar>

</template>

<script setup>
import { ref , watch , reactive } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import ValidationError from '@/components/Alert/ValidationError.vue';
import { useCatalogStore } from '@/stores/catalog' 
import {http , url } from '@/helper/domain';
import FilePond from '@/components/Admin/FilePond.vue';
import toaster from '@/helper/toaster';
import { useRouter } from 'vue-router';

const catalog = useCatalogStore()
const router = useRouter()
const myFiles = ref([])

//default jumlah pricelist = 1;
const items = ref(1)
const priceData = {
    price: null,
    duration: null,
    package: '',
    duration_suffix: ''
}

const priceLists = ref([{priceData}])
const catalogPayload = reactive({
    motor_name: '',
    charge: null,
    path_catalog: [],
    price_lists: []
})

const addPriceLists = () => {
    items.value += 1;
    priceLists.value.push({priceData})

}

const removePriceLists = () => {
    items.value -= 1;
    priceLists.value.pop()
}

const errorBag = reactive({
    motor_name: '',
    charge: '',
    path_catalog: '',
    price_lists: ''
})
const hasError = ref(false)

const storeCatalog = async () => {
    try {
        catalogPayload.path_catalog = myFiles.value
        catalogPayload.price_lists = priceLists.value
        const response =  await http().post('/catalog' , catalogPayload)

        console.log(response.data)
        router.push({
            name: 'admin.dashboard'
        })
        toaster('Catalog berhasil dibuat' , true)

    } catch (error) {
        const errors = error.response.data.validation_errors

        for (const propName in errorBag) {
            if (errors[propName]) {
                errorBag[propName] = errors[propName][0];
            }
        }

        hasError.value = true
    }
}

watch([() => catalog.catalogFiles ] , ([currentFiles] , [oldFiles]) => {
    myFiles.value = currentFiles
})

</script>