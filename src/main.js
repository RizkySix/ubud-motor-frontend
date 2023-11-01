import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { createHead } from '@unhead/vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSweetalert2)
app.use(createHead)

app.use(VueGoogleMaps , {
    load: {
        key: 'AIzaSyCAqdwRPpTtDGc6lWZKlSO0EPgkAKRo-8o', //ini adalah kunci milik orang
        libraries: "places"
    }
})

app.mount('#app')
