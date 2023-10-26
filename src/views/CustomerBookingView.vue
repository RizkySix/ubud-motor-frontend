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
            <div class="text-center mb-2">
                <CatalogTitle>
                    Preview Motor
                </CatalogTitle>
            </div>
            <Swiper v-if="Object.keys(selectedMotor).length !== 0 && reRender" :images="customCatalogKey({
                        first_catalog: selectedMotor.first_catalog,
                        second_catalog: selectedMotor.second_catalog,
                        third_catalog: selectedMotor.third_catalog,
                })" /> 
                <ImageSkeletonVue v-else />
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
                            
                                <select @change="refreshPackage" required v-model="selectedMotor" id="motor_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option selected disabled :value="{}">Choose your bike</option>
                                <option v-for="(catalog, index) in catalogs" :value="catalog" :key="index">
                                    {{ catalog.motor_name }}
                                </option>
                                </select>

                            </div>
                        </div>
                       
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <select @change="refreshAmount" required v-model="selectedPackage" id="package" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option selected disabled :value="{}">Available package</option>
                                <option v-for="(price, index) in selectedMotor.price_lists" :value="price" :key="index">
                                    {{ price.package }} ({{ rpCurrency(price.price) }}/{{ price.duration }} {{ price.duration_suffix }})
                                </option>
                                </select>
                            </div>
                    
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change-action="refreshAmount" v-model="bookingData.total_unit" :type="'number'" :name="'total_unit'" :id="'total_unit'" :label="'Total Unit'" />
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput @select-change="refreshAmount" v-model="bookingData.rental_date" :type="'date'" :name="'rental_date'" :id="'rental_date'" :label="'Rental Date'" />
                            </div>

                            <div v-if="['hours', 'hour', 'jam', 'jams'].includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @select-change="refreshAmount" v-model="bookingData.return_date" :type="'date'" :name="'return_date'" :id="'return_date'" :label="'Return Date'" />
                            </div>

                            <div v-if="!['hours', 'hour', 'jam', 'jams'].includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change-action="refreshAmount" v-model="bookingData.rental_duration" :type="'number'" :name="'rental_duration'" :id="'rental_duration'" :label="'Rental Duration (ex: 2) = 2 Month/Week'" />
                            </div>
                        </div>
                    
                        <div class="grid md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <label for="hs-input-with-leading-and-trailing-icon" class="block text-sm text-gray-500 dark:text-gray-400 mb-3">Total Amount</label>
                                    <div class="relative">
                                        <input readonly type="text" id="hs-input-with-leading-and-trailing-icon" name="hs-input-with-leading-and-trailing-icon" class="py-3 px-4 pl-9 pr-16 block w-full  shadow-sm rounded-md text-sm focus:z-10  dark:text-gray-400">
                                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                                        <span class="text-black font-bold">{{ rpCurrency(bookingData.amount) }}</span>
                                        </div>
                                        <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                                        </div>
                                    </div>
                            </div>
                        </div>
                       
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingGmap  :type="'text'" :name="'delivery_address'" :id="'delivery_address'" :label="'Delivery Address'" />
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingGmap :type="'text'" :name="'pickup_address'" :id="'pickup_address'" :label="'Pickup Address'" />
                            </div>
                        </div>

                        <div class="grid md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                               
                                <label for="additional_message" class="block mb-2 text-sm text-gray-900">Additional Message</label>
                                <textarea v-model="bookingData.additional_message" id="additional_message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Any message??..."></textarea>


                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <div class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> your Passport picture</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
                                        </div>
                                        <input @change="handleChangePassport($event)" id="dropzone-file" type="file" class="hidden" />
                                    </label>
                                </div> 

                            </div>

                            <div class="relative z-0 w-full mb-6 group">
                                <img v-if="bookingData.card_image" src="" alt="Passport" id="previewPassport" class="rounded-lg h-[300px] md:h-[350px] w-full">
                                <ImageSkeletonVue v-else />
                            </div>
                        </div>
                        
                     
                    <button @submit.prevent="handleMakeBooking" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buat Booking</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

   <BookingFloatingVue />
</section>
</template>

<script setup>
import { ref , watch , reactive , onMounted, defineAsyncComponent  } from 'vue' 
import Image1 from "@/components/LandingPage/Image1.vue"
import NavBar from "@/components/LandingPage/NavBar.vue"
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import Swiper from '@/components/Swiper/Swiper.vue';
import ImageSkeletonVue from '@/components/Skeleton/ImageSkeleton.vue';
import { useCatalogStore } from '@/stores/catalog'
import { useAuthenticationStore } from '@/stores/authentication'
import {rpCurrency } from '@/helper/currency';
import PageTitleVue from '@/components/Text/PageTitle.vue';
import FloatingInput from '@/components/Form/FloatingInput.vue';
import FloatingGmap from '@/components/Form/FloatingGmap.vue';
import {http , url } from '@/helper/domain';
import {customCatalogKey } from '@/helper/helperMethod';
import toaster from '@/helper/toaster';
import BookingFloatingVue from '@/components/Customer/BookingFloating.vue';

const catalogs = ref(null)
const catalog = useCatalogStore()
const authentication = useAuthenticationStore()
const authData = ref(null)


//selecte motor
const selectedMotor = ref({})
const selectedPackage = ref({})
const reRender = ref(true)

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
    reRender.value = false
    setTimeout(() => {
        reRender.value = true
    }, 500);
}

const refreshAmount = async() => {
   if(bookingData.total_unit && bookingData.rental_date){
    await handleCalculatePrice()
   }
}

//handle calculate price
const handleCalculatePrice = async() => {
    let endpoint = ''

    switch (selectedPackage.value.duration_suffix) {
        case 'hours':
        case 'hour':
        case 'jam':
        case 'jams':
            endpoint = '/booking/calculate?package=' + selectedPackage.value.id + '&total_unit=' + bookingData.total_unit + '&rental_date=' + bookingData.rental_date + '&return_date=' + bookingData.return_date
            break;
    
        default:
            endpoint = '/booking/calculate?package=' + selectedPackage.value.id + '&total_unit=' + bookingData.total_unit + '&rental_date=' + bookingData.rental_date + '&rental_duration=' + bookingData.rental_duration
            break;
    }

    try {
    const response = await http().get(endpoint)
    
    setTimeout(() => {
        bookingData.amount = response.data.data
    }, 30);

    console.log(response.data.data)
   } catch (error) {
    console.log(error.response.data)
   }
}


const handleChangePassport = (e) => {
    const file = e.target.files[0]
    bookingData.card_image = file
    setTimeout(() => {
        document.getElementById('previewPassport').src = URL.createObjectURL(file)
    }, 5);
}

const handleMakeBooking = async() => {
    bookingData.motor_name = selectedMotor.value.motor_name
    bookingData.package = selectedPackage.value.id
    bookingData.delivery_address =  document.getElementById('delivery_address').value
    bookingData.pickup_address =  document.getElementById('pickup_address').value
    
    const form = new FormData()
    Object.keys(bookingData).forEach(key => {
        const value = bookingData[key]
        if(value){
            form.append(key , value )
        }
    });

    try {
        const response = await http().post('/booking' , form)
        clearPayload()
        toaster('Booking berhasil dibuat' , true)
        
    } catch (error) {
        console.log(error.response.data)
    }
}

const clearPayload = () => {
    bookingData.email = ''
    bookingData.total_unit = null
    bookingData.whatsapp_number = ''
    bookingData.motor_name = ''
    bookingData.package = null
    bookingData.amount = 0
    bookingData.delivery_address = ''
    bookingData.pickup_address = ''
    bookingData.rental_date = null
    bookingData.return_date = null
    bookingData.rental_duration = null
    bookingData.card_image = ''
    bookingData.additional_message = ''

    selectedMotor.value = {}
    selectedPackage.value = {}
}


onMounted(async() => {
     await handleFetchCatalog()
     authData.value = await authentication.getUserAction()
     bookingData.full_name = authData.value.full_name
})

</script>