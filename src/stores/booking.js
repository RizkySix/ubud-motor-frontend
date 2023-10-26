import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import {http} from '@/helper/domain';

export const useBookingStore = defineStore('booking' , () => {

     //handle calculate price
     const calculatePriceAction = async(thePackage, data) => {
         let endpoint = ''
     
         switch (thePackage.duration_suffix) {
             case 'hours':
             case 'hour':
             case 'jam':
             case 'jams':
                 endpoint = '/booking/calculate?package=' + thePackage.id + '&total_unit=' + data.total_unit + '&rental_date=' + data.rental_date ?? 0 + '&return_date=' + data.return_date
                 break;
         
             default:
                 endpoint = '/booking/calculate?package=' + thePackage.id + '&total_unit=' + data.total_unit + '&rental_date=' + data.rental_date ?? 0 + '&rental_duration=' + data.rental_duration
                 break;
         }
     
         try {
         const response = await http().get(endpoint)
         console.log(response.data.data)
        return response.data.data
     
        } catch (error) {
         console.log(error.response.data)
        }
     }
      return { calculatePriceAction}
})