import {useEffect, useState, forwardRef} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';
import useAuth from "hooks/useAuth";

//TABLES STYLES
import MaterialTable from "material-table";
import { Icon } from '@iconify/react';
import { AddBox, ArrowDownward } from "@mui/icons-material";
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

// sweetalert2 components
import Swal from "sweetalert2";

//TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CalifTable(tblResumen) {
  const {auth} = useAuth();
  const cookies = new Cookies();
  const history = useNavigate();
  const url = 'https://minumeapi.azurewebsites.net/api/HABITACIONES/RESUMEN';
  let dataUpdate = [];
  let index = 0;
  let itemsProcesados = 0;
  const jwtInterceoptor = axios.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  //TABLE PROPS CONFIGURATIONS
  const [data, setData] = useState(tblResumen.tblResumen);

  useEffect(()=>{
    jwtInterceoptor.get(url)
    .then(response => {
      setData(response.data);
    })
  },[]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:check-mark-button" {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:cross-mark" {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:wastebasket" {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:pencil" {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <Icon icon="eva:cloud-download-outline" {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Enviar: forwardRef((props, ref) => <Icon icon="mdi:email-fast" {...props} ref={ref} />),
    Listo: forwardRef((props, ref) => <Icon icon="mdi:check" {...props} ref={ref} />),
    Activar_Envios: forwardRef((props, ref) => <Icon icon="mdi:playlist-check" {...props} ref={ref} />),
    Desactivar_Envios: forwardRef((props, ref) => <Icon icon="mdi:playlist-remove" {...props} ref={ref} />)
  };
  const columns = [
    {
      title: 'Cédula', field: 'cedula', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    {
      title: 'Nombre', field: 'nombre', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    {
      title: 'Sexo', field: 'sexo', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    {
      title: 'Teléfono', field: 'telefono', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    {
      title: 'Email', field: 'email', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    {
      title: 'Habitación', field: 'habitacion', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    {
      title: 'Hotel', field: 'hotel', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },

  ];


  function Refrescar(){
    jwtInterceoptor.get(url)
    .then(response => {
      setData(response.data);
      toast.success("Datos actualizados", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    })
    .catch(() => {
      let timerInterval
        Swal.fire({
          icon: 'error',
          title: 'Error en al recargar los datos',
          timer: 8000,
          timerProgressBar: true,
          showConfirmButton: false,
          text: 'Intentelo nuevamente, de lo contrario por favor contactar con Mesa de Ayuda.',
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            history(0)
          }
        })
    });
  }

  return (
    <MaterialTable
      title="Resumen de habitaciones" 
      data={data} 
      columns={columns}
      icons={tableIcons}
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Actializar datos',
          isFreeAction: true,
          onClick: () => {
            Refrescar();
          },
        },
      ]}
      style=
      {{
        boxShadow: "none",
        paddingTop: "10px",
      }}
      localization={{
        body: {
          editTooltip: 'Editar',
          editRow: {
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Guardar'
          },
          addTooltip: 'Agregar',
          deleteTooltip: 'Eliminar',
        },
        header:{
          actions: "Acciones"
        }
      }}
      options={
        {
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100,500,600,700],
          headerStyle:{
            paddingRight: '70px'
          },
          actionsColumnIndex: -1,
          exportButton:true,
          searchFieldStyle: {marginRight: "5%"},
          rowStyle: {
            justifyContent: "center",
            fontSize: '0.875rem',
            borderBottom: '0.0625rem solid #e9ecef',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '24px',
            paddingRight: '24px',
            opacity: 1,
            backgroundColor: 'transparent',
            color: '#344767'
          },
        }
      }
      
    />
  );
}

export default CalifTable;