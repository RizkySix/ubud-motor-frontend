<template>
<Sidebar>
    <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4" v-if="galleries">
    <div v-for="(gallery, index) in galleries" :key="index">
        <div class="relative">
        <img class="w-full shadow-lg h-[150px] md:h-[250px]" :src="gallery.gallery_image" alt="ErrorImg" loading="lazy">
        <div class="absolute inset-0 flex items-center justify-center">
            <span @click="handleDeleteGallery(gallery.id)" class="shadow-lg p-5 rounded-full bg-gray-400 cursor-pointer bg-opacity-50 hover:bg-opacity-80">
                <DeleteIcon :width="30" :height="30" />
            </span>
        </div>
        </div>
    </div>
</div>
<GallerySkeletonVue v-else />

</Sidebar>
</template>

<script setup>
import { ref , watch , reactive , onMounted } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import {http , url } from '@/helper/domain';
import {confirmation } from '@/helper/confirmation';
import { useGalleryStore } from '@/stores/gallery'
import { useCatalogStore } from '@/stores/catalog'
import GallerySkeletonVue from '@/components/Skeleton/GallerySkeleton.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import toaster from '@/helper/toaster';

const gallery = useGalleryStore()
const catalog = useCatalogStore()
const galleries = ref(null)

const handleFetchGalleries = async() => {
    const response = await gallery.fetchGalleryAction()
    galleries.value = response
    console.log(galleries.value)
}

const handleDeleteGallery = async(galleryId) => {

    if(await confirmation() === false){
        return false
    }

    const response = await catalog.deleteTempImgAction(null , '/gallery/' + galleryId)
    console.log(response)
    await handleFetchGalleries()
    toaster('Berhasil hapus gallery' , true)
}

onMounted(async() => {
    await handleFetchGalleries()
})
</script>