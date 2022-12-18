import axios from "axios";
import  useAuth  from 'hooks/useAuth';
import Cookies from 'universal-cookie';


const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const jwtInterceoptor = axios.create({});
  const cookies = new Cookies();
  
  
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
      var ocupacion = respuesta.data.cargo

      setAuth({usuario, nombre, apellido, comision, role, token, ocupacion});
      cookies.set('TaHjtwSe', respuesta.data.accessToken, {path: '/'});

      return respuesta.data.accessToken;
    }catch(error){
      console.log("No esta logueado");
    }
  };
  return refreshToken;
};

export default useRefreshToken;