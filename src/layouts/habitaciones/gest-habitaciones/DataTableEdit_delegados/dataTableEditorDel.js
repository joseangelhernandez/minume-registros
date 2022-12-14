import {useEffect, useState, forwardRef} from "react";
import { useNavigate  } from "react-router-dom";
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

//INPUTS
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// sweetalert2 components
import Swal from "sweetalert2";

//TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CalifTable(tblDelegados)
{
  const {auth} = useAuth();
  const cookies = new Cookies();
  const history = useNavigate();
  const url = 'https://minumeapi.azurewebsites.net/api/HABITACIONES/ESTUDIANTES';
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
  const [data, setData] = useState(tblDelegados.tblDelegados);
  const [habitaciones, setHabitaciones] = useState();

  useEffect(()=>{
    jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/HABITACIONES/ESTUDIANTES')
    .then((response)=> {
      setData(response.data);
    }).catch((error)=>{console.log(error.response.data)});

    jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/HABITACIONES')
    .then((response)=> {
      setHabitaciones(response.data);
    });
    
  },[]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:check-mark-button" {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Icon icon="fluent-emoji-flat:cross-mark" {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
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
      title: 'ID', field: 'id', editable: 'never',
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
      title: 'Regional educativa', field: 'regional', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Nombre del delegado", field: "nombre", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Edad", field: "edad", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Sexo", field: "sexo", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Tel??fono", field: "telefono", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Correo electr??nico", field: "correo_electronico", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Habitaci??n", field: "habitacion",
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
      editComponent: props => (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select native id="grouped-native-select" onChange={e => props.onChange(e.target.value)} value={props.value}>
          <option aria-label="None" />
            <optgroup label="Sencillas">
              {habitaciones.map((habitacion) => {
                if(habitacion.tipo === 1)
                  return (<option key={habitacion.id} value={habitacion.id}>{habitacion.habitacion}</option>)
              })}
            </optgroup>
            <optgroup label="Dobles">
              {habitaciones.map((habitacion) => {
                if(habitacion.tipo === 2)
                  return (<option key={habitacion.id} value={habitacion.id}>{habitacion.habitacion}</option>)
              })}
            </optgroup>
            <optgroup label="Triples">
              {habitaciones.map((habitacion) => {
                if(habitacion.tipo === 3)
                  return (<option key={habitacion.id} value={habitacion.id}>{habitacion.habitacion}</option>)
              })}
            </optgroup>
            <optgroup label="Cu??druples">
              {habitaciones.map((habitacion) => {
                if(habitacion.tipo === 4)
                  return (<option key={habitacion.id} value={habitacion.id}>{habitacion.habitacion}</option>)
              })}
            </optgroup>
          </Select>
        </FormControl>
        
      )
    },
    
  ];

  function PostTemp(record){

    jwtInterceoptor.post(url+`/${record.id}/${record.habitacion}`).then(()=>{
      jwtInterceoptor.get(url)
      .then(response => {
        setData(response.data);
        toast.success("Habitaci??n agregado satisfactoriamente.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      })
    }).catch((error) => {
      console.log(error.response.data)
      let timerInterval
      Swal.fire({
        icon: 'error',
        title: 'Error en el env??o de datos',
        timer: 8000,
        timerProgressBar: true,
        showConfirmButton: false,
        text: 'Reintente el env??o, asegurese de colocar los valores adecuadamente, si el error persiste comun??quese con soporte.',
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          //history(0)
        }
      })
    });
  }


  function Refrescar(){
    jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/HABITACIONES/ESTUDIANTES')
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

    jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/HABITACIONES')
    .then((response)=> {
      setHabitaciones(response.data);
    });
  }

  return (
    <MaterialTable
    title="Asignaci??n de habitaciones a delegados" 
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
    editable={
      {onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            dataUpdate = [...data];
            index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setData([...dataUpdate]);
            PostTemp(newData);
            resolve();
          }, 1000)
        }),
      }
    }
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
        pageSizeOptions: [10, 20, 50, 100, 350],
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