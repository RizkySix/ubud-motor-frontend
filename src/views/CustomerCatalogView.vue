<template>
 <CustomImageVue />
 <div class="flex justify-center items-center">
      <NavBar />
</div>

<section class="mt-[30px] md:mt-[50px] px-8 md:px-24">
    <div class="mx-auto">
        <div class="text-center py-4">
            <PageTitleVue>
                <template #default>
                    Our Collection & Package
                </template>
                <template #gradient>
                    Our Collection & Package
                </template>
            </PageTitleVue>

            <span class="text-center text-gray-500 text-xs md:text-base">Double click to preview full image of catalog</span>
        </div>

    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="catalogs">
        <div class="w-full" v-for="(catalog, index) in catalogs">
            <Swiper class="cursor-pointer" v-if="reRenderSwiper" :images="customCatalogKey(catalog)" @click="lightToggle(catalog) , activeImage = index" /> 
            <ImageSkeletonVue v-else />
            <div class="my-4 text-center w-full flex justify-center gap-4">
                <CatalogTitle v-if="index % 2 != 0" :variant="'variant2'">{{ catalog.motor_name }}</CatalogTitle>
                <CatalogTitle v-else :variant="'variant1'">{{ catalog.motor_name }}</CatalogTitle>
            </div>

            <router-link :to="{name: 'booking'}" v-if="authentication.customerToken"  class=" b mx-auto h-16 w-64 flex justify-center items-center">
            <div class="i h-12 w-32 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
            </div>
            <span class="text-center text-white font-semibold z-10 pointer-events-none">Booking</span>
            </router-link>

            <div v-else @click="toggleModal"  class=" b mx-auto h-16 w-64 flex justify-center items-center">
            <div class="i h-12 w-32 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
            </div>
            <button  type="button" class="text-center text-white font-semibold z-10 pointer-events-none">Booking</button>
            </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Package
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Duration
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
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
                
                </tr>
            </tbody>
        </table>
    </div>

    </div>
    </div>
    <CatalogSkeletonVue v-else />
  
    <!-- Accordion -->
    <div class="mt-24">
    <div class="w-full mx-auto rounded border border-l-4 shadow-lg mb-10">
    <div class="bg-white p-10 shadow-sm">
        <h3 class="text-lg font-medium text-gray-800">What will you get ?</h3>
        <p class="text-sm font-light text-gray-600 my-3">
            We guarantee your safety and completeness when riding
        </p>

        <div class="h-1 w-full mx-auto border-b my-5"></div>

        <!-- What is term -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>Two SNI standard helmets with the best quality.</h3>
        </div>
        
        </div>

        <!-- When to use Accordion Components -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>Handphone holder to help you navigate while riding.</h3>
        </div>
       
        </div>

        <!-- Accordion Wrapper -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>Motorbike with proper and good condition.</h3>
        </div>
       
        </div>

        <!-- Accordion Wrapper -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>And lastly of course a joy and unforgettable adventure ❤️.</h3>
        </div>
      
        </div>
    </div>
    </div>
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <LoginRegis />
    </BaseModal>
    <BookingFloatingVue />

</section>
<SimpleFooterVue />

<FsLightbox
    :toggler="toggler"
    :sources="lightImages"
    type="image"
    :key="activeImage"
/>
</template>

<script setup>
import { ref , watch , reactive , onMounted, defineAsyncComponent  } from 'vue' 
import NavBar from "@/components/LandingPage/NavBar.vue"
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import Swiper from '@/components/Swiper/Swiper.vue';
import ImageSkeletonVue from '@/components/Skeleton/ImageSkeleton.vue';
import CatalogSkeletonVue from '@/components/Skeleton/CatalogSkeleton.vue';
import { useCatalogStore } from '@/stores/catalog'
import { useAuthenticationStore } from '@/stores/authentication'
import {rpCurrency } from '@/helper/currency';
import {customCatalogKey } from '@/helper/helperMethod';
import PageTitleVue from '@/components/Text/PageTitle.vue';
import LoginRegis from '@/components/Customer/LoginRegis.vue';
import BookingFloatingVue from '@/components/Customer/BookingFloating.vue';
import SimpleFooterVue from '@/components/LandingPage/SimpleFooter.vue';
import FsLightbox from "fslightbox-vue/v3";
import { useHead } from '@unhead/vue';
import { front_local_url } from '@/helper/domain';
import CustomImageVue from '@/components/LandingPage/CustomImage.vue';


useHead({
  title: 'Catalog Motor - Lavista Rental Bike',
  meta: [
    {
      name: 'description',
      content: 'Explore our wide selection of motorbikes in Canggu. Find the perfect ride for your Bali adventure.'
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
      content: 'Catalog Motor - Lavista Rental Bike',
    },
    {
      property: 'og:description',
      content: 'Explore our wide selection of motorbikes in Canggu. Find the perfect ride for your Bali adventure.'
    },
    {
      property: 'og:image',
      content: 'https://example.com/catalog-motor.jpg', // Replace with the actual image URL
    },
    {
      property: 'og:url',
      content: front_local_url + '/catalogs', // Replace with the actual URL
    },
  ],
})



const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)

const catalogs = ref(null)
const catalog = useCatalogStore()
const authentication = useAuthenticationStore()

const reRenderSwiper = ref(true)

//fetch catalog
const handleFetchCatalog = async() => {
    const response = await catalog.fetchCatalogAction() 
    catalogs.value = response
}

const modalActive = ref(null)

const toggleModal = () => {
    modalActive.value = !modalActive.value
    localStorage.setItem('toPage' , 'booking')
}

const toggler = ref(false)
const lightImages = ref([])
const activeImage = ref(0)

const lightToggle = (catalog ) => {
  
    lightImages.value = []
  
    if(catalog.first_catalog){
         lightImages.value.push( catalog.first_catalog)
    }
 
    if(catalog.second_catalog){
        lightImages.value.push( catalog.second_catalog)
    }
 
    if(catalog.third_catalog){
        lightImages.value.push( catalog.third_catalog)
    }
    
    toggler.value = !toggler.value
}



onMounted(async() => {
     await handleFetchCatalog()
})



</script>