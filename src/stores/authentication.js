import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '@/helper/domain';

export const useAuthenticationStore = defineStore('authentication' , () => {

    const loginAction = async (endpoint , credential) => {
        try {
          const response = await http().post(endpoint, credential);
      
          localStorage.setItem('token', response.data.data.token);
          console.log(response.data.data.token)

          return true;
          
        } catch (error) {
          console.log(error.response.data)

          return false;
        }
      };
    
      return {loginAction}
})