import axios from "axios";
import  useAuth  from 'hooks/useAuth';
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom';

// sweetalert2 components
import Swal from "sweetalert2";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const jwtInterceoptor = axios.create({});
  const cookies = new Cookies();
  const { pathname } = useLocation();
  const locations = useLocation();
  
  
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const refreshToken = async () => {
    try{
      const respuesta = await jwtInterceoptor.post("https://minume-umnurd.edu.do/api/USUARIOS/refreshToken");

      var usuario = respuesta.data.usuario;
      var role = respuesta.data.roleId;
      var token = respuesta.data.accessToken;
      var comision = respuesta.data.comision;
      var nombre = respuesta.data.nombre;
      var apellido = respuesta.data.apellido;

      setAuth({usuario, nombre, apellido, comision, role, token});
      cookies.set('TaHjtwSe', respuesta.data.accessToken, {path: '/'});

      return respuesta.data.accessToken;
    }catch(error){

      if(locations.pathname !== '/estudiante/:estuID'){
        Swal.fire({
          icon: 'info',
          title: 'Su sesión ha expirado',
          timer: 4500,
          showConfirmButton: false,
        });
      }
    }
  };
  return refreshToken;
};

export default useRefreshToken;