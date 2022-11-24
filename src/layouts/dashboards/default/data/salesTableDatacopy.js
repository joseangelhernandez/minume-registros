import {useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';

/*function getESCOM () {
  axios.get('http://localhost:14871/api/ESTUDIANTE_COMISION')
    .then((response)=>{
      return response.data
    });
}

export default getESCOM;*/


function ComisionEstudiant(){

  //Variables de datos
  const [ComisionesEstudiantes, setComisionesEstudiantes] = useState(null)

  //GET de datos
  useEffect(() => {
    axios.get('http://localhost:14871/api/ESTUDIANTE_COMISION')
    .then((response)=>{
      setComisionesEstudiantes(response.data)
    });
  }, [])

  console.log(ComisionesEstudiantes);
  return [ComisionesEstudiantes];
};

export default [ComisionEstudiant];
