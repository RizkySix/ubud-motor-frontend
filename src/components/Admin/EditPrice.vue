<template>
<BaseModal :modalActive="modalActive" @close-modal="toggleModal">
    Item
</BaseModal>
</template>

<script setup>
import BaseModal from "@/components/Modal/BaseModal.vue"
import {ref} from "vue"

const modalActive = ref(null)

const toggleModal = () => {
    modalActive.value = !modalActive.value
}
</script>