<template>
<Sidebar>
    <FilePond :uploadTempEndpoint="url+'/temp/gallery'" :deleteTempEndpoint="'/temp/gallery'" :maxMultipleFile="5" />

<ValidationError v-if="hasError">
    <span class="text-xs md:text-sm">- {{ errorBag.gallery_image }}</span>
</ValidationError>
    <form @submit.prevent="storeGallery" class="mt-10">
        <button @submit.prevent="storeGallery" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tambah Gallery</button>
    </form>
</Sidebar>
</template>

<script setup>
import { ref , watch , reactive } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import ValidationError from '@/components/Alert/ValidationError.vue';
import { useCatalogStore } from '@/stores/catalog' 
import {http , url} from '@/helper/domain';
import FilePond from '@/components/Admin/FilePond.vue';
import toaster from '@/helper/toaster';
import { useRouter } from 'vue-router';

const catalog = useCatalogStore()
const router = useRouter()
const myFiles = ref([])

const hasError = ref(false)
const errorBag = reactive({
    gallery_image: ''
})
const storeGallery = async () => {
    try {
        const response =  await http().post('/gallery' , {
            gallery_image: myFiles.value
        })

        console.log(response.data)
        router.push({
            name: 'admin.dashboard'
        })
        toaster('Gallery berhasil dibuat' , true)

    } catch (error) {
        const errors = error.response.data.validation_errors
        errorBag.gallery_image = errors['gallery_image'][0]
      
        hasError.value = true
    }
}

watch([() => catalog.catalogFiles ] , ([currentFiles] , [oldFiles]) => {
    myFiles.value = currentFiles
})

</script>