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
          //console.log(error.response.data)
       
        }

      }

      //fetch catalog action
      const fetchCatalogAction = async() => {
        try {
          const response = await http().get('/catalog')
         
          return response.data.data
        } catch (error) {
            //console.log(error.response.data)
        }
    }

      //array property File
      const catalogFiles = ref([])
      const refresh = ref(false)
    
      return {deleteTempImgAction , fetchCatalogAction , catalogFiles , refresh}
})