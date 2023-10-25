<template>
    <div class="w-full flex flex-wrap gap-12 md:gap-3 justify-between mb-72">
      <div class="w-full md:w-[45%]" v-for="(catalog, index) in catalogs">
        <!-- Skeleton for the image -->
        <div class="skeleton h-[300px] md:h-[350px] w-full"></div>
  
        <div class="my-4 text-center w-full flex justify-center gap-4">
          <div class="rounded-sm font-semibold cursor-pointer bg-gray-50 px-4 py-1 h-1/2 mt-auto shadow-2xl flex gap-2">
            <!-- Skeleton for the buttons -->
            <span><button class="skeleton-button"></button></span>
            <span><button class="skeleton-button"></button></span>
            <span><button class="skeleton-button"></button></span>
          </div>
        </div>
  
        <!-- Skeleton for the table -->
        <div class="relative shadow-md sm:rounded-lg skeleton-table">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <!-- Skeleton for package name -->
                  <div class="skeleton-text"></div>
                </th>
                <td class="px-6 py-4">
                  <!-- Skeleton for duration -->
                  <div class="skeleton-text"></div>
                </td>
                <td class="px-6 py-4">
                  <!-- Skeleton for price -->
                  <div class="skeleton-text"></div>
                </td>
                <td class="px-6 py-4 flex gap-1">
                  <!-- Skeleton for buttons -->
                  <button><div class="skeleton-button"></div></button>
                  <button><div class="skeleton-button"></div></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    
  </template>
 
 <script setup>
 import {ref} from 'vue'
const catalogs = ref(10)
</script>

<style scoped>
/* CSS for the skeleton effect */
.skeleton {
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 0.25rem;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.skeleton-button {
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 0.25rem;
  width: 25px; /* Adjust the width as needed */
  height: 25px; /* Adjust the height as needed */
  display: block;
  overflow-x: hidden;
}

.skeleton-text {
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 0.25rem;
  width: 100px; /* Adjust the width as needed */
  height: 20px; /* Adjust the height as needed */
  display: block;
  overflow-x: hidden;
}

.skeleton-table {
  background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px);
  animation: loading 1.5s infinite;
  border-radius: 0.25rem;
  width: 100%;
  height: auto;
  overflow-x: hidden;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

</style>