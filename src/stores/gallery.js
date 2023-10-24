import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import {http} from '@/helper/domain';

export const useGalleryStore = defineStore('gallery' , () => {

      //fetch catalog action
      const fetchGalleryAction = async() => {
        try {
          const response = await http().get('/gallery')
         
          return response.data.data
        } catch (error) {
            console.log(error.response.data)
        }
    }

    
      return {fetchGalleryAction}
})