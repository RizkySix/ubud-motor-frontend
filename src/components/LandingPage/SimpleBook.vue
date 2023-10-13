<template>
  <div
    class="absolute top-[738px] left-[123px] hidden md:flex flex-col items-center justify-center gap-[8px] text-left text-base text-black font-inter"
  >
    <div class="relative rounded-23xl bg-aliceblue w-[1194px] h-80 z-[0]" />
    <div
      class="my-0 mx-[!important] absolute top-[36px] left-[460px] flex flex-col items-center justify-center gap-[9px] z-[1] text-center text-13xl"
    >
      <div class="relative font-medium">Simple Booking </div>
      <div class="relative text-xl font-medium text-dimgray">
       No worry of lot booking flow just 3 steps!
      </div>
    </div>
    <div
      class="my-0 mx-[!important] absolute top-[160px] flex items-center justify-center gap-[35px] z-[2]"
    >
    
    <div class=" b mx-auto h-16 w-64 flex justify-center items-center">
      <div class="i h-16 w-64 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-white font-semibold z-10 pointer-events-none">Choose your favorite bike!</a>
    </div>

    <div class=" b mx-auto h-16 w-64 flex justify-center items-center">
      <div class="i h-16 w-64 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-white font-semibold z-10 pointer-events-none">Make an booking!</a>
    </div>

    <div class=" b mx-auto h-16 w-64 flex justify-center items-center">
      <div class="i h-16 w-64 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-white font-semibold z-10 pointer-events-none">Take and pay on the spot!</a>
    </div>

    </div>


    <div
      class="my-0 mx-[!important] -mt-6 flex items-center justify-center gap-[35px] z-[2]"
    >
    
    <div class="b animate-bounce mx-auto h-16 w-64 flex justify-center items-center">
      <div class="i h-16 w-64 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-5xl text-white font-semibold z-10 pointer-events-none flex justify-content items-center"><span class=""></span>Book Now !!!</a>
    </div>

    </div>
   
  </div>

  <!-- MOBILE -->
  <div
    class="flex md:hidden px-5 mt-[350px] flex-col items-center justify-center gap-[8px] text-left text-base text-black font-inter"
  >
    <div class=" rounded-23xl bg-aliceblue w-full h-64 z-[0] p-5">
    <div
      class="my-0 mx-[!important] flex flex-col items-center justify-center gap-[9px] z-[1] text-center text-13xl mb-10"
    >
      <div class=" font-medium">Simple Booking </div>
      <div class=" text-base font-medium text-dimgray">
        No worry of lot booking flow just 3 steps!
      </div>
    </div>

    <div
      class="my-0 mx-[!important] flex items-center justify-center gap-[35px] z-[2] mb-10 px-10"
    >
    
    <div class=" b mx-auto h-16 w-32 flex justify-center items-center">
      <div class="i h-16 w-32 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-xs text-white font-semibold z-10 pointer-events-none">Choose your favorite bike!</a>
    </div>

    <div class=" b mx-auto h-16 w-32 flex justify-center items-center">
      <div class="i h-16 w-32 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-xs text-white font-semibold z-10 pointer-events-none">Make an booking!</a>
    </div>

    <div class=" b mx-auto h-16 w-32 flex justify-center items-center">
      <div class="i h-16 w-32 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-xs text-white font-semibold z-10 pointer-events-none">Take and pay on the spot!</a>
    </div>

    </div>


    <div
      class=" mt-8 mx-[!important] flex items-center justify-center gap-[35px] z-[2]"
    >
    
    <div class="b animate-bounce mx-auto h-16 w-48 flex justify-center items-center">
      <div class="i h-16 w-48 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
      </div>
      <a class="text-center text-xl text-white font-semibold z-10 pointer-events-none flex justify-content items-center"><span class=""></span>Book Now !!!</a>
    </div>

    </div>
   </div>
  </div>
</template>

<script setup>
 
</script>

<style scoped>
.wobble {
  animation: wobble 2s ease infinite;
}
@keyframes wobble {
  0% { transform: translateX(0%); }
  15% { transform: translateX(-25%) rotate(-5deg); }
  30% { transform: translateX(20%) rotate(3deg); }
  45% { transform: translateX(-15%) rotate(-3deg); }
  60% { transform: translateX(10%) rotate(2deg); }
  75% { transform: translateX(-5%) rotate(-1deg); }
  100% { transform: translateX(0%); }
}
</style>
