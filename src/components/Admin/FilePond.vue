<template>

    <file-pond
            id="file"
            name="temp_path"
            ref="pond"
            label-idle="Pilih gambar <span class='filepond--label-action'>Browse</span>"
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

</template>
    
<script setup>
import { ref } from 'vue' 
import vueFilePond from 'vue-filepond';
import { useCatalogStore } from '@/stores/catalog' 

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
    catalog.catalogFiles = myFiles.value

    return response.data
}

const handleFilePondRevert = async (uniqueID , load) => {
    //hapus gambar dari array
    myFiles.value = myFiles.value.filter((image) => image !== uniqueID)
    catalog.catalogFiles = myFiles.value
    await catalog.deleteTempImgAction(uniqueID);
    load()
}

const handleReorderPosition = (files, origin , target) => {
    //kosongkan myFiles.value
    myFiles.value = [];

    //reorder berdasarkan new position
    files.forEach((obj , index) => {
        myFiles.value.push(
            obj.serverId,
        )
    });

    catalog.catalogFiles = myFiles.value
}


</script>