
import { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import axios from 'axios';


// react-router components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import SvgIcon from '@mui/material/SvgIcon';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import audio from "examples/Navbars/notificationRigntone/notification.mp3";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard PRO React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { position } from "stylis";

function AlarmIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z" />
    </SvgIcon>
  );
}

function DashboardNavbar({ socket, absolute, light, isMini }) {
  const notifAud = new Audio(audio);
  notifAud.muted = false;
  const { auth } = useAuth();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargado, setcargado] = useState(false);
  let contador = 0;

  useEffect(() => {
    socket.on("obtenernotificacion", datos=>{
      setNotificaciones(notificaciones => [...notificaciones, datos]);
    });
  }, [socket]);

  useEffect(() => {
    if(cargado){
      if(notificaciones.length === 0){null}else{
        notificaciones.length === 1 ? toast.info(`Tienes ${notificaciones.length} notificación.`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        }) :
        toast.info(`Tienes ${notificaciones.length} notificaciones.`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        });
        notifAud.play();
        
      }
    }

  }, [notificaciones.length]);

  useEffect(() => {
    axios.get('https://minume-umnurd.edu.do/api/NOTIFICACION' + `/${auth.usuario}`)
    .then(res => {
      setNotificaciones(res.data);
      setcargado(true);
    }).catch(err => {
      console.log(err.response.data);
    })
    
  }, []);

  const displayNotificaciones = (senderName, nombreUsuario, type) => {

    let action;
    contador++;
    

    if(type === 1){
      action = " Emergencia te ha enviado un mensaje";
    }else if(type === 2){
      action = " Emergencia ha aceptado tu solicitud";
    }

    return (
      <NotificationItem
        key={contador}
        image={<img src={team2} alt="person" />}
        title={[`${action}`, `${nombreUsuario}`]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
    );

  };

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);

    
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLeido = () => {
    axios.put('https://minume-umnurd.edu.do/api/NOTIFICACION' + `/${auth.usuario}`)
    setNotificaciones([]) 
    setOpenMenu(false)
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {notificaciones.map((notificacion) => {return displayNotificaciones(notificacion.senderName, notificacion.nombreUsuario, notificacion.type)})}
      {notificaciones.length > 0 && 
        <SuiButton variant="gradient" color="success" size="small" onClick={handleLeido}>Marcar todo como leído</SuiButton>
      }
    </Menu>
  );
  
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </SuiBox>
        {isMini ? null : (
          <SuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SuiBox color={light ? "white" : "inherit"}>
                <SuiTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    {auth.nombre} {auth.apellido}
                  </SuiTypography>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>

              {notificaciones.length > 0 ?
                <IconButton
                  size="large"
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <AlarmIcon sx={{ fontSize: 500 }}/>
                  <div style={{fontSize: "9px", width: "15px", height: "15px", backgroundColor: "red", borderRadius: "50%", padding: "7.5px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: -25, marginLeft: 15, position: "absolute", color: "white"}}>
                    {notificaciones.length}
                  </div>
                </IconButton>
              : <IconButton
                  size="large"
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                >
                  <AlarmIcon sx={{ fontSize: 500 }}/>
                </IconButton>}
              {renderMenu()}
            </SuiBox>
            {notificaciones.senderName}
            
          </SuiBox>
        )}
      </Toolbar>
      {notificaciones.map((notificacion) => {<span>{`${notificacion.senderName} ${notificacion.type}`}</span>})}
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
