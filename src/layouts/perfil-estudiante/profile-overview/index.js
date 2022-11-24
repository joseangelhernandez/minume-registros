import { useState, useEffect, React } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router";
import Cookies from 'universal-cookie';
import QRCODE from 'qrcode'

//HEADER
// @mui material components
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import logoMinume from "assets/images/logos/logoMinume.png"

// Soft UI Dashboard PRO React example components
import DashboardNavbar from "examples/Navbar-perfil/DashboardNavbar";

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

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/PageLayout-perfil";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import SuiBadge from "components/SuiBadge";
import SuiButton from "components/SuiButton";

// sweetalert2 components
import Swal from "sweetalert2";


function Overview() {
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
  const history = useHistory();
  const [cargando, setCargando] = useState(true)
  const [ScreenSize, setScreenSize] = useState(window.innerWidth);
  const cookies = new Cookies();
  const [qrcode, setQRCode] = useState('');
  const _URL = 'http://localhost:3000/estudiante'+`/${parametros.estuID}`

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Badges
  const NOconfirmado = (
    <SuiBadge variant="gradient" color="error" size="lg" badgeContent="No confirmado" container />
  );
  const confirmado = (
    <SuiBadge variant="gradient" color="success" size="lg" badgeContent="Confirmado" container />
  );

  const confirmar = async () => {
    try{
      await axios.put('http://jose03-001-site1.htempurl.com/api/ESTUDIANTES'+`/${parametros.estuID}`,{
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
    })
      Swal.fire({
        icon: 'success',
        title: 'Estudiante confirmado satisfactoriamente',
        timer: 2500,
        showConfirmButton: false,
      });
      await sleep(2600);
      history.go(0);
    }catch{
      Swal.fire({
        icon: 'error',
        title: 'Error en la confirmación',
        timer: 3000,
        showConfirmButton: false,
        text: 'Hubo un error intentando confirmar al estudiante, si el error persiste comunicarse con soporte.',
      });
    }
    
  }

  useEffect(async ()=>{
    await axios.get('http://jose03-001-site1.htempurl.com/api/ESTUDIANTES'+`/${parametros.estuID}`)
      .then((response)=> {
        setEstuput(response.data)
      });

    await axios.get('http://jose03-001-site1.htempurl.com/api/PERFIL_ESTUDIANTE'+`/${parametros.estuID}`)
      .then((response)=> {
        setEstudiante(response.data)
        setCargando(false)
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

    if(!estudiante){
      history.push({pathname: "/Inicio"})
    }

    setScreenSize(window.innerWidth);

  },[cargando, ScreenSize])

  if(cargando){
    return(<div>cargando...</div>)
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
                {cookies.get('roleid') == 1 && estudiante[0].confirmacion === false
              ? <SuiButton variant="gradient" color="dark" size="md" onClick={confirmar}>Confirmar</SuiButton>
              : estudiante[0].confirmacion ? confirmado : NOconfirmado}
              </Grid>
              : <Grid item xs={8} md={20} lg={4} sx={{ ml: "auto", mr:'30px' }} style={{textAlign: 'right'}}>
                {cookies.get('roleid') == 1 && estudiante[0].confirmacion === false
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
                    Número de habitación: <SuiTypography variant="h5" fontWeight="bold" textTransform="capitalize" textGradient color="dark">
                    {estudiante[0].habitacion}
                    </SuiTypography>
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
            <SuiBox pt={2} px={2}>
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
            </SuiBox>
            <SuiBox p={2}>
              <Grid container spacing={3}>
                
              </Grid>
            </SuiBox>
          </Card>
        </SuiBox>
  
        <Footer />
      </DashboardLayout>
    );
  }

  
}

export default Overview;
