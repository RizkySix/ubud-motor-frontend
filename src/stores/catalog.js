import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import {http} from '@/helper/domain';

export const useCatalogStore = defineStore('catalog' , () => {

    //delete temp image action
    const deleteTempImgAction = async (path , endpoint) => {
        try {
    
          const response = await http().delete(endpoint, {
            data: path
          });
      
          return response.data
        
        } catch (error) {
          console.log(error.response.data)
       
        }

      };

      //array property File
      const catalogFiles = ref([])
      const refresh = ref(false)
    
      return {deleteTempImgAction , catalogFiles , refresh}
})