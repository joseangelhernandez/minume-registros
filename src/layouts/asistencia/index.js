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
import Table_asist from "layouts/asistencia/Tabla_asistencia/dataTableEditorAsist";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckTemporales({socket}) {
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

  const [tblasist1, setTblasist1] = useState([
    {
      id: <Skeleton/>,
      idDel: <Skeleton/>,
      nombre: <Skeleton/>,
      pais: <Skeleton/>,
      comision: <Skeleton/>,
      abreviatura: <Skeleton/>,
      primera: <Skeleton/>,
      segunda: <Skeleton/>,
      tercera: <Skeleton/>,
      cuarta: <Skeleton/>,
    },
    
    ]
  );
  const [tblasist2, setTblasist2] = useState([
    {
      id: <Skeleton/>,
      idDel: <Skeleton/>,
      nombre: <Skeleton/>,
      pais: <Skeleton/>,
      primera: <Skeleton/>,
      segunda: <Skeleton/>,
      tercera: <Skeleton/>,
      cuarta: <Skeleton/>,
    },
    
    ]
  );



  useEffect(()=>{
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/ESTADOSDEL/'+`${auth.comision}`)
      .then((response)=> {
        setTblasist1(response.data);
        setTblasist2(response.data);
      }).catch((error) => {console.log(error.response.data)});
  }, [cargando]);

  return (
  <DashboardLayout>
    <ToastContainer />
    <DashboardNavbar socket={socket}/>
    <SuiBox my={3}>
      <Card>
        {auth.comision > 12 && <Table_asist tblasist={tblasist2}/>}
        {auth.comision < 12 && <Table_asist tblasist={tblasist1}/>}
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