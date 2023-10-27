<template>
<Image1 /><NavBar />

<section class="mt-[330px] md:mt-[700px] px-16 md:px-24 mb-14">
    <div class="title mx-auto">
        <div class="text-center py-4">
            <PageTitleVue>
                <template #default>
                    Customer & Galleries
                </template>
                <template #gradient>
                    Customer & Galleries
                </template>
            </PageTitleVue>
        </div>

    </div>

   
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-if="galleries" v-for="(gallery, index) in galleries" :key="index">
            <img :src="gallery.gallery_image" alt="" class="w-full h-auto max-w-full max-h-full object-cover">
        </div>
        <div v-else v-for="(skeleton , num) in 12" :key="num">
            <ImageSkeletonVue />
        </div>
    </div>
</section>
<BookingFloatingVue />
</template>

<script setup>
import { ref , reactive , onMounted, defineAsyncComponent  } from 'vue' 
import Image1 from "@/components/LandingPage/Image1.vue"
import NavBar from "@/components/LandingPage/NavBar.vue"
import PageTitleVue from '@/components/Text/PageTitle.vue';
import {http , url } from '@/helper/domain';
import ImageSkeletonVue from '@/components/Skeleton/ImageSkeleton.vue';
import BookingFloatingVue from '@/components/Customer/BookingFloating.vue';

const galleries = ref(null)
const handleFetchGallery = async() => {
    try {
        const response = await http().get('/gallery')
        console.log(response.data.data)
        galleries.value = response.data.data
        console.log(galleries.value)
    } catch (error) {
        console.log(error.response.data)
    }
}

onMounted(async() => {
    await handleFetchGallery()
})
</script>