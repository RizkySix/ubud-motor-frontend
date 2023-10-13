<template>
  <div class="relative bg-white w-full h-auto md:h-[2420px] overflow-hidden">
    <Image1 /><NavBar /><SimpleBook /><Facilities />
    <FooterComp /> 
  </div>
</template>

<script setup>
import Image1 from "@/components/LandingPage/Image1.vue"
import NavBar from "@/components/LandingPage/NavBar.vue"
import Facilities from "@/components/LandingPage/Facilities.vue"
import SpecialOffers from "@/components/LandingPage/SpecialOffers.vue"
import FooterComp from "@/components/LandingPage/FooterComp.vue"
import SimpleBook from "@/components/LandingPage/SimpleBook.vue"

</script>

