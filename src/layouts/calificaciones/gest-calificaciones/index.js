import * as React from 'react';
import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import useAuth from "hooks/useAuth";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Skeleton from '@mui/material/Skeleton';
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CalifTable_primera from "layouts/calificaciones/gest-calificaciones/DataTableEdit_primera/dataTableEditorCalif";
import CalifTable_segunda from "layouts/calificaciones/gest-calificaciones/DataTableEdit_segunda/dataTableEditorCalif";
import CalifTable_tercera from "layouts/calificaciones/gest-calificaciones/DataTableEdit_tercera/dataTableEditorCalif";
import CalifTable_cuarta from "layouts/calificaciones/gest-calificaciones/DataTableEdit_cuarta/dataTableEditorCalif";
import CalifTable_general from "layouts/calificaciones/gest-calificaciones/DataTableEdit_general/dataTableEditorCalif";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from "sweetalert2";

function Calificaciones({stickyNavbar}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const jwtInterceoptor = axios.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [usuario, setUsuario] = useState([
    {
      roleId: '',
      comision: '',
      sesion_trabajo: '',
      tipo_mesa: '',
    }
  ]);
  const [usuarios, setUsuarios] = useState([{
    usuario: ''
  }])
  const [cargando, setCargando] = useState(true);
  const [tblEstuCalif, setTblEstucalif] = useState([
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    {
      secuencia: <Skeleton/>,
      delegado: <Skeleton/>,
      comision: <Skeleton/>,
      pais: <Skeleton/>,
      comunicativa: <Skeleton/>,
      oratoria: <Skeleton/>,
      redaccion: <Skeleton/>,
      pen_logico: <Skeleton/>,
      argumentacion: <Skeleton/>,
      pen_critico: <Skeleton/>,
      resol_problemas: <Skeleton/>,
      negociacion: <Skeleton/>,
      des_personal: <Skeleton/>,
      liderazgo: <Skeleton/>,
      total: <Skeleton/>,
      starpoint: <Skeleton/>,
      confir_dir_ad: <Skeleton/>,
      confir_ce: <Skeleton/>
    },
    
    ]
  );

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(()=>{
    try{
      jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/GETUSUARIOS_SP')
      .then((response)=> {
        setUsuarios(response.data);
      });
    }catch(error){
      console.log(error);
    }
    try{
      jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/USUARIOROLE_SP/'+`${auth.usuario}`)
      .then((response)=> {
        setUsuario(response.data);
        setCargando(false);
      }).then(()=>{
        if(usuario[0].comision != ''){
          jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/CALIFICACIONES/'+`${usuario[0].comision}`)
          .then((response)=> {
            setTblEstucalif(response.data)
          }).catch((error)=>{console.log(error.response.data)});
        }
      });
    }catch(error){
      console.log(error);
    }
  }, [cargando]);

  useEffect(()=>{
    if(usuario[0].comision != ''){
      jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/CALIFICACIONES/'+`${usuario[0].comision}`)
      .then((response)=> {
        setTblEstucalif(response.data)
      });
    }
  },[tabValue])

  const publicarInicio = () => {
    jwtInterceoptor.post('https://minumeapi.azurewebsites.net/api/ESTADOSDEL/PRIMERA')
    .then(()=> {
      Swal.fire({
        icon: 'success',
        title: 'Publicado Correctamente las Primeras sesiones de trabajo.',
        timer: 2000,
        showConfirmButton: false,
      });
    }).catch((error)=>{console.log(error.response.data)});
  }

  const PublicarFinal = () => {
    jwtInterceoptor.post('https://minumeapi.azurewebsites.net/api/ESTADOSDEL/FINAL')
    .then(()=> {
      Swal.fire({
        icon: 'success',
        title: 'Publicado Correctamente todas las calificaciones.',
        timer: 2000,
        showConfirmButton: false,
      });
    }).catch((error)=>{console.log(error.response.data)});
  }

  const deshacerPublicaciones = () => {
    jwtInterceoptor.post('https://minumeapi.azurewebsites.net/api/ESTADOSDEL/NOPUBLICAR')
    .then(()=> {
      Swal.fire({
        icon: 'success',
        title: 'Publicaciones deshechas correctamente.',
        timer: 2000,
        showConfirmButton: false,
      });
    }).catch((error)=>{console.log(error.response.data)});
  }


  return (
  <DashboardLayout>
    <ToastContainer />
    <DashboardNavbar />
    <SuiBox mt={stickyNavbar ? 3 : 5}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab label="Primera Sesión"/>
                <Tab label="Segunda Sesión"/>
                <Tab label="Tercera Sesión"/>
                <Tab label="Cuarta Sesión"/>
                <Tab label="General"/>
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
    </SuiBox>
    <SuiBox my={3}>
      
      <Card>
        <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SuiBox lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Reporte de calificaciones
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Calificaiones de los delegados en MINUME.
              </SuiTypography>
            </SuiBox>
          <Stack spacing={1} direction="row">
          {auth.role === 1 
            &&<Tooltip title="Publicar Calificaciones Iniciales" placement="bottom">
              <SuiButton variant="gradient" color="dark" size="medium" onClick={publicarInicio} >
                <Icon>cloud_sync</Icon>
              </SuiButton>
            </Tooltip>}

            {auth.role === 1 
            &&<Tooltip title="Publicar Calificaciones Finales" placement="bottom">
              <SuiButton variant="gradient" color="dark" size="medium" onClick={PublicarFinal} >
                <Icon>file_download_done</Icon>
              </SuiButton>
            </Tooltip>}
            {auth.role === 1 
            &&<Tooltip title="Deshacer publicaciones" placement="bottom">
              <SuiButton variant="gradient" color="dark" size="medium" onClick={deshacerPublicaciones} >
                <Icon>low_priority</Icon>
              </SuiButton>
            </Tooltip>}
          </Stack>
        </SuiBox>
        {tabValue === 0 && <CalifTable_primera tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 1 && <CalifTable_segunda tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 2 && <CalifTable_tercera tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 3 && <CalifTable_cuarta tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
        {tabValue === 4 && <CalifTable_general tblEstuCalif={tblEstuCalif} sesion_trabajoTBL={usuario[0]} Lista_usuarios={usuarios}/>}
      </Card>
    </SuiBox>
    <SuiBox my={3}>
      <Card>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2} ml={1.5} pb={2}>
          <SuiTypography variant="h6" fontWeight="bold" textTransform="capitalize" textGradient color="info">
            LEYENDA DE COMPENTENCIAS A EVALUAR
          </SuiTypography>
        </SuiBox>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia comunicativa
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>COM</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              La delegación presenta autonomía en la regulación de su comunicación,
              posee capacidad para comunicarse de forma estándar y muestra
              coherencia en lo comunicado.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia Oratoria
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>ORA</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              Articula de forma coherente sus participaciones discursivas, logrando
              cautivar la atención del público.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia Redacción
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>RED</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              Produce textos técnicos y académicos con cohesión y coherencia temática.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia de Pensamiento Lógico
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>PENL</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              La delegación participa de acuerdo con el contexto y el papel representado. Sus
              aportes mantienen una estructura lógica y coherente.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia Argumentación
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>ARG</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              Presenta puntos de vista, cimentados en una base de garantías y evidencias
              sólidas, de manera clara y precisa acerca de los problemas, dilemas o situaciones
              tratados.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia de Pensamiento Crítico
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>PNC</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              La delegación externa ideas y posiciones críticas, de acuerdo con el país representado y el
              contexto simulado. Adopta una postura crítica ante las informaciones ofrecidas y demuestra
              rigurosidad al evaluar propuestas.

              Profundiza, de manera lógica y coherente, con información fiable y contrastada, a la vez que
              comunica su postura, sobre temas diversos. Es capaz de detectar incoherencias en las
              posturas de otros o de textos.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7bh-content"
            id="panel7bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia de Resolución de Problemas
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>RELP</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              La delegación reconoce y analiza el problema, propone estrategias viables para su
              resolución y se muestra flexible ante la búsqueda de posibles soluciones.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8bh-content"
            id="panel8bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia Negociación
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>NEG</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              Aplica técnicas de negociación avanzadas orientada a la construcción de consensos
              que procuren la solución de los problemas, dilemas o situaciones tratados.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9bh-content"
            id="panel9bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Competencia Desarrollo Personal y Espiritual.
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>DESP</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              La delegación actúa de manera asertiva, construyendo un liderazgo
              positivo, basado en relaciones sanas y el mutuo respeto. Promueve
              una actitud ética y de desarrollo de valores democráticos.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10bh-content"
            id="panel10bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              Liderazgo
            </SuiTypography>
            <SuiTypography variant="button" sx={{ color: 'text.secondary' }}>LID</SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              Desarrolla la actitud de un líder democrático e inclusivo, sabe
              escuchar, y tiene conciencia y tolerancia de los puntos de vista de los
              demás.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel11bh-content"
            id="panel11bh-header"
          >
            <SuiTypography variant="h6" fontWeight="medium" sx={{ width: '40%', flexShrink: 0 }}>
              STARPOINT
            </SuiTypography>
          </AccordionSummary>
          <AccordionDetails>
            <SuiTypography variant="subtitle2">
              En el Sistema Simplificado de Evaluación, los Starpoints son una medición de carcater cualitativo que
              organiza a las delegaciones según su desempeño general, con una
              mirada más alla de lo académico, complementando el perfil de
              ciudadanía responsable que debe promover la Programa de Liderazgo Educativo (PLERD).
              Esta calificación no es vinvulante para la selección de las menciones
              dentro de la comisión, pero puede ser un termometro que indique, que
              tan completo esta el perfil del delegado en cuestión. La Mesa de
              Evaluación y Control, junto con la Mesa Directiva, asigna un puntaje
              global, no mayor de 5 puntos, que se asignan a razon de uno en las
              primeras tres sesiónes de trabajo, y dos al final de la Cuarta Sesión de
              Trabajo.
              Los Starpoints, puden ser retirados, por acuerdo, entre la Mesa de
              Evaluación y Control y la Mesa Directiva, dicha decisión, ratificada por el
              Secretario General Académico, limita la obtención de beneficios posteriores en programas
              ofertados por la PLERD.
            </SuiTypography>
          </AccordionDetails>
        </Accordion>
      </Card>
    </SuiBox>
    <Footer />
  </DashboardLayout>
  );

}

// Setting default values for the props of BaseLayout
Calificaciones.defaultProps = {
  stickyNavbar: false,
};

// Typechecking props for BaseLayout
Calificaciones.propTypes = {
  stickyNavbar: PropTypes.bool,
};


export default Calificaciones;