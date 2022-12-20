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


function CalifTable(tblasist) {
  const {auth} = useAuth();
  const cookies = new Cookies();
  const history = useNavigate();
  const url = 'https://minume-umnurd.edu.do/api/ESTADOSDEL/';
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
  const [data, setData] = useState(tblasist.tblasist);

  useEffect(()=>{
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/ESTADOSDEL/'+`${auth.comision}`)
      .then((response)=> {
        setData(response.data);
      }).catch((error) => {console.log(error.response.data)});
  },[tblasist.tblasist]);

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
      title: 'ID delegado', field: 'idDel', editable: 'never',
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
      title: 'Delegado', field: 'nombre',editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Delegación", field: "pais",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Comisión", field: "comision",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Nombre de Comisión", field: "abreviatura",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Primera sesión", field: "primera",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Segunda sesión", field: "segunda",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Tercera sesión", field: "tercera",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Cuarta sesión", field: "cuarta",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },

  ];

  const columnsComisiones = [
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
      title: 'ID delegado', field: 'idDel', editable: 'never',
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
      title: 'Delegado', field: 'nombre',editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Delegación", field: "pais",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Primera sesión", field: "primera",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Segunda sesión", field: "segunda",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Tercera sesión", field: "tercera",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "Cuarta sesión", field: "cuarta",type: 'boolean',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },

  ];


  function PutTemp(record){
    jwtInterceoptor.post(url+`AISTENCIA1/${record.idDel}/${record.primera}`).then(()=>{
      toast.success("Asistencia registrada", {
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
            //history(0)
          }
        })
      });

      jwtInterceoptor.post(url+`AISTENCIA2/${record.idDel}/${record.segunda}`).then(()=>{
      toast.success("Asistencia registrada", {
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
            //history(0)
          }
        })
      });

      jwtInterceoptor.post(url+`AISTENCIA3/${record.idDel}/${record.tercera}`).then(()=>{
      toast.success("Asistencia registrada", {
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
            //history(0)
          }
        })
      });

      jwtInterceoptor.post(url+`AISTENCIA4/${record.idDel}/${record.cuarta}`).then(()=>{
      toast.success("Asistencia registrada", {
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
            //history(0)
          }
        })
      });
  }


  function Refrescar(){
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/ESTADOSDEL/'+`${auth.comision}`)
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
      title="Asistencia de delegados" 
      data={data} 
      columns={
        auth.comision > 12 ? columns : columnsComisiones
      }
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
              PutTemp(newData);
              resolve();
            }, 1000)
          }),}
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