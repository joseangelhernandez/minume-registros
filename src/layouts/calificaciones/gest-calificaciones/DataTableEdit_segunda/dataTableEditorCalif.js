import {useEffect, useState, forwardRef} from "react";
import { useNavigate } from "react-router-dom";;
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

function CalifTable(calificaciones) {
  const {auth} = useAuth();
  const cookies = new Cookies();
  const url = 'https://minumeapi.azurewebsites.net/api/CALIFICACIONES';
  const history = useNavigate();
  let dataUpdate = [];
  let index = 0;
  let itemsProcesados = 0;
  const jwtInterceoptor = axios.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const [data, setData] = useState(calificaciones.tblEstuCalif);

  useEffect(()=>{
    setData(calificaciones.tblEstuCalif);
  },[calificaciones.tblEstuCalif]);

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
      title: 'Secuencia', field: 'secuencia', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Delegado ID", field: "delegado", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Representaci??n", field: "pais", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "PENL", field: "pen_logico", type: 'numeric',
      validate: rowData => rowData.pen_logico >=  0 ? (rowData.pen_logico <= 50 ? true : 'La calificaci??n debe estar entre 0 y 50') : 'La calificaci??n debe estar entre 0 y 50' ,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    { title: "ARG", field: "argumentacion", type: 'numeric',
      validate: rowData => rowData.argumentacion >=  0 ? (rowData.argumentacion <= 50 ? true : 'La calificaci??n debe estar entre 0 y 50') : 'La calificaci??n debe estar entre 0 y 50' ,
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",type: 'boolean',editable: 'never',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n control y ev.", field: "confir_ce2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n control y ev.", field: "confir_ce2",type: 'boolean',editable: 'never',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    }
  ];

  const columnsControl = [
    {
      title: 'Secuencia', field: 'secuencia', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Delegado ID", field: "delegado", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Representaci??n", field: "pais", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "PENL", field: "pen_logico", type: 'numeric',editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    { title: "ARG", field: "argumentacion", type: 'numeric',editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",type: 'boolean',editable: 'never',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n control y ev.", field: "confir_ce2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n control y ev.", field: "confir_ce2",type: 'boolean',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    }
  ];

  const columnsAdj = [
    {
      title: 'Secuencia', field: 'secuencia', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Delegado ID", field: "delegado", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Representaci??n", field: "pais", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "PENL", field: "pen_logico", type: 'numeric',editable: 'never',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    },
    { title: "ARG", field: "argumentacion", type: 'numeric',editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",type: 'boolean',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n control y ev.", field: "confir_ce2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n control y ev.", field: "confir_ce2",type: 'boolean',editable: 'never',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    }
  ];

  const columnsVice = [
    {
      title: 'Secuencia', field: 'secuencia', editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      }
    },
    { title: "Delegado ID", field: "delegado", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       },
    },
    { title: "Representaci??n", field: "pais", editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
      },
    },
    { title: "PENL", field: "pen_logico", type: 'numeric',editable: 'never',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    },
    { title: "ARG", field: "argumentacion", type: 'numeric',editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n director adj.", field: "confir_dir_ad2",type: 'boolean',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    },
    calificaciones.tblEstuCalif.length < 11
    ?{ title: "Confirmaci??n control y ev.", field: "confir_ce2",editable: 'never',
      headerStyle: {
        fontSize: '0.8rem',
        fontWeight: '700',
        opacity: '0.7',
        backgroundColor: 'transparent',
        color: '#8392ab',
        paddingBottom: '10px'
       }
    }
    :{ title: "Confirmaci??n control y ev.", field: "confir_ce2",type: 'boolean',editable: 'never',
    headerStyle: {
      fontSize: '0.8rem',
      fontWeight: '700',
      opacity: '0.7',
      backgroundColor: 'transparent',
      color: '#8392ab',
      paddingBottom: '10px'
     }
    }
  ];

  function PostCalif(record){

    if(auth.ocupacion == 'CONTROL Y EVALUACION'){
      jwtInterceoptor.post(url+`/SEGUNDACE/${record.delegado}`+`/${record.confir_ce2}`).catch((error)=>{console.log(error.response.data)}).then(()=>{
        jwtInterceoptor.get(url+`/${calificaciones.sesion_trabajoTBL.comision}`)
        .then(response => {
          setData(response.data);
      })
        }).catch(() => {
          let timerInterval
          Swal.fire({
            icon: 'error',
            title: 'Error en el env??o de datos',
            timer: 8000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: 'Por favor asegurarse de no utilizar decimales en los campos de publicaci??n.',
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              //history(0)
            }
          })
        });
    }else if(auth.ocupacion == 'DIRECTOR ADJUNTO'){
      jwtInterceoptor.post(url+`/SEGUNDADIRAD/${record.delegado}`+`/${record.confir_dir_ad2}`).then(()=>{
        jwtInterceoptor.get(url+`/${calificaciones.sesion_trabajoTBL.comision}`)
        .then(response => {
          setData(response.data);
      })
        }).catch(() => {
          let timerInterval
          Swal.fire({
            icon: 'error',
            title: 'Error en el env??o de datos',
            timer: 8000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: 'Por favor asegurarse de no utilizar decimales en los campos de publicaci??n.',
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              history(0)
            }
          })
        });
    }else if(auth.ocupacion == 'VICEPRESIDENTE'){
      jwtInterceoptor.post(url+`/SEGUNDADIRAD/${record.delegado}`+`/${record.confir_dir_ad2}`).then(()=>{
        jwtInterceoptor.get(url+`/${calificaciones.sesion_trabajoTBL.comision}`)
        .then(response => {
          setData(response.data);
      })
        }).catch(() => {
          let timerInterval
          Swal.fire({
            icon: 'error',
            title: 'Error en el env??o de datos',
            timer: 8000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: 'Por favor asegurarse de no utilizar decimales en los campos de publicaci??n.',
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              history(0)
            }
          })
        });
    }else{
      jwtInterceoptor.post(url+`/SEGUNDA/${record.delegado}`+`/${record.pen_logico}`+`/${record.argumentacion}`) 
      .catch(() => {
        let timerInterval
        Swal.fire({
          icon: 'error',
          title: 'Error en el env??o de datos',
          timer: 8000,
          timerProgressBar: true,
          showConfirmButton: false,
          text: 'Por favor asegurarse de no utilizar decimales en los campos de publicaci??n.',
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

  function Refrescar(){
    jwtInterceoptor.get(url+`/${calificaciones.sesion_trabajoTBL.comision}`)
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

  function EnviarCalificaciones(){
    try{
      jwtInterceoptor.put('https://minumeapi.azurewebsites.net/api/USUARIOROLE_SP/'+`${auth.usuario}?sesion_trabajo=3`)
      .then(()=> {
        toast.success("Calificaciones enviadas satisfactoriamente.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          onClose: () => history(0)
        });
      });
    }catch(error){
      toast.error("Hubo un error en el env??o.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
      console.log(error);
    }
  }

  function ActivarEnvios(){
    itemsProcesados = 0;
    calificaciones.Lista_usuarios.forEach(element => {
      try{
        jwtInterceoptor.put('https://minumeapi.azurewebsites.net/api/USUARIOROLE_SP/'+`${element.usuario}?sesion_trabajo=2`);
      }catch(error){
        console.log(error);
      }
      itemsProcesados++;

      if(itemsProcesados === calificaciones.Lista_usuarios.length){
        toast.success("Env??os activados", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      }
    });
  }
  function DesactivarEnvios(){
    itemsProcesados = 0;
    calificaciones.Lista_usuarios.forEach(element => {
      try{
        jwtInterceoptor.put('https://minumeapi.azurewebsites.net/api/USUARIOROLE_SP/'+`${element.usuario}?sesion_trabajo=3`);
      }catch(error){
        console.log(error);
      }
      itemsProcesados++;

      if(itemsProcesados === calificaciones.Lista_usuarios.length){
        toast.error("Env??os Desactivados", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      }
    });
  }

  function EnviarCorreos(){
    console.log('Enviando correos');
  }
  return (
    <MaterialTable
      title="Segunda sesi??n de trabajo" 
      data={data} 
      columns={
        auth.ocupacion === 'CONTROL Y EVALUACION' ? columnsControl : auth.ocupacion === 'DIRECTOR ADJUNTO' ? columnsAdj
        : auth.ocupacion === 'VICEPRESIDENTE' ? columnsVice : columns
      }
      icons={tableIcons}
      actions={data.length>10
        ?[
        {
          icon: 'refresh',
          tooltip: 'Actializar datos',
          isFreeAction: true,
          onClick: () => {
            Refrescar();
          },
        
        },
        calificaciones.sesion_trabajoTBL.roleid === 1
        ?{  
          icon: tableIcons.Activar_Envios,
          tooltip: 'Activar envios',
          isFreeAction: true,
          onClick: () => {ActivarEnvios()},
        }
        :null,
        calificaciones.sesion_trabajoTBL.roleid === 1
        ?{  
          icon: tableIcons.Desactivar_Envios,
          tooltip: 'Desactivar envios',
          isFreeAction: true,
          onClick: () => {DesactivarEnvios()},
        }:null,
        calificaciones.sesion_trabajoTBL.roleid === 1
        ?{  
          icon: tableIcons.Enviar,
          tooltip: 'Enviar correos',
          isFreeAction: true,
          onClick: () => {EnviarCorreos()},
        }
        :calificaciones.sesion_trabajoTBL.sesion_trabajo === 2 && calificaciones.sesion_trabajoTBL.roleid > 1
        ?{  
          icon: tableIcons.Listo,
          tooltip: 'Enviar calificaciones',
          isFreeAction: true,
          onClick: () => {EnviarCalificaciones()},
        }:auth.comision === 6 && calificaciones.sesion_trabajoTBL.sesion_trabajo === 1 && {  
          icon: tableIcons.Listo,
          tooltip: 'Enviar calificaciones',
          isFreeAction: true,
          onClick: () => {EnviarCalificaciones()},
        }
        
      ]:[]}
      editable={data.length>10
        ?calificaciones.sesion_trabajoTBL.roleid === 1 || calificaciones.sesion_trabajoTBL.comision === 6
        ?{onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dataUpdate = [...data];
              index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              PostCalif(newData);
              resolve();
            }, 1000)
          }),}
        :calificaciones.sesion_trabajoTBL.sesion_trabajo > 0 && calificaciones.sesion_trabajoTBL.roleid > 1
        ?{onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dataUpdate = [...data];
              index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              PostCalif(newData);
              resolve();
            }, 1000)
          }),}
        :{}
        :null
      }
      style=
      {{
        boxShadow: "none",
        paddingTop: "10px",
      }}
      localization={{
        header:{
          actions: "Acciones"
        }
      }}
      options={data.length>10
        ?{
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        headerStyle:{
          paddingRight: '40px'
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
      }:
      {
        pageSize: 10,
        pageSizeOptions: [],
        headerStyle:{
          paddingRight: '50px'
        },
        actionsColumnIndex: -1,
        search: false,
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
      }}
    />
  );
}

export default CalifTable;