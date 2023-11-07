<template>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    }"
    >
      <swiper-slide v-for="(image , index) in images" :key="index">
       
        <div class="relative">
          <img class="h-[300px] md:h-[350px] w-full" v-if="image" :id="imageId+image" :src="image" loading="lazy" alt="ErrorIMG" />
          <div v-if="allowDelete || allowUpdate" class="absolute inset-0 flex items-center justify-center">
            <div class="shadow-md p-4 flex gap-2 cursor-pointer hover:opacity-50">
             
            <svg v-if="allowDelete && Object.values(images).length > 1" @click="handleDeleteImage(index)" width="40" height="40" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#6d94a2" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#420b0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

        
            <label :for="image+index" class="cursor-pointer">
              <svg v-if="allowUpdate" width="40" height="40" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#437789" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2639 15.9376L12.5958 14.2835C11.7909 13.4852 11.3884 13.0861 10.9266 12.9402C10.5204 12.8119 10.0838 12.8166 9.68048 12.9537C9.22188 13.1096 8.82814 13.5173 8.04068 14.3327L4.04409 18.2802M14.2639 15.9376L14.6053 15.5991C15.4112 14.7999 15.8141 14.4003 16.2765 14.2544C16.6831 14.1262 17.12 14.1312 17.5236 14.2688C17.9824 14.4252 18.3761 14.834 19.1634 15.6515L20 16.4936M14.2639 15.9376L18.275 19.9566M18.275 19.9566C17.9176 20.0001 17.4543 20.0001 16.8 20.0001H7.2C6.07989 20.0001 5.51984 20.0001 5.09202 19.7821C4.71569 19.5904 4.40973 19.2844 4.21799 18.9081C4.12796 18.7314 4.07512 18.5322 4.04409 18.2802M18.275 19.9566C18.5293 19.9257 18.7301 19.8728 18.908 19.7821C19.2843 19.5904 19.5903 19.2844 19.782 18.9081C20 18.4803 20 17.9202 20 16.8001V16.4936M12.5 4L7.2 4.00011C6.07989 4.00011 5.51984 4.00011 5.09202 4.21809C4.71569 4.40984 4.40973 4.7158 4.21799 5.09213C4 5.51995 4 6.08 4 7.20011V16.8001C4 17.4576 4 17.9222 4.04409 18.2802M20 11.5V16.4936M14 10.0002L16.0249 9.59516C16.2015 9.55984 16.2898 9.54219 16.3721 9.5099C16.4452 9.48124 16.5146 9.44407 16.579 9.39917C16.6515 9.34859 16.7152 9.28492 16.8425 9.1576L21 5.00015C21.5522 4.44787 21.5522 3.55244 21 3.00015C20.4477 2.44787 19.5522 2.44787 19 3.00015L14.8425 7.1576C14.7152 7.28492 14.6515 7.34859 14.6009 7.42112C14.556 7.4855 14.5189 7.55494 14.4902 7.62801C14.4579 7.71033 14.4403 7.79862 14.4049 7.97518L14 10.0002Z" stroke="#1b271f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </label>

            <input type="file" class="hidden" :id="image+index" @change="handleFileChange($event , index , imageId+image)">
            </div>
          </div>
  </div>
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
    import { useCatalogStore } from '@/stores/catalog'
    import {confirmation } from '@/helper/confirmation';

    import {ref} from 'vue'
  
    // Import Swiper styles
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      props: {
        images: Object,
        imageId: {
          type: String,
          default: ''
        },
        allowUpdate: {
          type: Boolean,
          default: false
        },
        allowDelete: {
          type: Boolean,
          default: false
        },
        deleteEndpoint: {
          type: String,
          default: null
        },
      },
      setup(props) {

        const images = ref(props.images)
        const catalog = useCatalogStore()
        
        const handleFileChange = (e , index , idImage) => {
            const file = e.target.files[0]
            catalog.catalogFiles[index] = file
            document.getElementById(idImage).src = URL.createObjectURL(file)
            //console.log(catalog.catalogFiles)
        }

        const handleDeleteImage = async(index) => {
          if(await confirmation() === false){
            return false
          }

          catalog.refresh = true
          const response = await catalog.deleteTempImgAction({catalog_position: index} , props.deleteEndpoint)
          //console.log(response.data)
          images.value = []

          if(response.data.first_catalog){
              images.value.push(response.data.first_catalog)
          }

          if(response.data.second_catalog){
              images.value.push(response.data.second_catalog)
          }

          if(response.data.third_catalog){
              images.value.push(response.data.third_catalog)
          }
      
        }

        return {
          modules: [Navigation, Pagination, A11y , Autoplay],
          images,
          handleFileChange,
          handleDeleteImage
        };
      },
    };
  </script>