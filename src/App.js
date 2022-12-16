import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import useAuth from 'hooks/useAuth';
import { io } from 'socket.io-client';
import axios from 'axios';

// react-router components
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconMUI from "@mui/material/Icon";
import { Icon } from '@iconify/react';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Soft UI Dashboard PRO React routes
import Login from "layouts/authentication/sign-in/illustration";
import ModificarEstudiante from "layouts/estudiantes/modif-estudiante";
import PerfilEstudiante from "layouts/perfil-estudiante/profile-overview";
import PerfilStaff from "layouts/perfil-staff/profile-overview";
import PerfilParticipante from "layouts/perfil-participante/profile-overview";
import ModificarUsuario from "layouts/usuarios/modif-usuario";
import RequireAuth from "layouts/RequireAuth/RequireAuth";
import PersistLogin  from "PersistLogin";
import PersistLoginPerfiles  from "PersistLoginPerfiles";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logos/logoMinume.png";

//#region RUTAS DE COMPONENTES
import Default from "layouts/dashboards/default";
import RegEstudiante from "layouts/estudiantes/reg-estudiante"
import GestEstudiante from "layouts/estudiantes/gest-estudiante"
import RegUser from "layouts/usuarios/reg-usuario"
import GestUser from "layouts/usuarios/gest-usuario"
import Perfil from "layouts/perfil"
import Calificaciones from "layouts/calificaciones/gest-calificaciones"
import GestStaff from "layouts/staff/gest-staff"
import RegStaff from "layouts/staff/reg-staff"
import ModificarStaff from "layouts/staff/modif-staff";
import GestParticipantes from "layouts/participantes/gest-participantes";
import RegParticipantes from "layouts/participantes/reg-participante";
import ModificarParticipantes from "layouts/participantes/modif-participantes";
import Comunicaciones from "layouts/comunicaciones/gest-comunicaciones";
import Temporales from "layouts/temporales/gest-temporales";
import GestHabitaciones from "layouts/habitaciones/gest-habitaciones";
import Error404 from "layouts/authentication/error/404";
//#endregion

export default function App() {
  const { auth } = useAuth();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const cookies = new Cookies();
  const locations = useLocation();
  const [usuarios, setUsuarios] = useState([]);
  const [socket, setSocket] = useState(io("http://localhost:5000"));
  const jwtInterceoptor = axios.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  useEffect(() => {
    socket?.emit("nuevoUsuario", auth?.usuario)
  }, [socket, auth]);

  useEffect(() => {
    if(auth?.usuario !== undefined){
      jwtInterceoptor.get('https://minume-umnurd.edu.do/api/USUARIOS_SP'+`/${auth.usuario}`)
      .then((response)=> {
        setUsuarios(response.data)
      });
    }
  }, [auth]);

  let routesSuper =[
    {
      type: "individual",
      name: "Inicio",
      key: "Inicio",
      route: "/Inicio",
      component: <Default socket={socket}/>,
      icon: <Icon icon="flat-color-icons:home" />,
      noCollapse: true,
    },{
      type: "individual",
      name: "Perfil",
      key: "Perfil",
      route: "/Perfil",
      component: <Perfil socket={socket}/>,
      icon: <Icon icon="flat-color-icons:info" />,
      noCollapse: true,
    },
    { type: "title", title: "ADM", key: "title-adm" },
    {
      type: "collapse",
      name: "Estudiantes",
      key: "estudiantes",
      icon: <Icon icon="flat-color-icons:graduation-cap" />,
      collapse: [
        {
          name: "Gestión de estudiantes",
          key: "gestionar-estudiantes",
          route: "/estudiantes/gestionar-estudiantes",
          component: <GestEstudiante socket={socket}/>,
        },
        {
          name: "Registrar estudiante",
          key: "registrar-estudiante",
          route: "/estudiantes/registrar-estudiante",
          component: <RegEstudiante socket={socket}/>,
        },
      ],
    },
    {
      type: "collapse",
      name: "Usuarios",
      key: "usuarios",
      icon: <Icon icon="flat-color-icons:key" />,
      collapse: [
        {
          name: "Gestionar cuentas",
          key: "gestionar-cuentas",
          route: "/usuarios/gestionar-cuentas",
          component: <GestUser socket={socket}/>,
        },
        {
          name: "Crear cuenta",
          key: "crear-cuenta",
          route: "/usuarios/crear-cuenta",
          component: <RegUser socket={socket}/>,
        },
      ],
    },
    {
      type: "collapse",
      name: "Staff",
      key: "staff",
      icon: <Icon icon="fluent-emoji-flat:identification-card" />,
      collapse: [
        {
          name: "Gestión de staff",
          key: "gestionar-staff",
          route: "/staff/gestionar-staff",
          component: <GestStaff socket={socket}/>,
        },
        {
          name: "Registrar staff",
          key: "registrar-staff",
          route: "/staff/registrar-staff",
          component: <RegStaff socket={socket}/>,
        },
      ],
    },
    {
      type: "collapse",
      name: "Participantes",
      key: "participantes",
      icon: <Icon icon="fluent-emoji-flat:man-office-worker" />,
      collapse: [
        {
          name: "Gestión de participantes",
          key: "gestionar-participantes",
          route: "/participantes/gestionar-participantes",
          component: <GestParticipantes socket={socket}/>,
        },
        {
          name: "Registrar participantes",
          key: "registrar-participantes",
          route: "/participantes/registrar-participantes",
          component: <RegParticipantes socket={socket}/>,
        },
      ],
    },
    {
      type: "individual",
      name: "Habitaciones",
      key: "Habitaciones",
      route: "/Habitaciones",
      component: <GestHabitaciones socket={socket}/>,
      icon: <Icon icon="fluent-emoji-flat:bed" />,
      noCollapse: true,
    },
    {
      type: "individual",
      name: "Temporales",
      key: "Temporales",
      route: "/Temporales",
      component: <Temporales socket={socket}/>,
      icon: <Icon icon="fluent-emoji-flat:repeat-button" />,
      noCollapse: true,
    },
    {
      type: "individual",
      name: "Calificaciones",
      key: "Calificaciones",
      route: "/Calificaciones",
      component: <Calificaciones socket={socket}/>,
      icon: <Icon icon="flat-color-icons:view-details" />,
      noCollapse: true,
    }

  ]

  let routesNormal =[
    {
      type: "individual",
      name: "Inicio",
      key: "Inicio",
      route: "/Inicio",
      component: <Default socket={socket}/>,
      icon: <Icon icon="flat-color-icons:home" />,
      noCollapse: true,
    },{
      type: "individual",
      name: "Perfil",
      key: "Perfil",
      route: "/Perfil",
      component: <Perfil socket={socket}/>,
      icon: <Icon icon="flat-color-icons:info" />,
      noCollapse: true,
    },
    { type: "title", title: "ADM", key: "title-adm" },
    {
      type: "collapse",
      name: "Estudiantes",
      key: "estudiantes",
      icon: <Icon icon="flat-color-icons:graduation-cap" />,
      collapse: [
        {
          name: "Gestión de estudiantes",
          key: "gestionar-estudiantes",
          route: "/estudiantes/gestionar-estudiantes",
          component: <GestEstudiante socket={socket}/>,
        },
      ],
    },
  ]

  let rutas =[
    {
      type: "individual",
      name: "Inicio",
      key: "Inicio",
      route: "/Inicio",
      component: <Default socket={socket}/>,
      icon: <Icon icon="flat-color-icons:home" />,
      noCollapse: true,
    },{
      type: "individual",
      name: "Perfil",
      key: "Perfil",
      route: "/Perfil",
      component: <Perfil socket={socket}/>,
      icon: <Icon icon="flat-color-icons:info" />,
      noCollapse: true,
    },
    { type: "title", title: "ADM", key: "title-adm" },
    {
      type: "collapse",
      name: "Estudiantes",
      key: "estudiantes",
      icon: <Icon icon="flat-color-icons:graduation-cap" />,
      collapse: [
        {
          name: "Gestión de estudiantes",
          key: "gestionar-estudiantes",
          route: "/estudiantes/gestionar-estudiantes",
          component: <GestEstudiante socket={socket}/>,
        },
        {
          name: "Registrar estudiante",
          key: "registrar-estudiante",
          route: "/estudiantes/registrar-estudiante",
          component: <RegEstudiante socket={socket}/>,
        },
      ],
    },
    {
      type: "collapse",
      name: "Usuarios",
      key: "usuarios",
      icon: <Icon icon="flat-color-icons:key" />,
      collapse: [
        {
          name: "Gestionar cuentas",
          key: "gestionar-cuentas",
          route: "/usuarios/gestionar-cuentas",
          component: <GestUser socket={socket}/>,
        },
        {
          name: "Crear cuenta",
          key: "crear-cuenta",
          route: "/usuarios/crear-cuenta",
          component: <RegUser socket={socket}/>,
        },
      ],
    },
    {
      type: "collapse",
      name: "Staff",
      key: "staff",
      icon: <Icon icon="fluent-emoji-flat:identification-card" />,
      collapse: [
        {
          name: "Gestión de staff",
          key: "gestionar-staff",
          route: "/staff/gestionar-staff",
          component: <GestStaff socket={socket}/>,
        },
        {
          name: "Registrar staff",
          key: "registrar-staff",
          route: "/staff/registrar-staff",
          component: <RegStaff socket={socket}/>,
        },
      ],
    },
    {
      type: "collapse",
      name: "Participantes",
      key: "participantes",
      icon: <Icon icon="fluent-emoji-flat:man-office-worker" />,
      collapse: [
        {
          name: "Gestión de participantes",
          key: "gestionar-participantes",
          route: "/participantes/gestionar-participantes",
          component: <GestParticipantes socket={socket}/>,
        },
        {
          name: "Registrar participantes",
          key: "registrar-participantes",
          route: "/participantes/registrar-participantes",
          component: <RegParticipantes socket={socket}/>,
        },
      ],
    },
    {
      type: "individual",
      name: "Habitaciones",
      key: "Habitaciones",
      route: "/Habitaciones",
      component: <GestHabitaciones socket={socket}/>,
      icon: <Icon icon="fluent-emoji-flat:bed" />,
      noCollapse: true,
    },
    {
      type: "individual",
      name: "Temporales",
      key: "Temporales",
      route: "/Temporales",
      component: <Temporales socket={socket}/>,
      icon: <Icon icon="fluent-emoji-flat:repeat-button" />,
      noCollapse: true,
    },
    {
      type: "individual",
      name: "Calificaciones",
      key: "Calificaciones",
      route: "/Calificaciones",
      component: <Calificaciones socket={socket}/>,
      icon: <Icon icon="flat-color-icons:view-details" />,
      noCollapse: true,
    }
  ]


  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route path={route.route} element={route.component} key={route.key}/>;
      }

      return null;
    });

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <IconMUI fontSize="default" color="inherit">
        settings
      </IconMUI>
    </SuiBox>
  );

  return(
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route path="/:url([a-z/]*[A-Z]+[a-z/]*)*(/+)"  element={<Navigate to={pathname.slice(0, -1)} replace/>} />
      <Route path="/" element={<Login/>} />
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route element={<PersistLoginPerfiles/>}>
          <Route path="/estudiante/:estuID" element={<PerfilEstudiante/>} />
          <Route path="/staffPerfil/:estuID" element={<PerfilStaff/>} />
          <Route path="/participantePerfil/:estuID" element={<PerfilParticipante/>} />
      </Route>

      <Route element={<PersistLogin/>}>

        <Route element={<RequireAuth/>}>
          {getRoutes(rutas)}
          <Route path="/estudiantes/editar-estudiante" element={<ModificarEstudiante socket={socket}/>} />
          <Route path="/usuarios/editar-usuario" element={<ModificarUsuario socket={socket}/>} />
          <Route path="/staff/editar-staff" element={<ModificarStaff socket={socket}/>} />
          <Route path="/participantes/editar-participante" element={<ModificarParticipantes socket={socket}/>} />
        </Route>
      </Route>
      

    </Routes><>
      {auth.role === 1 && !location.pathname.includes('/estudiante/') &&(
        !location.pathname.includes('/participantePerfil/') &&
        !location.pathname.includes('/staffPerfil/') &&(
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="MINUME - PLERD"
            routes={routesSuper}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        )
      )}

      {auth.role > 1  && !window.location.pathname.includes('/estudiante/') && (
        !location.pathname.includes('/participantePerfil/') &&
        !location.pathname.includes('/staffPerfil/') &&(
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="MINUME - PLERD"
            routes={routesNormal}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        )
      )}
    </>

  </ThemeProvider>
  )
}

