import axios from 'axios'
const BASE_URL = 'https://minume-umnurd.edu.do/api'

export default axios.create({
    baseURL: BASE_URL,
});