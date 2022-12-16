import {useEffect, useState, useMemo} from "react";
import axios from 'axios';
import Cookies from "universal-cookie";
import QRCODE from 'qrcode'
import useAuth from "hooks/useAuth";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Skeleton from '@mui/material/Skeleton';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";


// Soft UI Dashboard PRO React components
import SuiBadge from "components/SuiBadge";
import { Refresh } from "@mui/icons-material";

import ActionCell from "layouts/staff/gest-staff/components/ActionCell";
import { saveAs } from "file-saver";

// sweetalert2 components
import Swal from "sweetalert2";
import { string } from "prop-types";

function ProductsList({ socket }) {
  const { auth } = useAuth();
  const cookies = new Cookies();
  const jwtInterceoptor = axios.create({});
  const url = 'https://minume-umnurd.edu.do/api/STAFF';
  let _url = '';
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });
  const [tblStaff, settblStaff] = useState([
    {
      id: '',
      cedula: '',
      nombre: '',
      cargo: '',
      email: '',
      comision: '',
      habitacion: '',
      confirmacion: '',
      }]
  );

  const [qrcode, setQRCode] = useState('');

  const refrescarLista = () => {
    obtenerDatos();
  }

  function obtenerDatos(){
    jwtInterceoptor.get(url)
    .then((response)=> {
      settblStaff(response.data)
    });
  }

  useEffect(()=>{
    jwtInterceoptor.get(url)
    .then((response)=> {
      settblStaff(response.data)
    });
  }, []);

  let nuevaSTAFF = tblStaff.map(e => ({
    id: e.id,
    cedula: e.cedula,
    nombre: e.nombre,
    cargo: e.cargo,
    email: e.email,
    comision: e.comision,
    habitacion: e.habitacion,
    confirmacion: e.confirmacion,
    action: <ActionCell id={e.id}/>,
  }));
  

  const generarQRs = () => {
    Swal.fire({
      icon: 'info',
      title: 'Generación de QRs iniciada espere mientras se descargan todos los QRs, se le avisará cuando estén listos, no debe realizar ninguna operación mientras se descargan los QRs.',
      timer: 25000,
      showConfirmButton: false,
    });

    var generacion = new Promise((resolve, reject)=>{
      tblStaff.forEach((e, i, array)=> setTimeout(
        ()=> {
        _url = 'https://minume.minerd.gob.do/staffPerfil'+`/${e.id}`
        QRCODE.toDataURL(_url, {
          width: 1024,
          margin: 2,
          errorCorrectionLevel: 'M'
        },
           (err, _url) => {
          if(err) return console.error(err)
  
          setQRCode(_url)
          saveAs(_url, `${e.id}`+'.png')
        })
        if(i === array.length -1) resolve();
      }, (i + 1) * 1000));
    })

    generacion.then(()=>{
      setTimeout(
        ()=> {
          Swal.fire({
            icon: 'success',
            title: 'Todos los códigos QRs fueron generados satisfactoriamente',
            timer: 4000,
            showConfirmButton: false,
          });
        }, 1000);
    })
    
  }

  // Badges
  const outOfStock = (
    <SuiBadge variant="contained" color="error" size="xs" badgeContent="No confirmado" container />
  );
  const inStock = (
    <SuiBadge variant="contained" color="success" size="xs" badgeContent="Confirmado" container />
  );

  let atributos = {
    columns: [
      {
        Header: "Id",
        accessor: "id",
      },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Cédula", accessor: "cedula" },
      { Header: "Cargo", accessor: "cargo" },
      { Header: "Comisión", accessor: "comision" },
      { Header: "Email", accessor: "email" },
      { Header: "Habitación", accessor: "habitacion" },
      {
        Header: "Confirmación",
        accessor: "confirmacion",
        Cell: ({ value }) => (value === true ? inStock : outOfStock),
      },
      { Header: "Acción", accessor: "action" },
    ],
  
    rows: nuevaSTAFF,
  }

  const tablaDatos = useMemo(() => atributos, [tblStaff]);

  return (
    <DashboardLayout>
      <DashboardNavbar socket={socket}/>
      <SuiBox my={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SuiBox lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Todos los Staff
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Staff en MINUME.
              </SuiTypography>
            </SuiBox>
            <Stack spacing={1} direction="row">
              {auth.role === 1 
              &&<Link to="/staff/registrar-staff">
                <SuiButton variant="gradient" color="info" size="small">
                  + Nuevo Staff
                </SuiButton>
              </Link>}
              <Tooltip title="Actualizar" placement="bottom">
                <SuiButton variant="gradient" color="warning" size="medium" onClick={refrescarLista} iconOnly>
                  <Icon>sync</Icon>
                </SuiButton>
              </Tooltip>
              {auth.role === 1 
              &&<Tooltip title="Generar QRs" placement="bottom">
              <SuiButton variant="gradient" color="dark" size="medium" onClick={generarQRs} iconOnly>
                <QrCode2Icon/>
              </SuiButton>
            </Tooltip>}
            </Stack>
          </SuiBox>
          {tblStaff.length === 1 
          ? <DataTable
              table={{columns: [
                {
                  Header: "Id",
                  accessor: "id",
                },
                { Header: "Nombre", accessor: "nombre" },
                { Header: "Cédula", accessor: "cedula" },
                { Header: "Cargo", accessor: "cargo" },
                { Header: "Comisión", accessor: "comision" },
                { Header: "Email", accessor: "email" },
                { Header: "Habitación", accessor: "habitacion" },
                {
                  Header: "Confirmación",
                  accessor: "confirmacion",
                },
              ],
  
              rows: [
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  cargo: <Skeleton animation="wave" width={100}/>,
                  email: <Skeleton animation="wave" width={100}/>,
                  comision: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                }
              ]
            }}
              entriesPerPage={false}
            /> 
          : <DataTable
              table={tablaDatos}
              entriesPerPage={{
                defaultValue: 15,
                entries: [15, 20, 25],
              }}
              autoResetPage = {false}
              canSearch
            />}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductsList;