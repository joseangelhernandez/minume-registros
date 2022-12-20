import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import axiosORIGIN from 'axios';
import Cookies from "universal-cookie";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from '@mui/icons-material/Person';


// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";

// sweetalert2 components
import Swal from "sweetalert2";

function ActionCell(id) {
  const cookies = new Cookies();
  const { auth } = useAuth();
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
    window.open('/staffPerfil'+`/${id.id}`, "_blank")
  }

  const Editar = () => {
    jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/STAFF'+`/${id.id}`)
      .then((response)=> {
        console.log(response.data);
        history('/staff/editar-staff',{state: {persona: response.data}});
      });
  }
  
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
        jwtInterceoptor.delete('https://minumeapi.azurewebsites.net/api/STAFF'+`/${id.id}`);
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
    </SuiBox>
  );
}

export default ActionCell;
