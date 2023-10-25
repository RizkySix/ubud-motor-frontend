import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {http} from '@/helper/domain';

export const useAuthenticationStore = defineStore('authentication' , () => {

    const loginAction = async (endpoint , credential) => {
        try {
          const response = await http().post(endpoint, credential);
      
          //jika admin
          if(response.data.data.email){
            localStorage.setItem('token', response.data.data.token);
          }else if(response.data.data.username){
            localStorage.setItem('customer_token', response.data.data.token);
          }

          console.log(response.data.data.token)

          return true;
          
        } catch (error) {
          console.log(error.response.data)

          return false;
        }
      };


      const registerAction = async(endpoint , data) => {
        try {
          const response = await http().post(endpoint, data);
          
          //jika admin
          if(response.data.data.email){
            localStorage.setItem('token', response.data.data.token);
          }else if(response.data.data.username){
            localStorage.setItem('customer_token', response.data.data.token);
          }

          console.log(response.data.data.token)

          return true;
        } catch (error) {
          console.log(error.response.data)

          return false;
        }
      }

      const customerToken = ref(localStorage.getItem('customer_token'))
    
      return {loginAction , customerToken , registerAction}
})