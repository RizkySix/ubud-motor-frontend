import axios from "axios"

const url = 'http://ubud-motor.test/api/v1'
const naked_domain = 'http://ubud-motor.test'
const front_local_url = 'http://localhost:5173'
const http = () => {

    let options = {
        baseURL: url,
        headers: {}
    }

    if(localStorage.getItem('token')){
        options.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }else if(localStorage.getItem('customer_token')){
        options.headers.Authorization = 'Bearer ' + localStorage.getItem('customer_token')
    }

    return axios.create(options)
}

export {http , url , front_local_url, naked_domain}