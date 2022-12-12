import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import useAuth from 'hooks/useAuth';

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
import ModificarUsuario from "layouts/usuarios/modif-usuario";
import RequireAuth from "layouts/RequireAuth/RequireAuth";
import PersistLogin  from "PersistLogin";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logos/logoMinume.png";

// Soft UI Dashboard PRO React icons
import SettingsIcon from "examples/Icons/Settings";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

//#region RUTAS DE COMPONENTES
import Default from "layouts/dashboards/default";
import RegEstudiante from "layouts/estudiantes/reg-estudiante"
import GestEstudiante from "layouts/estudiantes/gest-estudiante"
import RegUser from "layouts/usuarios/reg-usuario"
import GestUser from "layouts/usuarios/gest-usuario"
import Perfil from "layouts/perfil"
import Calificaciones from "layouts/calificaciones/gest-calificaciones"
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

  const routesSuper =[
    {
      type: "individual",
      name: "Inicio",
      key: "Inicio",
      route: "/Inicio",
      component: <Default/>,
      icon: <Icon icon="flat-color-icons:home" />,
      noCollapse: true,
    },{
      type: "individual",
      name: "Perfil",
      key: "Perfil",
      route: "/Perfil",
      component: <Perfil/>,
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
          component: <GestEstudiante/>,
        },
        {
          name: "Registrar estudiante",
          key: "registrar-estudiante",
          route: "/estudiantes/registrar-estudiante",
          component: <RegEstudiante/>,
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
          name: "Cuentas",
          key: "cuentas",
          collapse: [
            {
              name: "Gestionar cuentas",
              key: "gestionar-cuentas",
              route: "/usuarios/cuentas/gestionar-cuentas",
              component: <GestUser/>,
            },
            {
              name: "Crear cuenta",
              key: "crear-cuenta",
              route: "/usuarios/cuentas/crear-cuenta",
              component: <RegUser/>,
            },
          ],
        },
      ],
    },
    {
      type: "individual",
      name: "Calificaciones",
      key: "Calificaciones",
      route: "/Calificaciones",
      component: <Calificaciones/>,
      icon: <Icon icon="flat-color-icons:view-details" />,
      noCollapse: true,
    },
  ]

  const routesNormal =[
    {
      type: "individual",
      name: "Inicio",
      key: "Inicio",
      route: "/Inicio",
      component: <Default/>,
      icon: <Icon icon="flat-color-icons:home" />,
      noCollapse: true,
    },{
      type: "individual",
      name: "Perfil",
      key: "Perfil",
      route: "/Perfil",
      component: <Perfil/>,
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
          component: <GestEstudiante/>,
        },
      ],
    },
    
  ]

  const rutas =[
    {
      type: "individual",
      name: "Inicio",
      key: "Inicio",
      route: "/Inicio",
      component: <Default/>,
      icon: <Icon icon="flat-color-icons:home" />,
      noCollapse: true,
    },{
      type: "individual",
      name: "Perfil",
      key: "Perfil",
      route: "/Perfil",
      component: <Perfil/>,
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
          component: <GestEstudiante/>,
        },
        {
          name: "Registrar estudiante",
          key: "registrar-estudiante",
          route: "/estudiantes/registrar-estudiante",
          component: <RegEstudiante/>,
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
          name: "Cuentas",
          key: "cuentas",
          collapse: [
            {
              name: "Gestionar cuentas",
              key: "gestionar-cuentas",
              route: "/usuarios/cuentas/gestionar-cuentas",
              component: <GestUser/>,
            },
            {
              name: "Crear cuenta",
              key: "crear-cuenta",
              route: "/usuarios/cuentas/crear-cuenta",
              component: <RegUser/>,
            },
          ],
        },
      ],
    },
    {
      type: "individual",
      name: "Calificaciones",
      key: "Calificaciones",
      route: "/Calificaciones",
      component: <Calificaciones/>,
      icon: <Icon icon="flat-color-icons:view-details" />,
      noCollapse: true,
    },
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
      <Route path="/estudiante/:estuID" element={<PerfilEstudiante/>} />
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth/>}>
          {getRoutes(rutas)}
          <Route path="/estudiantes/editar-estudiantes" element={<ModificarEstudiante/>} />
          <Route path="/usuarios/editar-usuario" element={<ModificarUsuario/>} />
        </Route>
      </Route>
      

    </Routes><>
      {auth.role === 1 && (
        <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName="MINUME - PLERD"
        routes={routesSuper}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      )}
      {auth.role > 1  && (
        <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName="MINUME - PLERD"
        routes={routesNormal}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      )}
    </>

  </ThemeProvider>
  )
}

