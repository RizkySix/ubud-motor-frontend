import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {http} from '@/helper/domain';

export const useCatalogStore = defineStore('catalog' , () => {

    //delete temp image action
    const deleteTempImgAction = async (path , endpoint) => {
        try {
          const response = await http().delete(endpoint, {
            data: {temp_path: path}
          });
      
          console.log(response.data)
        
        } catch (error) {
          console.log(error.response.data)
       
        }

      };

      //array property File
      const catalogFiles = ref([])
    
      return {deleteTempImgAction , catalogFiles}
})