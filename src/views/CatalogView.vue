<template>
<Sidebar>
    <div class="w-full flex flex-wrap gap-12 md:gap-3 justify-between" v-if="catalogs">
        <div class="w-full md:w-[45%]" v-for="(catalog, index) in catalogs">
            <Swiper v-if="reRenderSwiper" :images="customCatalogKey(catalog)" /> 
            <ImageSkeletonVue v-else />
            <div class="my-4 text-center w-full flex justify-center gap-4">
                <CatalogTitle v-if="index % 2 != 0" :variant="'variant2'">{{ catalog.motor_name }}</CatalogTitle>
                <CatalogTitle v-else :variant="'variant1'">{{ catalog.motor_name }}</CatalogTitle>
                
                <div class="rounded-sm font-semibold cursor-pointer bg-yellow-300 px-4 py-1 h-1/2 mt-auto shadow-2xl flex gap-2">
                    <span @click="toggleModalCatalog(catalog.motor_name, catalog.charge , customCatalogKey(catalog))" >
                        <EditIcon :width="25" :height="25" />
                    </span>
                    <span @click="handleDeleteCatalog(catalog.motor_name)">
                        <DeleteIcon :width="25" :height="25" />
                    </span>
                    <router-link :to="{name: 'admin.add.package' , params: {motor_name: catalog.motor_name}}">
                        <PackageIcon :width="25" :height="25" />
                    </router-link>
                </div>
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
                    <td class="px-6 py-4 flex gap-1">
                        <button @click="toggleModal(catalog.motor_name, price)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <EditIcon :width="25" :height="25" />
                        </button>
                        <button @click="handleDeletePrice(price.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <DeleteIcon :width="25" :height="25" />
                        </button>
                    </td>
                
                </tr>
            </tbody>
        </table>
    </div>

        </div>
    </div>
    <CatalogSkeletonVue v-else />
    
  <BaseModal :modalActive="modalActive.price" @close-modal="toggleModal">
        <form @submit.prevent="handleUpdatePrice" class="p-5">
        <span class="font-bold"> {{ motorName }}</span>
        <div class="grid md:gap-6 mt-10">
            <div class="relative z-0 w-full mb-6 group">
                <FloatingInput v-model="prices.price" :type="'number'" :name="'price'" :id="'price'" :label="'Harga'" />
            </div>
        </div>
        <button @submit.prevent="handleUpdatePrice" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perbarui</button>
        </form>
    </BaseModal>


    <BaseModal :modalActive="modalActive.catalog" @close-modal="toggleModalCatalog">
        <div class="py-5">
            <Swiper :deleteEndpoint="'/catalog/' + motorName + '/image'" :images="showEditImage" :allowDelete="true" :allowUpdate="true" :imageId="'editCatalog'" /> 
           <form @submit.prevent="handleUpdateCatalog" class="px-5" enctype="multipart/form-data">
                <div class="relative z-0 w-full mb-6 group mt-5">
                    <FloatingInput v-model="activeCatalogData.motor_name" :type="'text'" :name="'motor_name'" :id="'motor_name'" :label="'Nama Motor'" />
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <FloatingInput v-model="activeCatalogData.charge" :type="'number'" :name="'charge'" :id="'charge'" :label="'Denda'" />
                </div>
                <button @submit.prevent="handleUpdateCatalog" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perbarui</button>  
        </form>
        </div>
    </BaseModal>
</Sidebar>
</template>

<script setup>
import { ref , reactive , onMounted, defineAsyncComponent  } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import CatalogTitle from '@/components/Text/CatalogTitle.vue';
import {http , url } from '@/helper/domain';
import {confirmation } from '@/helper/confirmation';
import {rpCurrency } from '@/helper/currency';
import FloatingInput from '@/components/Form/FloatingInput.vue';
import Swiper from '@/components/Swiper/Swiper.vue';
import toaster from '@/helper/toaster';
import { useCatalogStore } from '@/stores/catalog'
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import PackageIcon from '@/components/icons/PackageIcon.vue';
import ImageSkeletonVue from '@/components/Skeleton/ImageSkeleton.vue';
import CatalogSkeletonVue from '@/components/Skeleton/CatalogSkeleton.vue';
import {customCatalogKey } from '@/helper/helperMethod';

const BaseModal = defineAsyncComponent(() =>
    import ("@/components/Modal/BaseModal.vue")
)


const catalogs = ref(null)
const catalog = useCatalogStore()

//fetch catalog
const handleFetchCatalog = async() => {
    const response = await catalog.fetchCatalogAction() 
    catalogs.value = response
}


const prices = reactive({
    price: null,
    id: null
})

const motorName = ref('')
const activeCatalogData = reactive({
    motor_name: '',
    charge: null,
})

//update catalog price
const handleUpdatePrice = async() => {
    try {
        const response = await http().put('/catalog/prices/' + prices.id , prices)
        toggleModal()
        await handleFetchCatalog()
        toaster('Price berhasil diperbarui' , true)
    } catch (error) {
        //console.log(error.response.data)
    }
}

const modalActive = reactive({
    price: null,
    catalog: null
})


const toggleModal = (motor_name = null , data = []) => {
    modalActive.price = !modalActive.price

    motorName.value = motor_name
    for (const propName in prices) {
        prices[propName] = data[propName]
    }
    
}

const showEditImage = ref([])
const toggleModalCatalog = async( motor_name = null , charge = null , images = []) => {
    modalActive.catalog = !modalActive.catalog

    motorName.value = motor_name
    activeCatalogData.charge = charge
    activeCatalogData.motor_name = motor_name
    showEditImage.value = images
    
    //kosongkan statenya 
    catalog.catalogFiles = []
   
    if(catalog.refresh){
        handleRefresh()
        catalog.refresh = false
    }
}

const reRenderSwiper = ref(true)

//update catalog
const handleUpdateCatalog = async() => {
    try {
        const formData = new FormData()

        formData.append('motor_name' , activeCatalogData.motor_name)
        formData.append('charge' , activeCatalogData.charge)
        catalog.catalogFiles.first_catalog ? formData.append('first_catalog' , catalog.catalogFiles.first_catalog) : null
        catalog.catalogFiles.second_catalog ? formData.append('second_catalog' , catalog.catalogFiles.second_catalog) : null
        catalog.catalogFiles.third_catalog ? formData.append('third_catalog' , catalog.catalogFiles.third_catalog) : null
        formData.append('_method' , 'PUT')

        const response = await http().post('/catalog/' + motorName.value , formData)

        handleRefresh()
        toggleModalCatalog()
    
        toaster('Catalog berhasil diperbarui' , true)
    } catch (error) {
        //console.log(error.response.data)
    }
}

//handle delete catalog price
const handleDeletePrice = async(priceId) => {
    try {
        if(await confirmation() === false){
            return false
        }

        const response = await http().delete('/catalog/prices/' + priceId)
        await handleFetchCatalog()
        toaster('Price berhasil terhapus' , true)
    } catch (error) {
        //console.log(error.response.status)
        toaster('Price gagal dihapus' , false)
    }
}


const handleDeleteCatalog = async(motorName) => {
    try {
        if(await confirmation() === false){
            return false
        }

        const response = await http().delete('/catalog/' + motorName)
        handleRefresh()
        toaster('Catalog berhasil terhapus' , true)
    } catch (error) {
        //console.log(error.response.status)
        toaster('Catalog gagal dihapus' , false)
    }
}

const handleRefresh = async() => {
    reRenderSwiper.value = false
    await handleFetchCatalog()
    reRenderSwiper.value = true
}
onMounted(async() => {
     await handleFetchCatalog()
})





</script>