<template>
 <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
    <div v-for="(gallery, index) in galleries" :key="index">
        <div class="w-full shadow-lg h-[150px] md:h-[250px] skeleton" ></div>
    </div>
</div>
</template>

<script setup>
import {ref} from 'vue'
const galleries = ref(12)
</script>


<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

</style>