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

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table_Habitaciones from "layouts/habitaciones/gest-habitaciones/Tabla_habitaciones/dataTableEditorHab";
import Table_Resumen from "layouts/habitaciones/gest-habitaciones/Tabla_resumen/dataTableEditorHabRes";
import Delegados from "layouts/habitaciones/gest-habitaciones/DataTableEdit_delegados/dataTableEditorDel";
import Participantes from "layouts/habitaciones/gest-habitaciones/DataTableEdit_participantes/dataTableEditorPart";
import Staff from "layouts/habitaciones/gest-habitaciones/DataTableEdit_staff/dataTableEditorStaff";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckTemporales({stickyNavbar, socket}) {
  const { auth} = useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const jwtInterceoptor = axios.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });
  const [cargando, setCargando] = useState(true);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  const [habitacionesDisp, setHabitacionesDisp] = useState([]);
  const [tblHabitaciones, setblHabitaciones] = useState([
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>,
      huesped: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      habitacion: <Skeleton/>,
      tipo: <Skeleton/>,
      hotel: <Skeleton/>,
      edificio: <Skeleton/>,
      piso: <Skeleton/>
    }
    ]
  );
  const [tblDelegados, setTblDelegados] = useState([
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      regional: <Skeleton/>,
      nombre: <Skeleton/>,
      edad: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      correo_electronico: <Skeleton/>,
      habitacion: <Skeleton/>
    },

    ]
  );

  const [tblParticipantes, setTblParticipantes] = useState([
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    ]
  );

  const [tblStaff, setTblStaff] = useState([
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },
    {
      id: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>
    },

    ]
  );

  const [tblResumen, setTblResumen] = useState([
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    {
      cedula: <Skeleton/>,
      nombre: <Skeleton/>,
      sexo: <Skeleton/>,
      telefono: <Skeleton/>,
      email: <Skeleton/>,
      habitacion: <Skeleton/>,
      hotel: <Skeleton/>
    },
    
    ]
  );

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
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/HABITACIONES')
      .then((response)=> {
        setblHabitaciones(response.data);
    });

    axios.get('https://minume-umnurd.edu.do/api/HABITACIONES/DISPONIBLESDROP')
    .then((response)=> {
      setHabitacionesDisp(response.data);
    });

  }, [cargando]);

  return (
  <DashboardLayout>
    <ToastContainer />
    <DashboardNavbar socket={socket}/>
    <SuiBox my={3}>
      <Card>
        <Table_Habitaciones tblHabitaciones={tblHabitaciones}/>
      </Card>
    </SuiBox>
    <SuiBox mt={stickyNavbar ? 3 : 5}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab label="Delegados"/>
                <Tab label="Participantes"/>
                <Tab label="Staff"/>
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
    </SuiBox>
    <SuiBox my={3}>
      <Card>
        {tabValue === 0 && <Delegados tblDelegados={tblDelegados} habitacionesDisp={habitacionesDisp}/>}
        {tabValue === 1 && <Participantes tblParticipantes={tblParticipantes} habitacionesDisp={habitacionesDisp}/>}
        {tabValue === 2 && <Staff tblStaff={tblStaff} habitacionesDisp={habitacionesDisp}/>}
      </Card>
    </SuiBox>
    <SuiBox my={3}>
      <Card>
        <Table_Resumen tblResumen={tblResumen}/>
      </Card>
    </SuiBox>
    <Footer />
  </DashboardLayout>
  );

}

// Setting default values for the props of BaseLayout
CheckTemporales.defaultProps = {
  stickyNavbar: false,
};

// Typechecking props for BaseLayout
CheckTemporales.propTypes = {
  stickyNavbar: PropTypes.bool,
};


export default CheckTemporales;