import { useState,useEffect } from "react";
import useAuth from "hooks/useAuth";
import axios from 'api/axios';
import axiosORIGIN from 'axios';
import Cookies from "universal-cookie";
import Skeleton from '@mui/material/Skeleton';


// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBadge from "components/SuiBadge";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";


function Header() {
  const { auth } = useAuth();
  const [usuario, setUsuario] = useState({});
  const [cargando, setCargando] = useState(true);
  const cookies = new Cookies();
  const jwtInterceoptor = axiosORIGIN.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const [visible, setVisible] = useState(true);

  const handleSetVisible = () => setVisible(!visible);

  useEffect(()=>{
    jwtInterceoptor.get('https://minumeapi.azurewebsites.net/api/USUARIOPERFIL'+`/${auth.usuario}`)
      .then((response) => {
        setUsuario(response.data)
        setCargando(false);
      });
  
  }, [cargando]);

  // Badges
  const superUser = (
    <SuiBadge variant="gradient" color="info" size="sm" badgeContent="Super User" container />
  );
  const Admin = (
    <SuiBadge variant="gradient" color="primary" size="sm" badgeContent="Admin" container />
  );
  const DocenteCentro = (
    <SuiBadge variant="gradient" color="error" size="sm" badgeContent="Docente Centro" container />
  );
  const TecDistrito = (
    <SuiBadge variant="gradient" color="secondary" size="sm" badgeContent="Técnico Distrito" container />
  );
  const TecReg = (
    <SuiBadge variant="gradient" color="secondary" size="sm" badgeContent="Técnico Regional" container />
  );
  const Voluntario = (
    <SuiBadge variant="gradient" color="warning" size="sm" badgeContent="Voluntario" container />
  );

  return (
      <Card id="perfil">
        <SuiBox p={2}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              {cargando? <Skeleton animation="wave" variant="circular" width={75} height={75}/> 
              : <SuiAvatar
                  src={usuario.imageSrc}
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
                />}
            </Grid>
            <Grid item>
              <SuiBox height="100%" mt={0.5} lineHeight={1}>
                {cargando 
                ? <SuiTypography variant="h5" fontWeight="medium">
                    <Skeleton animation="wave" width={250}/>
                  </SuiTypography>
                :<SuiTypography variant="h5" fontWeight="medium">
                  {usuario.nombre} {usuario.apellido}
                </SuiTypography>}
                {cargando 
                ? <SuiTypography variant="button" color="text" fontWeight="medium">
                  <Skeleton animation="wave" width={100}/>
                </SuiTypography>
                :<SuiTypography variant="button" color="text" fontWeight="medium">
                  {usuario.comision} / {usuario.tipo_Mesa}
                </SuiTypography>}
                
              </SuiBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
              <SuiBox
                display="flex"
                justifyContent={{ md: "flex-end" }}
                alignItems="center"
                lineHeight={1}
              >
                {cargando
                ? <Skeleton animation="wave" width={80}/>
                :usuario.roleId == "Super User" ? superUser
                :usuario.roleId == "Admin" ? Admin
                :usuario.roleId == "Docente Centro" ? DocenteCentro
                :usuario.roleId == "Tecnico Distrito" ? TecDistrito
                :usuario.roleId == "Tecnico Regional" ? TecReg
                :usuario.roleId == "Voluntario" && Voluntario}
                
              </SuiBox>
            </Grid>
          </Grid>
        </SuiBox>
      </Card>
    );
}

export default Header;
