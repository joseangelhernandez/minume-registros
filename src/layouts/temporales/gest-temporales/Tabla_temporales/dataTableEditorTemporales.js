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


function CalifTable(tblTemporales) {
  const {auth} = useAuth();
  const cookies = new Cookies();
  const history = useNavigate();
  const url = 'https://minumeapi.azurewebsites.net/api/TEMPORALES';
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
  const [data, setData] = useState(tblTemporales.tblTemporales);

  useEffect(()=>{
    setData(tblTemporales.tblTemporales);
  },[tblTemporales.tblTemporales]);

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
      title: 'Código', field: 'codigo',
      validate: rowData => rowData.codigo === '' ? 'Este campo no puede estar en blanco.' : true,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Nombre", field: "nombre",
      validate: rowData => rowData.nombre === '' ? 'Este campo no puede estar en blanco.' : true,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Email", field: "email",
      validate: rowData => rowData.email === '' ? 'Este campo no puede estar en blanco.' : true,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Procedencia", field: "procedencia",
      validate: rowData => rowData.procedencia === '' ? 'Este campo no puede estar en blanco.' : true,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Tipo", field: "tipo",
      validate: rowData => rowData.tipo === '' ? 'Este campo no puede estar en blanco.' : true,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
      lookup: { 'ESPECIAL': 'ESPECIAL', 
      'VIP': 'VIP',
      'GENERAL': 'GENERAL', 
      'OBSERVADOR': 'OBSERVADOR',
      'ASISTENTE DE CONFERENCIA': 'ASISTENTE DE CONFERENCIA', 
      'POLICÍA ESCOLAR': 'POLICÍA ESCOLAR' },
    },
    { title: "Estancia", field: "estancia",
      validate: rowData => rowData.estancia === '' ? 'Este campo no puede estar en blanco.' : true,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
      lookup: { 'Inauguración': 'Inauguración', 
      'Sesiones de trabajo': 'Sesiones de trabajo',
      'Clausura': 'Clausura', 
      'En diferentes momentos del evento': 'En diferentes momentos del evento'},
    },
    
  ];

  function PostTemp(record){

    if(record.nombre === undefined || record.email === undefined || record.tipo === undefined || record.estancia === undefined || record.codigo === undefined || record.procedencia === undefined)
    {
      toast.error("Por favor, rellene todos los campos.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });

      jwtInterceoptor.get(url)
          .then(response => {
            setData(response.data);
          })
    }else{
      jwtInterceoptor.post(url, 
        {
          nombre: record.nombre,
          email: record.email,
          tipo: record.tipo,
          estancia: record.estancia,
          codigo: record.codigo,
          procedencia: record.procedencia
  
        }).then(()=>{
          jwtInterceoptor.get(url)
          .then(response => {
            setData(response.data);
            toast.success("Participante agregado satisfactoriamente.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            });
          })
        }).catch((error) => {
          console.log(error.response.data)
          let timerInterval
          Swal.fire({
            icon: 'error',
            title: 'Error en el envío de datos',
            timer: 8000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: 'Reintente el envío, si el error persiste comuníquese con soporte.',
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
    
  }

  function PutTemp(record){
    jwtInterceoptor.put(url+`/${record.id}`, 
      {
        id: record.id,
        nombre: record.nombre,
        email: record.email,
        tipo: record.tipo,
        estancia: record.estancia,
        codigo: record.codigo,
        procedencia: record.procedencia
      }).then(()=>{
        toast.success("Participante editado satisfactoriamente.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      }).catch((error) => {
        console.log(error.response.data)
        let timerInterval
        Swal.fire({
          icon: 'error',
          title: 'Error en el envío de datos',
          timer: 8000,
          timerProgressBar: true,
          showConfirmButton: false,
          text: 'Reintente el envío, si el error persiste comuníquese con soporte.',
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

  function DeleteTemp(record){
    jwtInterceoptor.delete(url+`/${record.id}`)
    .then(()=>{
      toast.success("Participante eliminado satisfactoriamente.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    }).catch((error) => {
      console.log(error.response.data)
      let timerInterval
      Swal.fire({
        icon: 'error',
        title: 'Error en el envío de datos',
        timer: 8000,
        timerProgressBar: true,
        showConfirmButton: false,
        text: 'Reintente el envío, si el error persiste comuníquese con soporte.',
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
      title="Participantes temporales" 
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
      editable={auth.role === 1 ?
        {onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dataUpdate = [...data];
              index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              PutTemp(newData);
              resolve();
            }, 1000)
          }),
          onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              PostTemp(newData);
              resolve();
            }, 1000)
          }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    DeleteTemp(oldData);
                    resolve();
                }, 1000);
          })
        }:{}
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
          pageSizeOptions: [10, 20, 50, 100],
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