<template>
 <Image1 /><NavBar />

<section class="mt-[330px] md:mt-[700px] px-16 md:px-24">
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
        </div>

    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="catalogs">
        <div class="w-full" v-for="(catalog, index) in catalogs">
            <Swiper v-if="reRenderSwiper" :images="customCatalogKey(catalog)" /> 
            <ImageSkeletonVue v-else />
            <div class="my-4 text-center w-full flex justify-center gap-4">
                <CatalogTitle v-if="index % 2 != 0" :variant="'variant2'">{{ catalog.motor_name }}</CatalogTitle>
                <CatalogTitle v-else :variant="'variant1'">{{ catalog.motor_name }}</CatalogTitle>
            </div>

            <router-link :to="{name: 'booking' , params:{motor_name: catalog.motor_name}}" v-if="authentication.customerToken"  class=" b mx-auto h-16 w-64 flex justify-center items-center">
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
        <h3 class="text-lg font-medium text-gray-800">Apa yang didapat</h3>
        <p class="text-sm font-light text-gray-600 my-3">
        The accordion is a graphical control element comprising a vertically stacked list of items such as labels or thumbnails
        </p>

        <div class="h-1 w-full mx-auto border-b my-5"></div>

        <!-- What is term -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>What is term?</h3>
        </div>
        
        </div>

        <!-- When to use Accordion Components -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>When to use Accordion Components?</h3>
        </div>
       
        </div>

        <!-- Accordion Wrapper -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>How can it be defined?</h3>
        </div>
       
        </div>

        <!-- Accordion Wrapper -->
        <div class="transition hover:bg-indigo-50">
        <!-- header -->
        <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
            <i class="fas fa-plus"></i>
            <h3>Chamber reached do he nothing be?</h3>
        </div>
      
        </div>
    </div>
    </div>
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <LoginRegis />
    </BaseModal>
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
import {customCatalogKey } from '@/helper/helperMethod';
import PageTitleVue from '@/components/Text/PageTitle.vue';
import LoginRegis from '@/components/Customer/LoginRegis.vue';


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

onMounted(async() => {
     await handleFetchCatalog()
})



</script>