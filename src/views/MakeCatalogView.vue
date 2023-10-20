<template>

<Sidebar>
    
    <file-pond
            id="file"
            name="temp_path"
            ref="pond"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
            allow-multiple="true"
            maxFiles="3"
            maxParallelUploads="1"
            accepted-file-types="image/jpeg, image/png , image/jpg, image/gif"
            acceptedFileTypes="image/*"
            imagePreviewHeight="300"
            itemInsertLocation="after"
            allowReorder="true"
            itemInsertInterval="1500"
            v-on:reorderfiles="handleReorderPosition"
            :server="{
                process: {
                    url: 'http://ubud-motor.test/api/v1/temp/catalog',
                    method: 'POST',
                    onload: handleFilePondOnLoad,
                },
                revert: handleFilePondRevert,
                headers: {
                        Authorization: 'Bearer ' + token,
                        Accept: 'application/json'
                },

            }"
    />

    <form action="" @submit.prevent="storeCatalog">
        <button @submit.prevent="storeCatalog">INPUT</button>
    </form>
</Sidebar>

</template>

<script setup>
import { ref } from 'vue' 
import Sidebar from '@/components/Admin/Sidebar.vue';
import vueFilePond from 'vue-filepond';
import { useCatalogStore } from '@/stores/catalog' 
import http from '@/helper/domain';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

const catalog = useCatalogStore()

const filePond = vueFilePond(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType
)

const myFiles = ref([])
const token = ref(localStorage.getItem('token'))

const handleFilePondOnLoad = (response) => {
    response = JSON.parse(response)
    myFiles.value.push(response.data)

    return response.data
}

const handleFilePondRevert = async (uniqueID , load) => {
    //hapus gambar dari array
    myFiles.value = myFiles.value.filter((image) => image !== uniqueID)
    await catalog.deleteTempImg(uniqueID);
    load()
}

const handleReorderPosition = (files, origin , target) => {
    console.log(myFiles.value)
    console.log('ori'+origin , 'targ'+target)
    //kosongkan myFiles
    myFiles.value = [];

    //reorder berdasarkan new position
    files.forEach((obj , index) => {
        myFiles.value.push(
           obj.serverId,
        )
    });

    console.log(myFiles.value)
}


const storeCatalog = async () => {
    try {
      const response =  await http().post('/catalog' , {
            motor_name: 'Mio Fit Z',
            charge: 150000,
            path_catalog: myFiles.value,
            price_lists: [
               {
                price: 50000,
                duration: 24,
                package: 'daily',
                duration_suffix: 'hours'
               },
            ]
        })

        console.log(response.data)
    } catch (error) {
        console.log(error.data.data)
    }
}

</script>