import { useState, useEffect, React } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import axios from 'api/axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import QRCODE from 'qrcode'
import logoCarga from "assets/images/pantallaCarga/Logo-minume-carga.gif";
import useAuth from "hooks/useAuth";


// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import logoMinume from "assets/images/logos/logoMinume.png"

// Soft UI Dashboard PRO React example components
import DashboardNavbar from "examples/Navbar-perfil/DashboardNavbar";

// Images
//import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";

// @mui material components
import Card from "@mui/material/Card";


// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/PageLayout-perfil";
import Footer from "examples/Footer";
import SuiBadge from "components/SuiBadge";
import SuiButton from "components/SuiButton";

// sweetalert2 components
import Swal from "sweetalert2";


function Overview() {
  const { auth } = useAuth();
  const [participante, setParticipante] = useState({
    id: '',
    cedula: '',
    nombre: '',
    sexo: '',
    tipo_participante: '',
    institucion: '',
    email: '',
    telefono: '',
    habitacion: '',
    confirmacion: ''
  });
  const parametros = useParams();
  const history = useNavigate();
  const [cargando, setCargando] = useState(true)
  const [ScreenSize, setScreenSize] = useState(window.innerWidth);
  const cookies = new Cookies();
  const [qrcode, setQRCode] = useState('');
  const _URL = 'https://minume.minerd.gob.do/participantePerfil'+`/${parametros.estuID}`
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
    await jwtInterceoptor.post('https://minumeapi.azurewebsites.net/api/PARTICIPANTE/'+`${parametros.estuID}`)
    .then(()=> {
        Swal.fire({
          icon: 'success',
          title: 'Participante confirmado satisfactoriamente',
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
          text: 'Hubo un error intentando confirmar al participante, si el error persiste comunicarse con soporte.',
        });
      });
  }

  useEffect(()=>{
    axios.get('/PARTICIPANTE/GET'+`/${parametros.estuID}`)
      .then((response)=> {
        setParticipante(response.data[0])
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

    setScreenSize(window.innerWidth);

  },[cargando, ScreenSize])

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
                    {participante.nombre}
                  </SuiTypography>
                  <SuiTypography variant="button" color="text" fontWeight="medium">
                  {participante.tipo_participante}
                  </SuiTypography>
                </SuiBox>
              </Grid>
              {ScreenSize < 1000 
              ? <Grid item xs={12} lg={4} sx={{ ml: "auto" }} style={{textAlign: 'center', marginTop: -15}}>
                <SuiBox style={{textAlign: 'center', marginBottom: 12}}> </SuiBox>
                {auth?.usuario !== undefined && participante.confirmacion === false
              ? <SuiButton variant="gradient" color="dark" size="md" onClick={confirmar}>Confirmar</SuiButton>
              : participante.confirmacion ? confirmado : NOconfirmado}
              </Grid>
              : <Grid item xs={8} md={20} lg={4} sx={{ ml: "auto", mr:'30px' }} style={{textAlign: 'right'}}>
                {auth?.usuario !== undefined && participante.confirmacion === false
              ? <SuiButton variant="gradient" color="dark" size="md" onClick={confirmar}>Confirmar</SuiButton>
              : participante.confirmacion ? confirmado : NOconfirmado}
              </Grid>}
                    
            </Grid>
          </Card>
        </SuiBox>
        <SuiBox mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <SuiBox pt={2} pb={2} px={2} lineHeight={1.25}>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center', marginBottom : -10}}>
                    QR del participante Cédula: <SuiTypography variant="h6" fontWeight="bold" textTransform="capitalize" textGradient color="dark">
                    {participante.cedula}
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
                        {participante.sexo === 'M'
                        ? <SuiBadge variant="contained" color="dark" size="lg" badgeContent="MASCULINO" container />
                        : <SuiBadge variant="contained" color="primary" size="lg" badgeContent="FEMENINO" container />}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center', marginBottom : 10, marginTop: 10}}>
                    Hotel de la habitación
                    <SuiBox width="100%">
                      <SuiTypography variant="h5" fontWeight="bold" textTransform="capitalize" textGradient color="dark">
                        {participante.hotel}
                      </SuiTypography>
                    </SuiBox>
                  </SuiTypography>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase" style={{textAlign: 'center', marginBottom : 10, marginTop: 10}}>
                    Número de habitación
                    <SuiBox width="100%">
                      <SuiTypography variant="h5" fontWeight="bold" textTransform="capitalize" textGradient color="dark">
                        {participante.habitacion}
                      </SuiTypography>
                    </SuiBox>
                  </SuiTypography>
                </SuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
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
                        {participante.email}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Teléfono celular:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {participante.telefono}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Lugar de representación:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {participante.institucion}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiTypography variant="subtitle2" fontWeight="bold" color="text" textTransform="uppercase">
                    Cargo del participante:
                  </SuiTypography>
                  <SuiBox display="flex" py={1} mb={0.25}>
                    <SuiBox ml={2}>
                      <SuiTypography variant="body2" fontWeight="regular" color="text">
                        {participante.tipo_participante}
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                </SuiBox>
              </Card>
            </Grid>
          </Grid>
        </SuiBox>
        <Footer />
      </DashboardLayout>
    );
  }

  
}

export default Overview;
