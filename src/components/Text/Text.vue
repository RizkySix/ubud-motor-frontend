<template>
{{ six.texts }}
</template>

<script>
import {ref , onMounted} from 'vue'
const textTest = async() => {
   return new Promise((resolve) => {
    setTimeout(() => {
       resolve({
            texts: 'YAA'
       })
    }, 4000);
   })
}

export default {
    async setup() {
        const six = ref(await textTest())

        return {
            six
        }
    }
}
</script>