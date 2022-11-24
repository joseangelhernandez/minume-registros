import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

// react-router components
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Soft UI Dashboard PRO React routes
import routes from "routes";
import login from "layouts/authentication/sign-in/illustration";
import ModificarEstudiante from "layouts/estudiantes/modif-estudiante";
import PerfilEstudiante from "layouts/perfil-estudiante/profile-overview";
import ModificarUsuario from "layouts/usuarios/modif-usuario"

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logos/logoMinume.png";

require("dotenv").config();

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const cookies = new Cookies();
  const locations = useLocation();

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
        return <Route exact path={route.route} component={route.component} key={route.key} />;
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
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SuiBox>
  );

  //SI EL USUARIO ESTA LOGEADO PERO NO EXISTE LA RUTA
  if(cookies.get('usuario'))
  { if(locations.pathname === '/estudiante'){
    return(
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {getRoutes(routes)}
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={login} />
        <Route exact path="/estudiante/:estuID" component={PerfilEstudiante} />
      </Switch>
        <Redirect from="*" to="/" />
    </ThemeProvider>)
    }else if(locations.pathname === '/estudiantes'){
      return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route exact path="/" component={login} />
          <Route exact path="/estudiante/:estuID" component={PerfilEstudiante} />
        </Switch>
          <Redirect from="*" to="/estudiantes/gestionar-estudiantes" />
      </ThemeProvider>)
    }else if(locations.pathname === '/usuarios' || locations.pathname === '/cuentas'){
      return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route exact path="/" component={login} />
          <Route exact path="/estudiante/:estuID" component={PerfilEstudiante} />
        </Switch>
          <Redirect from="*" to="/usuarios/cuentas/gestionar-cuentas" />
      </ThemeProvider>)
    }

    //SI EL USUARIO ESTA LOGEADO PERO SI EXISTE LA RUTA
    else if(getRoutes(routes) && locations.pathname.slice(0, locations.pathname.lastIndexOf('/')) !== '/estudiante'){
      return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/:url([a-z/]*[A-Z]+[a-z/]*)*(/+)" to={pathname.slice(0, -1)} />
          <Route exact path="/" component={login} />
          <Route exact path="/estudiantes/editar-estudiante" component={ModificarEstudiante} />
          <Route exact path="/estudiante/:estuID" component={PerfilEstudiante} />
          <Route exact path="/usuarios/editar-usuario" component={ModificarUsuario} />
        </Switch> <>
          <Sidenav
          color={sidenavColor}
          brand={brand}
          brandName="MINUME - PLERD"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        </>
      </ThemeProvider>)
    }
  }

  //SI EL USUARIO NO ESTA LOGUEADO
  if(!cookies.get('usuario') && getRoutes(routes) ){
    return(
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {getRoutes(routes)}
        <Redirect from="/:url([a-z/]*[A-Z]+[a-z/]*)*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={login} />
        <Route exact path="/estudiantes/editar-estudiante" component={ModificarEstudiante} />
        <Route exact path="/estudiante/:estuID" component={PerfilEstudiante} />
        <Route exact path="/usuarios/editar-usuario" component={ModificarUsuario} />
      </Switch>
      <Redirect from="*" to="/" />
    </ThemeProvider>
    )
  }else {
    return(
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {getRoutes(routes)}
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={login} />
        <Route exact path="/estudiantes/editar-estudiante" component={ModificarEstudiante} />
        <Route exact path="/estudiante/:estuID" component={PerfilEstudiante} />
        <Route exact path="/usuarios/editar-usuario" component={ModificarUsuario} />
      </Switch>
      
    </ThemeProvider>
    )
  }
}


