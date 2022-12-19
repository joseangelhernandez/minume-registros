import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import useAuth from "hooks/useAuth";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Skeleton from '@mui/material/Skeleton';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";


// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table_temporales from "layouts/temporales/gest-temporales/Tabla_temporales/dataTableEditorTemporales";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckTemporales() {
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
  const [tblTemporales, setTblTemporales] = useState([
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    {
      id: <Skeleton/>,
      codigo: <Skeleton/>,
      nombre: <Skeleton/>,
      email: <Skeleton/>,
      tipo: <Skeleton/>,
      procedencia: <Skeleton/>,
      estancia: <Skeleton/>,
    },
    
    ]
  );


  useEffect(()=>{
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/TEMPORALES')
      .then((response)=> {
        setTblTemporales(response.data);
      });
  }, [cargando]);

  return (
  <DashboardLayout>
    <ToastContainer />
    <DashboardNavbar />
    <SuiBox my={3}>
      <Card>
        <Table_temporales tblTemporales={tblTemporales}/>
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