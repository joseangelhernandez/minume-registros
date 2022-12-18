import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'api/axios';
import useAuth from "hooks/useAuth";
import axiosORIGIN from 'axios';
import Cookies from "universal-cookie";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from '@mui/icons-material/Person';

// react-router-dom components
import { Link } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// sweetalert2 components
import Swal from "sweetalert2";

function ActionCell(id) {
  const cookies = new Cookies();
  const { auth } = useAuth();
  const [estudiante, setEstudiante] = useState([]);
  const rutas_dev = ""
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "button button-success",
      cancelButton: "button button-error",
    },
    buttonsStyling: false
  })
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const history = useNavigate();
  const jwtInterceoptor = axiosORIGIN.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const Perfil = () => {
    window.open(rutas_dev+'/estudiante'+`/${id.id}`, "_blank")
  }

  const Editar = () => {
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/ESTUDIANTES'+`/${id.id}`)
      .then((response)=> {
        history(rutas_dev+'/estudiantes/editar-estudiante',{state: {persona: response.data}});
      });
  }

  const Confirmar = () => {
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/ESTUDIANTES/confirmar', { params: {estudianteID: id.id}}).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registro confirmado',
          timer: 1500,
          showConfirmButton: false,
        });

        axios.get('/ESTUDIANTES'+`/${id.id}`)
        .then((response)=> {
          setEstudiante(response.data);
        });
      });
    
  }

  useEffect(() => {
    axios.get('/ESTUDIANTES'+`/${id.id}`)
      .then((response)=> {
        setEstudiante(response.data);
      });
  }, []);
  
  const Eliminar = () => {
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres eliminar a ' +  id.id + '?',
      text: "¡No podrás revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          id.id + ' Eliminado',
          'Este registro fue eliminado satisfactoriamente.',
          'success'
        ).then((result)=>{
          if (result.isConfirmed) {
            history(0);
          }
        })
        jwtInterceoptor.delete('https://minume-umnurd.edu.do/api/ESTUDIANTES'+`/${id.id}`);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El registro ' +  id.id + ' no fue eliminado',
          'error'
        )
      }
    })
  }


  return (
    <SuiBox display="flex" alignItems="center">
      <Tooltip title="Perfil" placement="top">
            <SuiButton variant="gradient" color="info"  onClick={Perfil} size="medium" iconOnly>
            <PersonIcon/>
            </SuiButton>
          </Tooltip>
      <SuiBox mx={2}>
          <Tooltip title="Editar" placement="top">
            <SuiButton variant="gradient" color="dark"  onClick={Editar} size="medium" iconOnly>
              <Icon>edit</Icon>
            </SuiButton>
          </Tooltip>
      </SuiBox>
      {auth.role === 1 
      &&<Tooltip title="Eliminar" placement="top">
          <SuiButton variant="gradient" color="error" size="medium" onClick={Eliminar} iconOnly>
            <Icon>delete</Icon>
          </SuiButton>
        </Tooltip>
      }
      {estudiante.confirmacion === false 
      &&<SuiBox mx={2}>
        <Tooltip title="Confirmar" placement="top">
            <SuiButton variant="gradient" color="success" size="medium" onClick={Confirmar} iconOnly>
              <Icon>check</Icon>
            </SuiButton>
        </Tooltip>
      </SuiBox>
      }
    </SuiBox>
  );
}

export default ActionCell;
