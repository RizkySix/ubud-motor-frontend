<template>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    }"
    >
      <swiper-slide v-for="(image , index) in images" :key="index">
        <img class="h-[300px] md:h-[350px] w-full" v-if="image" :src="image" loading="lazy" alt="ErrorIMG">
    </swiper-slide>
    </swiper>
  </template>
  <script>
    // import Swiper core and required modules
    import {Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
  
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    import {ref} from 'vue'
  
    // Import Swiper styles
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      props: {
        images: Array
      },
      setup(props) {
        const onSwiper = (swiper) => {
          console.log(swiper);
        
        };
        const onSlideChange = () => {
          console.log('slide change');
        };

        const images = ref(props.images)
        return {
          onSwiper,
          onSlideChange,
          modules: [Navigation, Pagination, A11y , Autoplay],
          images
        };
      },
    };
  </script>