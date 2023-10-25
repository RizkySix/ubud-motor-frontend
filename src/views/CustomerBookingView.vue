<template>
 <Image1 /><NavBar />

<section class="mt-[330px] md:mt-[700px] px-16 md:px-24 mb-14">
    <div class="title mx-auto">
        <div class="text-center py-4">
            <PageTitleVue>
                <template #default>
                    Booking Form
                </template>
                <template #gradient>
                    Booking Form
                </template>
            </PageTitleVue>
        </div>

    </div>

    <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full md:w-1/3">
           <div class="w-full">
                <div class="bg-red-500">
                    yaa
                </div>
           </div>
        </div>
        <div class="w-full md:w-2/3">
            <div class="w-full">
                <div class="rounded-lg shadow-lg border border-dotted p-5">
                    <form @submit.prevent="handleMakeBooking" class="p-5">
                   
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput v-model="bookingData.full_name" :type="'text'" :name="'full_name'" :id="'full_name'" :label="'Your Name'" />
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput v-model="bookingData.email" :type="'email'" :name="'email'" :id="'email'" :label="'Email'" />
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput v-model="bookingData.whatsapp_number" :type="'number'" :name="'whatsapp_number'" :id="'whatsapp_number'" :label="'Whatsapp Number'" />
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                            
                                <select @change="refreshPackage" required v-model="selectedMotor" id="motor_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled :value="{}">Choose your bike</option>
                                <option v-for="(catalog, index) in catalogs" :value="catalog" :key="index">
                                    {{ catalog.motor_name }}
                                </option>
                                </select>

                            </div>
                        </div>
                       
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <select @change="refreshAmount" required v-model="selectedPackage" id="package" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled :value="{}">Available package</option>
                                <option v-for="(price, index) in selectedMotor.price_lists" :value="price" :key="index">
                                    {{ price.package }} ({{ rpCurrency(price.price) }}/{{ price.duration }} {{ price.duration_suffix }})
                                </option>
                                </select>
                            </div>
                    
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change="refreshAmount" v-model="bookingData.total_unit" :type="'text'" :name="'total_unit'" :id="'total_unit'" :label="'Total Unit'" />
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change="refreshAmount" v-model="bookingData.rental_date" :type="'date'" :name="'rental_date'" :id="'rental_date'" :label="'Rental Date'" />
                            </div>

                            <div v-if="['hours', 'hour', 'jam', 'jams'].includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change="refreshAmount" v-model="bookingData.return_date" :type="'date'" :name="'return_date'" :id="'return_date'" :label="'Return Date'" />
                            </div>

                            <div v-if="!['hours', 'hour', 'jam', 'jams'].includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change="refreshAmount" v-model="bookingData.rental_duration" :type="'number'" :name="'rental_date'" :id="'rental_date'" :label="'Rental Duration (ex: 2) = 2 Month/Week'" />
                            </div>
                        </div>
                    
                        <div class="grid md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput v-model="bookingData.amount" :type="'text'" :name="'amount'" :id="'amount'" :label="'Total Amount'" />
                            </div>
                        </div>

                        
                   
                    <button @submit.prevent="handleMakeBooking" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perbarui</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref , watch , reactive , onMounted, defineAsyncComponent  } from 'vue' 
import Image1 from "@/components/LandingPage/Image1.vue"
import NavBar from "@/components/LandingPage/NavBar.vue"
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import Swiper from '@/components/Swiper/Swiper.vue';
import ImageSkeletonVue from '@/components/Skeleton/ImageSkeleton.vue';
import CatalogSkeletonVue from '@/components/Skeleton/CatalogSkeleton.vue';
import { useCatalogStore } from '@/stores/catalog'
import { useAuthenticationStore } from '@/stores/authentication'
import {rpCurrency } from '@/helper/currency';
import PageTitleVue from '@/components/Text/PageTitle.vue';
import LoginRegis from '@/components/Customer/LoginRegis.vue';
import FloatingInput from '@/components/Form/FloatingInput.vue';
import {http , url } from '@/helper/domain';

const catalogs = ref(null)
const catalog = useCatalogStore()

//selecte motor
const selectedMotor = ref({})
const selectedPackage = ref({})

const bookingData = reactive({
    full_name: '',
    email: '',
    total_unit: null,
    whatsapp_number: '',
    motor_name: '',
    package: null,
    amount: 0,
    delivery_address: '',
    pickup_address: '',
    rental_date: null,
    return_date: null,
    rental_duration: null,
    card_image: '',
    additional_message: ''
})

//fetch catalog
const handleFetchCatalog = async() => {
    const response = await catalog.fetchCatalogAction() 
    catalogs.value = response
}

const refreshPackage = () => {
    selectedPackage.value = {}
}

const refreshAmount = async() => {
    await handleCalculatePrice()
}

//handle calculate price
const handleCalculatePrice = async() => {
    
    try {
    const response = await http().get('/booking/calculate?package=' + selectedPackage.value.id + '&total_unit=' + bookingData.total_unit + '&rental_date=' + bookingData.rental_date + '&rental_duration=' + bookingData.rental_duration)
    bookingData.amount = response.data.data
    console.log(response.data.data)
   } catch (error) {
    console.log(error.response.data)
   }
}

const handleMakeBooking = async() => {
  
}

onMounted(async() => {
     await handleFetchCatalog()
})

</script>