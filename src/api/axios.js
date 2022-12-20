import axios from 'axios'
const BASE_URL = 'https://minumeapi.azurewebsites.net/api'

export default axios.create({
    baseURL: BASE_URL,
});