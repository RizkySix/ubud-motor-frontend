<template>
<CustomImageVue /><NavBar />

<section class="mt-[30px] md:mt-[50px] px-8 md:px-24 mb-14">
    <div class="title mx-auto">
        <div class="text-center py-4">
            <PageTitleVue>
                <template #default>
                    About Us
                </template>
                <template #gradient>
                    About Us
                </template>
            </PageTitleVue>
        </div>


        <div class="w-full grid md:grid-cols-2 gap-10">
            <div class="">
                <img src="@/assets/about-us.jpg" alt="AboutUS" class="object-cover">
            </div>
            <div class="">
                <h3 class="text-gray-500 font-bold text-13xl mb-4">
                    About Us
                </h3>
                <p class="text-gray-500 text-lg">
                    At <span class="font-bold">Lavista Rental Bike</span>, we've been redefining your two-wheeled adventures since 2019. Nestled in the heart of Bali's vibrant Canggu, our mission is simple: to provide you with the ultimate motorbike rental experience. We offer a diverse range of the latest, top-quality bikes at prices that won't break the bank. Whether you're cruising through the picturesque landscapes or navigating Bali's bustling streets, our fleet of motorcycles ensures that your journey is as smooth as the island breeze.
                </p> <br>
                <p class="text-gray-500 text-lg">
                    But we're not just about bikes; <span class="font-bold">we're about people</span>. Our dedicated team, comprised of passionate riders and Bali enthusiasts, knows this island inside out. With a deep understanding of your needs, they're always ready to assist, offering local insights, tips, and round-the-clock support. At Lavista Rental Bike., we're not just your motorbike rental service; we're your trusted travel companion. So, come and explore Bali like never before, and let the good times roll with Lavista Rental Bike.
                </p>
            </div>
        </div>

      <!--   <div class="w-full mx-auto mt-24">
            <h3 class="text-gray-500 font-bold text-13xl mb-4 text-center">
                Meet Our Team
            </h3>
            <div class="w-3/4 grid md:grid-cols-3 gap-4 mx-auto">
                <div class="text-center">
                    <img src="@/assets/fake-face.jpg" alt="AboutUS" class="object-cover rounded-lg mb-4">
                    <span class="font-semibold text-xl">I Putu Sange</span> <br>
                    <span class="font-semibold text-lg mt-2 text-gray-500">Owner Lavista Rental Bike</span>
                </div>
                <div class="text-center">
                    <img src="@/assets/fake-face.jpg" alt="AboutUS" class="object-cover rounded-lg mb-4">
                    <span class="font-semibold text-xl">I Putu Sange</span> <br>
                    <span class="font-semibold text-lg mt-2 text-gray-500">Owner Lavista Rental Bike</span>
                </div>
                <div class="text-center">
                    <img src="@/assets/fake-face.jpg" alt="AboutUS" class="object-cover rounded-lg mb-4">
                    <span class="font-semibold text-xl">I Putu Sange</span> <br>
                    <span class="font-semibold text-lg mt-2 text-gray-500">Owner Lavista Rental Bike</span>
                </div>
            </div>
        </div> -->

    </div>
</section>
<SimpleFooterVue />
</template>

<script setup>
import CustomImageVue from '@/components/LandingPage/CustomImage.vue';
import NavBar from "@/components/LandingPage/NavBar.vue"
import PageTitleVue from '@/components/Text/PageTitle.vue';
import SimpleFooterVue from '@/components/LandingPage/SimpleFooter.vue';
import { useHead } from '@unhead/vue';
import { front_local_url } from '@/helper/domain';

useHead({
    title: 'About Us - Lavista Rental Bike',
    meta: [
      {
        name: 'description',
        content: 'Lavista Rental Bike - Your trusted motorbike rental in Canggu, Bali since 2019. Discover the latest motorbike options with the best quality at affordable prices. Our knowledgeable team is ready to assist you anytime.'
      },
      {
        name: 'keywords',
        content: 'motorbike rental, Canggu, Bali, latest bikes, best prices, customer support, Lavista Rental Bike, Lavista, tourists, foreigners, affordable motorbike'
      },
      {
        name: 'author',
        content: 'Lavista Rental Bike, rizky__666'
      },
      {
        property: 'og:title',
        content: 'About Us - Lavista Rental Bike'
      },
      {
        property: 'og:description',
        content: 'Lavista Rental Bike - Your trusted motorbike rental in Canggu, Bali since 2019. Discover the latest motorbike options with the best quality at affordable prices. Our knowledgeable team is ready to assist you anytime.'
      },
      {
        property: 'og:image',
        content: 'https://your-domain.com/about-us.jpg'
      },
      {
        property: 'og:url',
        content: front_local_url + '/about-us'
      }
    ]
})

</script>