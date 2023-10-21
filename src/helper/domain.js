import axios from "axios"

const url = 'http://ubud-motor.test/api/v1'
const http = () => {

    let options = {
        baseURL: url,
        headers: {}
    }

    if(localStorage.getItem('token')){
        options.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }

    return axios.create(options)
}

export {http , url}