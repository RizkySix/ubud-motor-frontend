<template>
<CustomImageVue /><NavBar />

<section class="mt-[30px] md:mt-[50px] px-8 md:px-24 mb-14">
    <div class="title mx-auto">
        <div class="text-center py-4">
            <PageTitleVue>
                <template #default>
                    Renewal Form ({{ route.params.motor_name }})
                </template>
                <template #gradient>
                    Renewal Form ({{ route.params.motor_name }})
                </template>
            </PageTitleVue>
        </div>

    </div>

    <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full">
            <div class="w-full">
               <div v-if="hasError" class="mb-14">
                <ValidationError >
                    <div v-for="(error , index) in errorBag" :key="index">
                        <span class="text-xs md:text-sm" v-if="error">- {{ error }}</span>
                    </div>
                </ValidationError>
               </div>
                <div class="rounded-lg shadow-lg border border-dotted p-5">
                    <form @submit.prevent="handleAddRenewal" class="p-5">
                   
                     
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <select @change="refreshAmount" required v-model="selectedPackage" id="package" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option selected disabled :value="{}">Available package</option>
                                <option v-for="(price, index) in packages" :value="price" :key="index">
                                    {{ price.package }} ({{ rpCurrency(price.price) }}/{{ price.duration }} {{ price.duration_suffix }})
                                </option>
                                </select>
                            </div>
                    
                            <div v-if="['hours', 'hour', 'jam', 'jams'].includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @select-change="refreshAmount" v-model="renewalData.return_date" :type="'date'" :name="'return_date'" :id="'return_date'" :label="'Return Date'" />
                            </div>

                            <div v-if="!['hours', 'hour', 'jam', 'jams'].includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change-action="refreshAmount" v-model="renewalData.rental_duration" :type="'number'" :name="'rental_duration'" :id="'rental_duration'" :label="'Rental Duration (ex: 2) = 2 Month/Week'" />
                            </div>
                        </div>

                    
                    
                        <div class="grid md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <label for="hs-input-with-leading-and-trailing-icon" class=" text-sm text-gray-500 dark:text-gray-400 mb-3 flex gap-2">
                                    Total Amount
                                    <img v-if="waitingCalculate" class="h-4 w-4 ml-2 mt-1 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
                                </label>
                                    <div class="relative">
                                        <input readonly type="text" id="hs-input-with-leading-and-trailing-icon" name="hs-input-with-leading-and-trailing-icon" class="py-3 px-4 pl-9 pr-16 block w-full  shadow-sm rounded-md text-sm focus:z-10  dark:text-gray-400">
                                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                                        <span class="text-black font-bold">{{ rpCurrency(renewalData.amount) }}</span>
                                        </div>
                                        <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                                        </div>
                                    </div>
                            </div>
                        </div>
                     
                    <button @submit.prevent="handleAddRenewal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2">
                        <span class=" mx-auto">
                            Add Renewal
                        </span>
                        <img v-if="waitingResponse" class="h-5 w-5 ml-2 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
                    </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</section>
<SimpleFooterVue />
</template>

<script setup>
import { ref , reactive , onMounted, defineAsyncComponent  } from 'vue' 
import CustomImageVue from '@/components/LandingPage/CustomImage.vue';
import NavBar from "@/components/LandingPage/NavBar.vue"
import ValidationError from '@/components/Alert/ValidationError.vue';
import {rpCurrency } from '@/helper/currency';
import PageTitleVue from '@/components/Text/PageTitle.vue';
import FloatingInput from '@/components/Form/FloatingInput.vue';
import {http , url } from '@/helper/domain';
import toaster from '@/helper/toaster';
import { useRoute } from 'vue-router';
import { useBookingStore } from '@/stores/booking';
import SimpleFooterVue from '@/components/LandingPage/SimpleFooter.vue';
import { useHead } from '@unhead/vue';
import { front_local_url } from '@/helper/domain';

useHead({
    title: 'Renewal Page - Lavista Rental Bike',
    meta: [
      {
        name: 'description',
        content: 'Book your motor for your Bali adventure with Lavista Rental Bike.'
      },
      {
        name: 'author',
        content: 'Lavista Rental Bike, rizky__666'
      },
        {
        name: 'keywords',
        content: 'motorbike rental, Canggu, Bali, latest bikes, best prices, customer support, riding, nmax, vespa, lavista rental bike, lavista, wisatawan, bule, cheap motor',
        },
      {
        property: 'og:title',
        content: 'Renewal Page - Lavista Rental Bike'
      },
      {
        property: 'og:description',
        content: 'Book your motor for your Bali adventure with Lavista Rental Bike.'
      },
      {
        property: 'og:image',
        content: 'https://your-domain.com/booking-image.jpg'
      },{
      property: 'og:url',
      content: front_local_url + '/booking', // Replace with the actual URL
    },
    ]
})



const booking = useBookingStore()
const route = useRoute()
const packages = ref({})
const selectedPackage = ref({})

const renewalData = reactive({
    booking_detail_id: null,
    package: null,
    amount: 0,
    return_date: null,
    rental_duration: null,
})

const waitingResponse = ref(false)
const waitingCalculate = ref(false)

const handleGetPrice = async() => {
    try {
        const response = await http().get('/booking/price?motor_name=' + route.params.motor_name)
        packages.value = response.data.data
        console.log(response.data.data)
    } catch (error) {
        console.log(error.response.data)
    }
}

const refreshAmount = async() => {
    hasError.value = false
    await handleCalculatePrice()
    
}

//handle calculate price
const handleCalculatePrice = async() => {
    let endpoint = ''
    console.log(selectedPackage.value.duration_suffix)
    switch (selectedPackage.value.duration_suffix) {
        case 'hours':
        case 'hour':
        case 'jam':
        case 'jams':
            endpoint = '/booking/calculate?package=' + selectedPackage.value.id + '&total_unit=' + 1 + '&rental_date=' + route.params.return_date + '&return_date=' + renewalData.return_date
            renewalData.rental_duration = null
            break;
    
        default:
            endpoint = '/booking/calculate?package=' + selectedPackage.value.id + '&total_unit=' + 1 + '&rental_date=' + route.params.return_date + '&rental_duration=' + renewalData.rental_duration
            renewalData.return_date = null
            break;
    }

    try {
    waitingCalculate.value = true
    const response = await http().get(endpoint)
    waitingCalculate.value = false
    setTimeout(() => {
        renewalData.amount = response.data.data
    }, 100);

    console.log(response.data.data)

   } catch (error) {

    console.log(error.response.data)
    if(error.response.data.validation_errors){
        hasError.value = true
        errorBag.value = {
            return_date: 'Invalid return date'
        }
    }
   }
}

const hasError = ref(false)
const errorBag = ref(null)

const handleAddRenewal = async() => {
    renewalData.package = selectedPackage.value.id
    renewalData.booking_detail_id = route.params.id

    const form = {}
    Object.keys(renewalData).forEach(key => {
        const value = renewalData[key]
        if(value){
            form[key] = value
        }
    });

    try {
        waitingResponse.value = true
        const response = await http().post('/booking/extension' , form)
        waitingResponse.value = false
        toaster('Success Add Renewal', true)
        clearPayload()
        booking.newBooking += 1
    } catch (error) {
        console.log(error.response.data)
        waitingResponse.value = false
        errorBag.value = error.response.data
        hasError.value = true

    }
}

const clearPayload = () => {
    renewalData.booking_detail_id = null,
    renewalData.package = null,
    renewalData.amount = 0,
    renewalData.return_date = null,
    renewalData.rental_duration = null
}

onMounted(async() => {
    await handleGetPrice()
})
</script>