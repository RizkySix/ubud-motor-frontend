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

</script>

