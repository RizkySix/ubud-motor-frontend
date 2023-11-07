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
            localStorage.removeItem('customer_token');
          }else if(response.data.data.username){
            localStorage.setItem('customer_token', response.data.data.token);
            localStorage.removeItem('token');
          }

          //console.log(response.data.data.token)

          return true;
          
        } catch (error) {
          //console.log(error.response.data)

          return false;
        }
      };


      const registerAction = async(endpoint , data) => {
        try {
          const response = await http().post(endpoint, data);
          
          //jika admin
          if(response.data.data.email){
            localStorage.setItem('token', response.data.data.token);
            localStorage.removeItem('customer_token');
          }else if(response.data.data.username){
            localStorage.setItem('customer_token', response.data.data.token);
            localStorage.removeItem('token');
          }

          //console.log(response.data.data.token)

          return true;
        } catch (error) {
          //console.log(error.response.data)

          return error.response.data;
        }
      }


      const logoutAction = async(endpoint) => {
        try {
          await http().post(endpoint)
          localStorage.removeItem('token')
          localStorage.removeItem('customer_token')
          return true
        } catch (error) {
          //console.log(error.response)
          return false
        }
      }


      const getUserAction = async() => {
          try {
            const response = await http().get('/user/data');
            return response.data.data
          } catch (error) {
            //console.log(error.response.data)
          }
      }

      const customerToken = ref(localStorage.getItem('customer_token'))
      const adminVerify = ref(null)
      const closeModalAfterAuth = ref(false)
    
      return {loginAction , customerToken , registerAction , logoutAction , getUserAction , adminVerify , closeModalAfterAuth}
})