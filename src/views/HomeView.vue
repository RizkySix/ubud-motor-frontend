<template>
  <div class="relative bg-white w-full h-auto md:h-[3000px] overflow-hidden">
    <Image1 /><NavBar /><SimpleBook /><Facilities />
    <LocationMapVue/>
    <FooterComp />
  </div>
  <BookingFloatingVue  />
</template>

<script setup>
import Image1 from "@/components/LandingPage/Image1.vue"
import NavBar from "@/components/LandingPage/NavBar.vue"
import Facilities from "@/components/LandingPage/Facilities.vue"
import SpecialOffers from "@/components/LandingPage/SpecialOffers.vue"
import FooterComp from "@/components/LandingPage/FooterComp.vue"
import SimpleBook from "@/components/LandingPage/SimpleBook.vue"
import BookingFloatingVue from '@/components/Customer/BookingFloating.vue';
import LocationMapVue from "@/components/LandingPage/LocationMap.vue"
import { useHead } from '@unhead/vue'

useHead({
  title: 'Motorbike Booking in Canggu, Bali - Latest Bikes & Best Prices',
  meta: [
    {
      name: 'description',
      content: 'Motorbike booking in Canggu, Bali since 2019. Discover a variety of the latest motorbikes with the best quality and affordable prices. Our team is ready to assist you anytime.',
    },
    {
      name: 'keywords',
      content: 'motorbike rental, Canggu, Bali, latest bikes, best prices, customer support, riding, nmax, vespa, lavista rental bike, lavista, wisatawan, bule, cheap motor',
    },
    {
      name: 'author',
      content: 'Lavista Rental Bike, rizky__666',
    },
    {
      property: 'og:title',
      content: 'Motorbike Booking in Canggu, Bali - Latest Bikes & Best Prices',
    },
    {
      property: 'og:description',
      content: 'Motorbike booking in Canggu, Bali since 2019. Discover a variety of the latest motorbikes with the best quality and affordable prices. Our team is ready to assist you anytime.',
    },
    {
      property: 'og:image',
      content: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Foto.detik.com%2Fmotor%2Fd-6787665%2Fdaftar-harga-vespa-matic-juni-2023-dan-spesifikasinya&psig=AOvVaw2i9QI2SZWmlWdfi_6mygtp&ust=1698909749397000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKCGgJSiooIDFQAAAAAdAAAAABAL',
    },
    {
      property: 'og:url',
      content: 'https://ubur-motor.vercel.app/',
    },
  ],
})

</script>

