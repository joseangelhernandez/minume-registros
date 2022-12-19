import { useState, useEffect, React, useMemo } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import QRCODE from 'qrcode'
import logoCarga from "assets/images/pantallaCarga/Logo-minume-carga.gif";
import useAuth from "hooks/useAuth";

//HEADER
// @mui material components
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import logoMinume from "assets/images/logos/logoMinume.png"
import DashboardLayout from "examples/LayoutContainers/PageLayout-perfil";
import DashboardNavbar from "examples/Navbar-perfil/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Soft UI Dashboard PRO React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
//import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";

//TERMINA HEADER

//cards
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
//

// @mui material components
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Footer from "examples/Footer";
import SuiBadge from "components/SuiBadge";
import SuiButton from "components/SuiButton";

// sweetalert2 components
import Swal from "sweetalert2";


function Overview() {
  const { auth } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [calificacionInicial, setCalificacionInicial] = useState([
    {
      secuencia: '',
      delegacion: '',
      com: '',
      ora: '',
      red: '',
      penl: '',
      ar: ''
    }
  ]);
  const [calificacionFinal, setCalificacionFinal] = useState([
    {
      secuencia: '',
      delegacion: '',
      com: '',
      ora: '',
      red: '',
      penl: '',
      ar: '',
      penc: '',
      relp: '',
      neg: '',
      desp: '',
      lid: '',
      total: ''
    }
  ]);
  const [publicacion, setPublicacion] = useState([{}]);
  const [estudiante, setEstudiante] = useState({
    alergias: '', 
    centro_educativo: '',
    codigo_qr: '',
    comision: '', 
    condicion_medica: '', 
    confirmacion: '',
    correo_electronico: '',
    distrito: '',
    edad: '',
    grado: '',
    habitacion: '',
    id: '',
    medicamentos_recomendados: '',
    nombre: '',
    pais: '',
    regional: '',
    sexo: '',
    telefono: '',
    telefono_padres: '',
  });
  const [estuPut, setEstuput] = useState({
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    edad: '',
    sexo: '',
    telefono: '',
    comision: '',
    pais: '',
    regional: '',
    distrito: '',
    centro_educativo: '',
    grado: '',
    telefono_padres_tutores: '',
    condicion_medica: '',
    alergias: '',
    medicamentos_recomendados: '',
    habitacion: '',
    codigo_qr: '',
    confirmacion: '',
    visado_americana: '',
  });
  const parametros = useParams();
  const rutas_dev = ""
  const history = useNavigate();
  const [cargando, setCargando] = useState(true)
  const [ScreenSize, setScreenSize] = useState(window.innerWidth);
  const cookies = new Cookies();
  const [qrcode, setQRCode] = useState('');
  const [total, setTotal] = useState('');
  const [starpoint, setStarpoint] = useState("Total: 0 / 410" );
  const _URL = 'https://minume.minerd.gob.do/estudiante'+`/${parametros.estuID}`
  const jwtInterceoptor = axios.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Badges
  const NOconfirmado = (
    <SuiBadge variant="gradient" color="error" size="lg" badgeContent="No confirmado" container />
  );
  const confirmado = (
    <SuiBadge variant="gradient" color="success" size="lg" badgeContent="Confirmado" container />
  );

  const confirmar = async () => {

      await jwtInterceoptor.put('https://minume-umnurd.edu.do/api/ESTUDIANTES'+`/${parametros.estuID}`,{
        id: parametros.estuID,
        nombres: estuPut.nombres,
        apellidos: estuPut.apellidos,
        correo_electronico: estuPut.correo_electronico,
        edad: estuPut.edad,
        sexo: estuPut.sexo,
        telefono: estuPut.telefono,
        comision: estuPut.comision,
        pais: estuPut.pais,
        regional: estuPut.regional,
        distrito: estuPut.distrito,
        centro_educativo: estuPut.centro_educativo,
        grado: estuPut.grado,
        telefono_padres_tutores: estuPut.telefono_padres_tutores,
        condicion_medica: estuPut.condicion_medica,
        alergias: estuPut.alergias,
        medicamentos_recomendados: estuPut.medicamentos_recomendados,
        habitacion: estuPut.habitacion,
        codigo_qr: estuPut.codigo_qr,
        confirmacion: true,
        visado_americana: estuPut.visado_americana,
      }).then(()=> {
        Swal.fire({
          icon: 'success',
          title: 'Estudiante confirmado satisfactoriamente',
          timer: 2500,
          showConfirmButton: false,
        });

        sleep(2700).then(() => {history(0)});

      }).catch((error) => {
        console.log(error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error en la confirmación',
          timer: 3000,
          showConfirmButton: false,
          text: 'Hubo un error intentando confirmar al estudiante, si el error persiste comunicarse con soporte.',
        });
      });
  }

  useEffect(()=>{
    axios.get('https://minume-umnurd.edu.do/api/PUBLICACION'+`/${parametros.estuID}`)
      .then((response)=> {
        setPublicacion(response.data)
      }).then(()=>{
        axios.get('https://minume-umnurd.edu.do/api/ESTADOSDEL/calificacion'+`/${parametros.estuID}`)
        .then((response)=> {
        setCalificacionInicial(response.data)
        setCalificacionInicial([{
          secuencia: response.data[0].secuencia,
          delegacion: response.data[0].pais,
          com: response.data[0].comunicativa,
          ora: response.data[0].oratoria,
          red: response.data[0].redaccion,
          penl: response.data[0].pen_logico,
          ar: response.data[0].argumentacion
        }])
        setCalificacionFinal([
          {
            secuencia: response.data[0].secuencia,
            delegacion: response.data[0].pais,
            com: response.data[0].comunicativa,
            ora: response.data[0].oratoria,
            red: response.data[0].redaccion,
            penl: response.data[0].pen_logico,
            ar: response.data[0].argumentacion,
            penc: response.data[0].pen_critico,
            relp: response.data[0].resol_problemas,
            neg: response.data[0].negociacion,
            desp: response.data[0].des_personal,
            lid: response.data[0].liderazgo,
            total: response.data[0].total
          }
        ])
        var total = Number(response.data[0].comunicativa) + Number(response.data[0].oratoria) + Number(response.data[0].redaccion) + Number(response.data[0].pen_logico) + Number(response.data[0].argumentacion)
        publicacion[0].primera_publi && setTotal('Total: '+total+' / 410');
        publicacion[0].final_publi && setTotal('Total: '+response.data[0].total+' / 410');
        setStarpoint(response.data[0].starpoint);
      }).catch((error)=>{console.log(error.response)});

      }).catch((error)=>{console.log(error.response)});
 
    axios.get('https://minume-umnurd.edu.do/api/ESTUDIANTES'+`/${parametros.estuID}`)
      .then((response)=> {
        setEstuput(response.data)
      });

    axios.get('https://minume-umnurd.edu.do/api/PERFIL_ESTUDIANTE'+`/${parametros.estuID}`)
      .then((response)=> {
        setEstudiante(response.data)
        setCargando(false)
        response.data[0]?.id === undefined && history(rutas_dev+'/')
      });

    QRCODE.toDataURL(_URL,
      {
        width: 1024,
        margin: 2,
        errorCorrectionLevel: 'M'
      },
      (err, url) => {
      if(err) return console.error(err)
      setQRCode(url)
    })

    setScreenSize(window.innerWidth);

  },[cargando, ScreenSize])

  const atributosInicial = {
    columns: [
      {
        Header: "Reporte ID",
        accessor: "secuencia",
      },
      { Header: "Delegación", accessor: "delegacion" },
      { Header: "Comunicación", accessor: "com" },
      { Header: "Oratoria", accessor: "ora" },
      { Header: "Redacción", accessor: "red" },
      { Header: "Pensamiento Lógico", accessor: "penl" },
      { Header: "Argumentación", accessor: "ar" }
    ],
  
    rows: calificacionInicial,
  }

  const atributosFinal = {
    columns: [
      {
        Header: "Reporte ID",
        accessor: "secuencia",
      },
      { Header: "Delegación", accessor: "delegacion" },
      { Header: "Comunicación", accessor: "com" },
      { Header: "Oratoria", accessor: "ora" },
      { Header: "Redacción", accessor: "red" },
      { Header: "Pensamiento Lógico", accessor: "penl" },
      { Header: "Argumentación", accessor: "ar" },
      { Header: "Pensamiento Crítico", accessor: "penc" },
      { Header: "Resolución de problemas", accessor: "relp" },
      { Header: "Negociación", accessor: "neg" },
      { Header: "Desarrollo personal", accessor: "desp" },
      { Header: "Liderazgo", accessor: "lid" },
    ],
  
    rows: calificacionFinal,
  }

  const tablaDatosInicial = useMemo(() => atributosInicial, [calificacionInicial]);
  const tablaDatosFinal= useMemo(() => atributosFinal, [calificacionFinal]);

  if(cargando){
    return(<img src={logoCarga} alt="loading..." style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)', maxWidth: '40%', maxHeight: '40%'}}/>)
  }else{
    return (
      <DashboardLayout>
        <SuiBox position="relative">
        <DashboardNavbar absolute light />
          <SuiBox
            display="flex"
            alignItems="center"
            position="relative"
            minHeight="18.75rem"
            borderRadius="xl"
            sx={{
              backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.info.main, 0.6),
                  rgba(gradients.info.state, 0.6)
                )}, url(${curved0})`,
              backgroundSize: "cover",
              backgroundPosition: "50%",
              overflow: "hidden",
            }}
          />
          <Card
            sx={{
              backdropFilter: `saturate(200%) blur(30px)`,
              backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
              boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
              position: "relative",
              mt: -8,
              mx: 3,
              py: 2,
              px: 2,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <SuiAvatar
                  src={logoMinume}
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
                />
              </Grid>
              <Grid item>
                <SuiBox height="100%" mt={0.5} lineHeight={1}>
                  <SuiTypography variant="h5" fontWeight="medium">
                    {estudiante[0].nombre}
                  </SuiTypography>
                  <SuiTypography variant="button" color="text" fontWeight="medium">
                  {estudiante[0].comision} / {estudiante[0].pais}
                  </SuiTypography>
                </SuiBox>
              </Grid>
              {ScreenSize < 1000 
              ? <Grid item xs={12} lg={4} sx={{ ml: "auto" }} style={{textAlign: 'center', marginTop: -15}}>
                <SuiBox style={{textAlign: 'center', marginBottom: 12}}> </SuiBox>
                {auth?.usuario !== undefined && estudiante[0].confirmacion === false
              ? <SuiButton variant="gradient" color="dark" size="md" onClick={confirmar}>Confirmar</SuiButton>
              : estudiante[0].confirmacion ? confirmado : NOconfirmado}
              </Grid>
              : <Grid item xs={8} md={20} lg={4} sx={{ ml: "auto", mr:'30px' }} style={{textAlign: 'right'}}>
                {auth?.usuario !== undefined && estudiante[0].confirmacion === false
              ? <SuiButton variant="gradient" color="dark" size="md" onClick={confirmar}>Confirmar</SuiButton>
              : estudiante[0].confirmacion ? confirmado : NOconfirmado}
              </Grid>}
                    
            </Grid>
          </Card>
        </SuiBox>
        <SuiBox mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={4}>
              <Card sx={{ height: "100%" }}>
                <SuiBox pt={2} pb={2} px={2} lineHeight={1.25}>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center', marginBottom : -10}}>
                    QR del participante ID: <SuiTypography variant="h6" fontWeight="bold" textTransform="capitalize" textGradient color="dark">
                    {parametros.estuID}
                    </SuiTypography>
                  </SuiTypography>
                  <SuiBox display="flex" py={1}>
                    <SuiBox style={{textAlign: 'center'}}>
                      <img
                        src={qrcode}
                        style={{width: '75%'}}
                      />
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center'}}>
                    SEXO DEL PARTICIPANTE
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={1} style={{textAlign: 'center'}}>
                    <SuiBox width="100%">
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].sexo === 'M'
                        ? <SuiBadge variant="contained" color="dark" size="lg" badgeContent="MASCULINO" container />
                        : <SuiBadge variant="contained" color="primary" size="lg" badgeContent="FEMENINO" container />}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center'}}>
                    EDAD DEL PARTICIPANTE
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25} style={{textAlign: 'center'}}>
                    <SuiBox width="100%">
                      <SuiBadge variant="contained" color="error" size="lg" badgeContent={estudiante[0].edad + ' años'} container/>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center', marginBottom : 10, marginTop: 10}}>
                    Hotel de la habitación
                    <SuiBox width="100%">
                      <SuiTypography variant="h5" fontWeight="bold" textTransform="capitalize" textGradient color="dark">
                        {estudiante[0].hotel}
                      </SuiTypography>
                    </SuiBox>
                  </SuiTypography>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center', marginBottom : 10, marginTop: 10}}>
                    Número de habitación
                    <SuiBox width="100%">
                      <SuiTypography variant="h5" fontWeight="bold" textTransform="capitalize" textGradient color="dark">
                        {estudiante[0].habitacion}
                      </SuiTypography>
                    </SuiBox>
                  </SuiTypography>                  
                </SuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <Card sx={{ height: "100%" }}>
                <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2} ml={1.5}>
                  <SuiTypography variant="h6" fontWeight="bold" textTransform="capitalize" textGradient color="info">
                    INFORMACIÓN DEL PARTICIPANTE
                  </SuiTypography>
                </SuiBox>
                <SuiBox pt={2} pb={2} px={2} ml={2} lineHeight={1.25}>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Correo electónico:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].correo_electronico}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Teléfono celular:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].telefono}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Teléfono de emergencia (Padre o tutor):
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].telefono_padres}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Regional educativa de procedencia:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].regional}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Distrito educativo de procedencia:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].distrito}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Centro educativo de procedencia:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].centro_educativo}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Grado académico del participante:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].grado}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                </SuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} xl={4}>
              <Card sx={{ height: "100%" }}>
                <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2} ml={1.5}>
                  <SuiTypography variant="h6" fontWeight="bold" textTransform="capitalize" textGradient color="primary">
                    INFORMACIÓN MÉDICA
                  </SuiTypography>
                </SuiBox>
                <SuiBox pt={2} pb={2} px={2} ml={2} lineHeight={1.25}>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Condición médica especial:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].condicion_medica}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Alergias:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].alergias}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Medicamentos recomendados:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {estudiante[0].medicamentos_recomendados}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                </SuiBox>
              </Card>
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SuiBox lineHeight={1}>
                <SuiTypography variant="h5" fontWeight="medium">
                  CALIFICACIONES
                </SuiTypography>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                  Reporte de calificaciones publicadas hasta el momento
                </SuiTypography>
              </SuiBox>
              <Stack spacing={1} direction="row">
                {publicacion[0].primera_publi ? total == "Total: 0 / 410" 
                ? <SuiBadge variant="gradient" color="error" size="lg" badgeContent="Sin calificar aun" container />
                : <SuiBadge variant="gradient" color="error" size="lg" badgeContent={total} container />
                : <SuiBadge variant="gradient" color="error" size="lg" badgeContent="Sin calificar aun" container />}
                {publicacion[0].final_publi ? starpoint == 1
                  ? <SuiBadge variant="contained" color="dark" size="lg" badgeContent="Mejorable" container />
                  : starpoint == 2 
                  ? <SuiBadge variant="gradient" color="warning" size="lg" badgeContent="Bueno" container />
                  : starpoint == 3 || starpoint == 4
                  ? <SuiBadge variant="gradient" color="info" size="lg" badgeContent="Muy Bueno" container />
                  : starpoint == 5 && <SuiBadge variant="gradient" color="success" size="lg" badgeContent="EXCELENTE" container />
                  : <SuiBadge variant="contained" color="secondary" size="lg" badgeContent="Sin calificar" container />}
              </Stack>
            </SuiBox>
            <SuiBox p={2}>
              <Grid container spacing={3}>
                {publicacion[0].final_publi 
                  ? <DataTable
                      table={tablaDatosFinal}
                      autoResetPage = {false}
                      entriesPerPage = {false}
                      canSearch = {false}
                      isSorted = {false}
                    />
                  : publicacion[0].primera_publi 
                  ? <DataTable
                      table={tablaDatosInicial}
                      autoResetPage = {false}
                      entriesPerPage = {false}
                      canSearch = {false}
                      isSorted = {false}
                    />
                  : <SuiTypography variant="button" fontWeight="regular" color="text" pl={4}>
                      Aun no se han realizado publicaciones de calificaciones para {estudiante[0].nombre}
                    </SuiTypography>
                }
                  
              </Grid>
            </SuiBox>
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

  
}

export default Overview;

/*<SuiBox pt={2} px={2}>
              <SuiBox mb={0.5}>
                <SuiTypography variant="h5" fontWeight="bold" textTransform="capitalize" textGradient color="info">
                  CALIFICACIONES
                </SuiTypography>
              </SuiBox>
              <SuiBox mb={1}>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                  En este espacio podrá visualizar las calificaciones publicadas.
                </SuiTypography>
              </SuiBox>
            </SuiBox>*/
