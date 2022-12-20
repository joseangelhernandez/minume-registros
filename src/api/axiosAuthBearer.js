import axios from 'axios'
import Cookies from 'universal-cookie';


const axiosInstance = () =>{
    const BASE_URL = 'https://minumeapi.azurewebsites.net/api'
    const cookies = new Cookies();
    const jwtInterceoptor = axios.create({});

    jwtInterceoptor.interceptors.request.use((config) => {
        config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
        config.withCredentials = true;
        return config;
    });

    return jwtInterceoptor;
}

export default axiosInstance;