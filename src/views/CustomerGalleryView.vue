<template>
<CustomImageVue /><NavBar />

<section class="mt-[30px] md:mt-[50px] px-8 md:px-24 mb-14">
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
            <img :src="gallery.gallery_image" alt="" class="w-full h-[300px] md:h-[400px] max-w-full max-h-full object-cover cursor-pointer" @click="lightToggle(index)" >
        </div>
        <div v-else v-for="(skeleton , num) in 12" :key="num">
            <ImageSkeletonVue />
        </div>
    </div>
</section>
<BookingFloatingVue />
<SimpleFooterVue />


<FsLightbox
    :toggler="toggler"
    :sources="singleImage.length > 0 ? [singleImage] : lightImages"
    type="image"
/>
</template>

<script setup>
import { ref , reactive , onMounted, defineAsyncComponent  } from 'vue' 
import CustomImageVue from '@/components/LandingPage/CustomImage.vue';
import NavBar from "@/components/LandingPage/NavBar.vue"
import PageTitleVue from '@/components/Text/PageTitle.vue';
import ImageSkeletonVue from '@/components/Skeleton/ImageSkeleton.vue';
import BookingFloatingVue from '@/components/Customer/BookingFloating.vue';
import SimpleFooterVue from '@/components/LandingPage/SimpleFooter.vue';
import { useGalleryStore } from '@/stores/gallery'
import FsLightbox from "fslightbox-vue/v3";
import { useHead } from '@unhead/vue';
import { front_local_url } from '@/helper/domain';

useHead({
    title: 'Galleries Customer - Lavista Rental Bike',
    meta: [
      {
        name: 'description',
        content: 'Explore our customer galleries. See the best moments of our satisfied customers enjoying their bike rentals in Canggu, Bali.'
      },
      {
        name: 'keywords',
        content: 'galleries, customer photos, bike rental, Canggu, Bali, satisfied customers, Lavista Rental Bike'
      },
      {
        name: 'author',
        content: 'Lavista Rental Bike, rizky__666'
      },
      {
        property: 'og:title',
        content: 'Galleries Customer - Lavista Rental Bike'
      },
      {
        property: 'og:description',
        content: 'Explore our customer galleries. See the best moments of our satisfied customers enjoying their bike rentals in Canggu, Bali.'
      },
      {
        property: 'og:image',
        content: 'https://your-domain.com/customer-galleries.jpg'
      },
      {
        property: 'og:url',
        content: front_local_url + '/gallery'
      }
    ]
})


const gallery = useGalleryStore()
const galleries = ref(null)
const handleFetchGallery = async() => {
     const response = await gallery.fetchGalleryAction()
     galleries.value = response
     lightImages.value = galleries.value.map((item) => item.gallery_image);
}

const toggler = ref(false)
const lightImages = ref([])
const singleImage = ref([])

const lightToggle = (index) => {

    if(index > 0){
        singleImage.value = lightImages.value[index]

    }else{
        singleImage.value = []
    }
    toggler.value = !toggler.value
}
onMounted(async() => {
    await handleFetchGallery()
})
</script>