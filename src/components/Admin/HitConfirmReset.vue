<template>
<span class="text-center font-bold text-5xl flex flex-col text-yellow-400" v-if="data">
    <span>Success!!</span>
    <span>Password berhasil direset, silahkan login menggunakan password baru</span>
</span>
<span class="text-center font-bold text-5xl flex flex-col text-red-500" v-else>
    <span>Failed!!</span>
    <span>Password gagal direset, coba lakukan permintaan kembali</span>
</span>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {http} from '@/helper/domain.js'
 
const route = useRoute()
const data = ref(false)
const getData = async () => {
   try {
        const response = await http().post('/admin/reset/password/' + atob(route.params.email))
        //console.log(response.data)

        data.value = true
   } catch (error) {
        //console.log(error.response)
        data.value = false
   }
}

await getData()
</script>