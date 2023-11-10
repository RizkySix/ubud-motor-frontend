import axios from "axios"

const url = 'https://lavista.shalltears.cloud/api/v1'
const naked_domain = 'https://lavista.shalltears.cloud'
const front_local_url = 'https://clientlavista.shalltears.cloud'
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