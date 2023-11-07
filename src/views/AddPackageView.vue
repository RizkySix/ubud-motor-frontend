<template>
    <Sidebar>
        <ValidationError v-if="hasError">
            <div v-for="(error , index) in errorBag" :key="index">
                <span class="text-xs md:text-sm" v-if="error">- {{ error }}</span>
            </div>
        </ValidationError>
        <form @submit.prevent="handleAddPackage">
            <div class="relative z-0 w-full mt-14 mb-6 group">
                <FloatingInput v-model="route.params.motor_name" :type="'text'" name="motor_name" :id="'motor_name'" :label="'Nama Motor'" :disable="true" />
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
            <button @submit.prevent="handleAddPackage" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tambah Paket</button>
        </form>
    </Sidebar>
</template>

<script setup>
import { ref , watch , reactive , onMounted } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import FloatingInput from '@/components/Form/FloatingInput.vue';
import { useRoute , useRouter } from 'vue-router';
import ValidationError from '@/components/Alert/ValidationError.vue';
import {http , url } from '@/helper/domain';
import toaster from '@/helper/toaster';


const route = useRoute()
const router = useRouter()

//default jumlah pricelist = 1;
const items = ref(1)

const selectedPackage = ref([])
const priceLists = ref([{}])

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

const errorBag = ref({})
const hasError = ref(false)

const handleAddPackage = async() => {
    try {
        const response = await http().post('/catalog/prices' , {
            motor_name: route.params.motor_name,
            price_lists: priceLists.value
        })

        router.push({
            name: 'admin.catalogs'
        })
        toaster('Berhasil menambah package' , true)
    } catch (error) {
        //console.log(error.response.data.validation_errors)

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

</script>