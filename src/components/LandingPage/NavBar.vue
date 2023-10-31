<template>
  <div
    class="absolute top-[20px] md:top-[40px]  md:left-[140px] rounded-lg bg-white overflow-hidden hidden md:flex md:flex-row items-center justify-start py-[10px] md:py-[19px] px-[20px] md:px-[49px] gap-[20px] md:gap-[84px] text-left text-sm md:text-5xl text-gray-100 font-inter"
  >
    <router-link :to="{name: 'home'}" class="relative hover:text-blue-400 cursor-pointer">Home</router-link>
    <router-link :to="{name: 'catalogs'}" class="relative hover:text-blue-400 cursor-pointer">Catalog</router-link>
    <router-link :to="{name: 'booking'}" class="relative hover:text-blue-400 cursor-pointer">Booking</router-link>
    <div class="relative  w-[30px] md:w-[78px] h-[12px] md:h-[42px] text-center md:text-13xl font-inika">
      <b class="absolute top-[0px] left-[0px] leading-[64.3%]">
        <p class="m-0">Lavista</p>
        <p class="m-0">Rental</p>
      </b>
    </div>
    <router-link :to="{name: 'gallery'}" class="relative hover:text-blue-400 cursor-pointer">Gallery</router-link >
    <router-link :to="{name: 'about.us'}" class="relative hover:text-blue-400 cursor-pointer">About Us</router-link >
    <a href="../../src/assets/term.pdf" target="_blank"  class="relative hover:text-blue-400 cursor-pointer">Term & Conditions</a >
  </div>

  <!-- MOBILE -->
  <div
    class="absolute top-[20px] left-[30%] rounded-lg bg-white overflow-hidden w-[200px] block md:hidden py-[15px] px-[20px] text-gray-100 font-inter"
  >
    <div class="relative w-[30px] h-[12px] text-center md:text-13xl font-inika">
      <b class="absolute top-[0px] left-[40px] leading-[64.3%]">
        <p class="m-0">Lavista</p>
        <p class="m-0">Rental</p>
      </b>

      <div class="absolute top-[0px] left-[90px] leading-[64.3%] cursor-pointer" @click="toggleModal">
        <svg viewBox="0 0 24 24" width="40" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16ZM18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H18ZM18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z" fill="black"></path> </g></svg>
      </div>

    </div>
  
  </div>

  <Hamburger :modalActive="modalActive" @close-modal="toggleModal">
  <div class="  py-20 flex flex-col items-center justify-center text-center gap-4">
    <div class="menu-item hover:bg-slate-200 w-full">
      <router-link :to="{name: 'home'}" class="relative hover:text-blue-400 cursor-pointer text-2xl my-4">Home</router-link>
    </div>
    <div class="menu-item hover:bg-slate-200 w-full">
      <router-link :to="{name: 'catalogs'}" class="relative hover:text-blue-400 cursor-pointer text-2xl my-4">Catalog</router-link>
    </div>
    <div class="menu-item hover:bg-slate-200 w-full">
      <router-link :to="{name: 'booking'}" class="relative hover:text-blue-400 cursor-pointer text-2xl my-4">Booking</router-link>
    </div>
    <div class="menu-item hover:bg-slate-200 w-full">
      <router-link :to="{name: 'gallery'}" class="relative hover:text-blue-400 cursor-pointer text-2xl my-4">Gallery</router-link>
    </div>
    <div class="menu-item hover:bg-slate-200 w-full">
      <router-link :to="{name: 'about.us'}" class="relative hover:text-blue-400 cursor-pointer text-2xl my-4">About Us</router-link>
    </div>
    <div class="menu-item hover:bg-slate-200 w-full">
      <a href="../../src/assets/term.pdf" target="_blank" class="relative hover:text-blue-400 cursor-pointer text-2xl my-4">Term & Conditions</a>
    </div>
  </div>
</Hamburger>


</template>
<script setup>
import {ref} from "vue";

import Hamburger from '@/components/Modal/Hamburger.vue';

const modalActive = ref(null);

const toggleModal = () => {
    modalActive.value = !modalActive.value
}
 
</script>
