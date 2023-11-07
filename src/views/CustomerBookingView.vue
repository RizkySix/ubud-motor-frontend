<template>
 <CustomImageVue />
 <div class="flex justify-center items-center">
      <NavBar />
</div>

<section class="mt-[30px] md:mt-[50px] px-8 md:px-24 mb-14">
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

    <div class="flex flex-col lg:flex-row gap-4">
        <div class="w-full lg:w-1/3">
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

           <div class="w-full hidden lg:block">
                <div class="rounded-lg shadow-lg px-4 py-6 bg-slate-200 mt-5 border border-dashed">
                    <div class="text-center mb-4">
                        <CatalogTitle>
                            Information
                        </CatalogTitle>
                    </div>
                    <p class="text-gray-500">
                            For information on <span class="font-bold">units availability</span> or other information regarding motorbike rental, please contact us. Oh ya, we will only accept motorbike <span class="font-bold">delivery for bookings over 5 days</span>, but just fill in the delivery address input.
                    </p>

                    <div class="flex gap-4 mt-4">
                        <svg width="50" height="50" class="shadow-lg shadow-red-500 rounded-full" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Whatsapp-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E"> <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp"> </path> </g> </g> </g></svg>

                        <div class="flex flex-col text-gray-500">
                            <span class="font-bold text-2xl">087-762-582-176</span>
                            <span>WhatsApp/Telephone</span>
                        </div>
                    </div>
                </div>
           </div>
        </div>
        <div class="w-full lg:w-2/3">
            <div class="w-full">


                <div class="rounded-lg shadow-lg border border-dotted p-5">
                    <form @submit.prevent="handleMakeBooking" class="p-5">
                   
                        <div class="grid lg:grid-cols-2 lg:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput v-model="bookingData.full_name" :type="'text'" :name="'full_name'" :id="'full_name'" :label="'Your Name'" />
                                <ErrorMessage v-if="errorBag.full_name">{{ errorBag.full_name }}</ErrorMessage>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput v-model="bookingData.email" :type="'email'" :name="'email'" :id="'email'" :label="'Email'" />
                                <ErrorMessage v-if="errorBag.email">{{ errorBag.email }}</ErrorMessage>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 lg:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput v-model="bookingData.whatsapp_number" :type="'number'" :name="'whatsapp_number'" :id="'whatsapp_number'" :label="'Whatsapp Number'" />
                                <ErrorMessage v-if="errorBag.whatsapp_number">{{ errorBag.whatsapp_number }}</ErrorMessage>
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
                       
                        <div class="grid lg:grid-cols-2 lg:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <select @change="refreshAmount() , packageType()" required v-model="selectedPackage" id="package" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option selected disabled :value="{}">Available package</option>
                                <option v-for="(price, index) in selectedMotor.price_lists" :value="price" :key="index">
                                    {{ price.package }} ({{ rpCurrency(price.price) }}/{{ price.duration }} {{ price.duration_suffix }})
                                </option>
                                </select>
                            </div>
                    
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change-action="refreshAmount" v-model="bookingData.total_unit" :type="'number'" :name="'total_unit'" :id="'total_unit'" :label="'Total Unit'" />
                                <ErrorMessage v-if="errorBag.total_unit">{{ errorBag.total_unit }}</ErrorMessage>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 lg:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingInput @select-change="refreshAmount() , handleGetDiffDays()" v-model="bookingData.rental_date" :type="'datetime-local'" :name="'rental_date'" :id="'rental_date'" :label="'Rental Date (today/tomorrow)'" />
                                <ErrorMessage v-if="errorBag.rental_date">{{ errorBag.rental_date }}</ErrorMessage>
                            </div>

                            <div v-if="dailySuffix.includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @select-change="refreshAmount() , handleGetDiffDays()" v-model="returnDateOnly" :type="'date'" :name="'return_date'" :id="'return_date'" :label="'Return Date'" />
                                <ErrorMessage v-if="errorBag.return_date">{{ errorBag.return_date }}</ErrorMessage>
                            </div>

                            <div v-if="!dailySuffix.includes(selectedPackage.duration_suffix)" class="relative z-0 w-full mb-6 group">
                                <FloatingInput @change-action="refreshAmount" v-model="bookingData.rental_duration" :type="'number'" :name="'rental_duration'" :id="'rental_duration'" :label="'Rental Duration (ex: 2)'" />
                                <ErrorMessage v-if="errorBag.rental_duration">{{ errorBag.rental_duration }}</ErrorMessage>
                            </div>
                        </div>
                    
                        <div class="grid lg:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                              
                                <label for="hs-input-with-leading-and-trailing-icon" class="flex text-sm text-gray-500 dark:text-gray-400 mb-3">Total Amount
                                    <img v-if="waitingCalculate" class="h-4 w-4 ml-3 mt-1 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
                                </label>
                                    <div class="relative">
                                        <input readonly type="text" id="hs-input-with-leading-and-trailing-icon" name="hs-input-with-leading-and-trailing-icon" class="py-3 px-4 pl-9 pr-16 block w-full  shadow-sm rounded-md text-sm focus:z-10  dark:text-gray-400">
                                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                                        <span class="text-black font-bold">{{ rpCurrency(bookingData.amount) }}</span>
                                        </div>
                                        <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                                        </div>
                                    </div>
                                    <ErrorMessage v-if="errorBag.data">{{ errorBag.data }}</ErrorMessage>
                            </div>
                        </div>
                       
                        <div class="grid lg:gap-6" :class="{'lg:grid-cols-2': dailyDays >= 5 , 'lg:grid-cols-1': dailyDays < 5}">
                            <div v-if="dailyDays >= 5" class="relative z-0 w-full mb-6 group">
                                <FloatingGmap  :type="'text'" :name="'delivery_address'" :id="'delivery_address'" :label="'Delivery Address'" />
                                <ErrorMessage v-if="errorBag.delivery_address">{{ errorBag.delivery_address }}</ErrorMessage>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <FloatingGmap :modelValue="'Lavista Rental Bike, Gg. Jalak XV, Tibubeneng, Canggu, Badung Regency, Bali 80363'" :type="'text'" :name="'pickup_address'" :id="'pickup_address'" :label="'Pickup Address'" :readonly="true" />
                                <ErrorMessage v-if="errorBag.pickup_address">{{ errorBag.pickup_address }}</ErrorMessage>
                            </div>
                        </div>

                        <div class="grid lg:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                               
                                <label for="additional_message" class="block mb-2 text-sm text-gray-900">Additional Message</label>
                                <textarea v-model="bookingData.additional_message" id="additional_message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Any message??..."></textarea>


                            </div>
                        </div>
                        
                        <div class="grid lg:grid-cols-2 lg:gap-6">
                            <div class="relative z-0 w-full mb-6 group">
                                <div class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> your Passport picture</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, JPG, PDF </p>
                                        </div>
                                        <ErrorMessage v-if="errorBag.card_image">{{ errorBag.card_image }}</ErrorMessage>
                                        <input @change="handleChangePassport($event)" id="dropzone-file" type="file" class="hidden" />
                                    </label>
                                </div> 

                            </div>

                            <div class="relative z-0 w-full mb-6 group">
                                <div v-if="bookingData.card_image">
                                    <img v-if="passportType.image" :src="passportType.image" alt="Passport" id="previewPassport" class="rounded-lg h-[300px] lg:h-[350px] w-full object-cover">
                                    <embed v-if="passportType.pdf"  :src="passportType.pdf" type="application/pdf" id="previewPassportPdf" class="rounded-lg h-[300px] lg:h-[350px] w-full">
                                </div>
                                <ImageSkeletonVue v-else />
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                            <input v-model="termAgreement" id="remember" type="checkbox" :value="true" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agree with <a :href="naked_domain + '/storage/Term/term.pdf'" target="_blank" class="text-blue-500">Term and Conditions</a> </label>
                            
                        </div>
                        <ErrorMessage v-if="errorBag.agreement">{{ errorBag.agreement }}</ErrorMessage>


                    <button @submit.prevent="handleMakeBooking" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-3 mt-6">
                       <span class="mx-auto">
                        Make Booking
                       </span>  
                       <img v-if="waitingResponse" class="h-6 w-6 mx-auto animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="">
                    </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="w-full block lg:hidden">
                <div class="rounded-lg shadow-lg px-4 py-6 bg-slate-200 mt-5 border border-dashed">
                    <div class="text-center mb-4">
                        <CatalogTitle>
                            Information
                        </CatalogTitle>
                    </div>
                    <p class="text-gray-500">
                            For information on <span class="font-bold">units availability</span> or other information regarding motorbike rental, please contact us. Oh ya, we will only accept motorbike <span class="font-bold">delivery for bookings over 5 days</span>, but just fill in the delivery address input.
                    </p>

                    <div class="flex gap-4 mt-4">
                        <svg width="50" height="50" class="shadow-lg shadow-red-500 rounded-full" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Whatsapp-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E"> <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp"> </path> </g> </g> </g></svg>

                        <div class="flex flex-col text-gray-500">
                            <span class="font-bold text-2xl">087-762-582-176</span>
                            <span>WhatsApp/Telephone</span>
                        </div>
                    </div>
                </div>
           </div>
    </div>

   <BookingFloatingVue />
</section>
<SimpleFooterVue />
</template>

<script setup>
import { ref , watch , reactive , onMounted, defineAsyncComponent  } from 'vue' 
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
import ErrorMessage from '@/components/Form/ErrorMessage.vue';
import {http , url } from '@/helper/domain';
import {customCatalogKey } from '@/helper/helperMethod';
import toaster from '@/helper/toaster';
import BookingFloatingVue from '@/components/Customer/BookingFloating.vue';
import { useBookingStore } from '@/stores/booking';
import SimpleFooterVue from '@/components/LandingPage/SimpleFooter.vue';
import { useHead } from '@unhead/vue';
import { front_local_url, naked_domain } from '@/helper/domain';
import CustomImageVue from '@/components/LandingPage/CustomImage.vue';

useHead({
    title: 'Booking Page - Lavista Rental Bike',
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
        content: 'Booking Page - Lavista Rental Bike'
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

const catalogs = ref(null)
const catalog = useCatalogStore()
const authentication = useAuthenticationStore()
const booking = useBookingStore()
const authData = ref(null)
const termAgreement = ref(false)

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
const returnDateOnly = ref(null)
const passportType = reactive({
    image: null,
    pdf: null
})

//prop for diff daily package
const dailyDays = ref(0)
const dailySuffix = ['hours', 'hour', 'jam', 'jams']

//fetch catalog
const handleFetchCatalog = async() => {
    const response = await catalog.fetchCatalogAction() 
    catalogs.value = response
}


//handle check diff days rental date with return date
const handleGetDiffDays = () => {

    if(bookingData.rental_date && bookingData.return_date){
        //menghitung selisih waktu antara kedua tanggal
        let timeDiff = new Date(bookingData.rental_date) - new Date(bookingData.return_date)

        //menghitung selisih hari
        dailyDays.value = Math.abs(Math.ceil(timeDiff / (1000 * 3600 * 24))) + 1
    }

}

const refreshPackage = () => {
    selectedPackage.value = {}
    reRender.value = false
    setTimeout(() => {
        reRender.value = true
    }, 500);
}

const packageType = () => {

    if(!dailySuffix.includes(selectedPackage.value.duration_suffix)){
        dailyDays.value = selectedPackage.value.duration
    }else{
       handleGetDiffDays()
    }
}

const refreshAmount = async() => {
    
   if(bookingData.total_unit && bookingData.rental_date){
    await handleCalculatePrice()
   }
}

const waitingCalculate = ref(false)

//handle calculate price
const handleCalculatePrice = async() => {
    waitingCalculate.value = true
    let endpoint = '/booking/calculate?package=' + selectedPackage.value.id + '&total_unit=' + bookingData.total_unit + '&rental_date=' + bookingData.rental_date
    
    let rentalDate = bookingData.rental_date
    let [datePart, timePart] = rentalDate.split('T')


    switch (selectedPackage.value.duration_suffix) {
        case 'hours':
        case 'hour':
        case 'jam':
        case 'jams':
            bookingData.return_date = returnDateOnly.value + 'T' + timePart
            endpoint = endpoint + '&return_date=' + bookingData.return_date
            break;
    
        default:
            bookingData.return_date = null
            endpoint = endpoint + '&rental_duration=' + bookingData.rental_duration
            break;
    }

    try {
    const response = await http().get(endpoint)
    
    setTimeout(() => {
        bookingData.amount = response.data.data
    }, 30);
    waitingCalculate.value = false
    //console.log(response.data.data)
    
   } catch (error) {
    //console.log(error.response.data)
    waitingCalculate.value = false

    if(error.response.status == 401){
        toaster('Login before make an booking' , false)
    }

    const errors = error.response.data.validation_errors

    Object.keys(errors).forEach(key => {
        errorBag.value[key] =  errors[key][0]
    })
   }
}


const handleChangePassport = (e) => {
    const file = e.target.files[0]
    bookingData.card_image = file
    setTimeout(() => {
        if(file.type != 'application/pdf'){
            passportType.image = URL.createObjectURL(file)
            passportType.pdf = null
        }else{
            passportType.pdf = URL.createObjectURL(file)
            passportType.image = null
        }
    }, 5);
}

const errorBag = ref({})
const waitingResponse = ref(false)

const handleMakeBooking = async() => {
    
    if(!termAgreement.value ){
        errorBag.value['agreement'] = 'Please checklist the agreement'
        return false
    }
    waitingResponse.value = true
    const deliveryAddressInput = document.getElementById('delivery_address')

    bookingData.motor_name = selectedMotor.value.motor_name
    bookingData.package = selectedPackage.value.id
    bookingData.delivery_address =  deliveryAddressInput ? deliveryAddressInput.value : ''
    bookingData.pickup_address =  'Lavista Rental Bike, Gg. Jalak XV, Tibubeneng, Canggu, Badung Regency, Bali 80363'
    
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
        waitingResponse.value = false
        toaster('Booking created' , true)
        booking.newBooking += 1
        
    } catch (error) {
      //  console.log(error)
        waitingResponse.value = false
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
    returnDateOnly.value = null

    selectedMotor.value = {}
    selectedPackage.value = {}
    passportType.image = null
    passportType.pdf = null

    const deliveryAddressInput = document.getElementById('delivery_address')
    
    deliveryAddressInput ? deliveryAddressInput.value = '' : null
}


onMounted(async() => {
     await handleFetchCatalog()
     authData.value = await authentication.getUserAction()
     bookingData.full_name = authData.value.full_name
})

</script>