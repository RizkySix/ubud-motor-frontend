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
import {front_local_url} from '@/helper/domain.js'

useHead({
  title: 'Motorbike Booking in Canggu, Bali - Latest Bikes & Best Prices',
  meta: [
    {
      name: 'description',
      content: 'Lavista Rental Bike is your best choice for motorbike rental in Canggu, Bali since 2019. We offer a wide range of the latest motorbikes, known for their quality and affordability. Our dedicated team is always ready to assist you with the best customer support for your ride of a lifetime.',
    },
    {
      name: 'keywords',
      content: 'motorbike rental, Canggu, Bali, motorbike for rent, latest bikes, best prices, customer support, riding, nmax, vespa, lavista rental bike, lavista, wisatawan, bule, cheap motor, explore Bali, tourist transportation, tropical adventure, scooter rental, vacation experience',
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
      content: 'Lavista Rental Bike is your best choice for motorbike rental in Canggu, Bali since 2019. We offer a wide range of the latest motorbikes, known for their quality and affordability. Our dedicated team is always ready to assist you with the best customer support for your ride of a lifetime.',
    },
    {
      property: 'og:image',
      content: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Foto.detik.com%2Fmotor%2Fd-6787665%2Fdaftar-harga-vespa-matic-juni-2023-dan-spesifikasinya&psig=AOvVaw2i9QI2SZWmlWdfi_6mygtp&ust=1698909749397000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKCGgJSiooIDFQAAAAAdAAAAABAL',
    },
    {
      property: 'og:url',
      content: front_local_url,
    },
  ],
})


</script>

