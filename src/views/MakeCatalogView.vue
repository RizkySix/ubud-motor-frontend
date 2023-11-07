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
    <FloatingInput v-model="catalogPayload.motor_name" :type="'text'" name="motor_name" :id="'motor_name'" :label="'Nama Motor'" />
  </div>
  <div class="relative z-0 w-full mb-6 group">
    <FloatingInput v-model="catalogPayload.charge" :type="'text'" name="charge" :id="'charge'" :label="'Denda (Telat Pengembalian)'" />
  </div>

  <div class="mt-4 md:mt-10 md:mb-4 w-full flex justify-end">
    <div class="mt-2 w-[40%] md:w-[15%] flex justify-between text-xs md:text-base">
        <span class="cursor-pointer hover:text-gray-400" @click="addPriceLists">+ Price list</span>
        <span class="cursor-pointer hover:text-gray-400" @click="removePriceLists">- Price list</span>
    </div>
  </div>
  
<div v-for="(item , index) in items" :key="index">
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <FloatingInput v-model="priceLists[index].price" :type="'number'" :name="'price'" :id="'price'+index" :label="'Harga'" />
    </div>
    <div class="relative z-0 w-full mb-6 group mt-4">
        <label :for="'package'" class="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 ">Paket Tersedia</label>
        <select @change="changePackage(index)" required id="package" v-model="selectedPackage[index]" class="bg-gray-50 border border-gray-300 mt-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            <option :value="'Daily (24 hours)'">Daily (24 hours)</option>
            <option  :value="'Weekly (7 days)'">Weekly (7 days)</option>
            <option  :value="'Monthly (30 days)'">Monthly (30 days)</option>
           
        </select>
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
import FloatingInput from '@/components/Form/FloatingInput.vue';

const catalog = useCatalogStore()
const router = useRouter()
const myFiles = ref([])

//default jumlah pricelist = 1;
const items = ref(1)

const selectedPackage = ref([])

//array untuk menyimpan object2 priceData
const priceLists = ref([{}])

const catalogPayload = reactive({
    motor_name: '',
    charge: null,
    path_catalog: [],
    price_lists: []
})

const changePackage = (index) => {
   
    const regex = /(.+?) \((\d+) (\w+)\)/;
    const match = selectedPackage.value[index].match(regex);
 
    if (match) {
        const [, packageName, duration, suffix] = match;
        priceLists.value[index].package = packageName
        priceLists.value[index].duration = duration
        priceLists.value[index].duration_suffix = suffix

        console.log(priceLists.value)
    }else{
        //console.log('error')
    }

  
}

const addPriceLists = () => {
    items.value += 1;
    priceLists.value.push({})

}

const removePriceLists = () => {
    if(items.value > 1){
        items.value -= 1;
        priceLists.value.pop()
    }
}

const errorBag = ref({})
const hasError = ref(false)

const storeCatalog = async () => {
    try {
        catalogPayload.path_catalog = myFiles.value
        catalogPayload.price_lists = priceLists.value
        const response =  await http().post('/catalog' , catalogPayload)

        router.push({
            name: 'admin.catalogs'
        })
        toaster('Catalog berhasil dibuat' , true)

    } catch (error) {
        let errors = null

        if(error.response.data.validation_errors){
            errors = error.response.data.validation_errors
                Object.keys(errors).forEach(key => {
                errorBag.value[key] =  errors[key][0]
            })
        }else{
            errors = error.response.data
            errorBag.value['data'] =  errors.data
        }

        hasError.value = true
    }
}

watch([() => catalog.catalogFiles ] , ([currentFiles] , [oldFiles]) => {
    myFiles.value = currentFiles
})

</script>