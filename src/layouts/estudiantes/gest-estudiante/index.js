import {useEffect, useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import QRCODE from 'qrcode'

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import QrCode2Icon from '@mui/icons-material/QrCode2';

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

import ActionCell from "layouts/estudiantes/gest-estudiante/components/ActionCell";
import { saveAs } from "file-saver";

// sweetalert2 components
import Swal from "sweetalert2";

// Data
//import dataTableData from "layouts/estudiantes/gest-estudiante/data/dataTableData";

function ProductsList() {
  const history = useHistory();
  const [tblEstu, setTblEstu] = useState([
    {
      id: '',
      nombre: '',
      edad: '',
      grado: '',
      Regional: '',
      comision: '',
      pais: '',
      habitacion: '',
      confirmacion: '',
      }]
  );

  const nuevaEstud = tblEstu.map(e => ({
    id: e.id,
    nombre: e.nombre,
    grado: e.grado,
    Regional: e.regional,
    comision: e.comision,
    pais: e.pais,
    habitacion: e.habitacion,
    confirmacion: e.confirmacion,
    action: <ActionCell id={e.id}/>,
  }))

  const [qrcode, setQRCode] = useState('');

  let url = '';
  const refrescarLista = () => {
    obtenerDatos();
  }

  function obtenerDatos(){
    axios.get('http://jose03-001-site1.htempurl.com/api/tablaESTUDIANTE')
    .then((response)=> {
      setTblEstu(response.data)
    });
  }

  useEffect(()=>{
    axios.get('http://jose03-001-site1.htempurl.com/api/tablaESTUDIANTE')
    .then((response)=> {
      setTblEstu(response.data)
    });
    console.log('este estado se refresco');
  }, []);


  const generarQRs = () => {
    Swal.fire({
      icon: 'info',
      title: 'Generación de QRs iniciada espere mientras se descargan todos los QRs, se le avisará cuando estén listos, no debe realizar ninguna operación mientras se descargan los QRs.',
      timer: 25000,
      showConfirmButton: false,
    });

    var generacion = new Promise((resolve, reject)=>{
      tblEstu.forEach((e, i, array)=> setTimeout(
        ()=> {
        url = 'http://localhost:3000/estudiante'+`/${e.id}`
        QRCODE.toDataURL(url, {
          width: 1024,
          margin: 2,
          errorCorrectionLevel: 'M'
        },
           (err, url) => {
          if(err) return console.error(err)
  
          setQRCode(url)
          saveAs(url, `${e.id}`+'.png')
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


  const atributos = {
    columns: [
      {
        Header: "Id",
        accessor: "id",
      },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Grado", accessor: "grado" },
      { Header: "Regional", accessor: "Regional" },
      { Header: "Comisión", accessor: "comision" },
      { Header: "País", accessor: "pais" },
      { Header: "Habitación", accessor: "habitacion" },
      {
        Header: "Confirmación",
        accessor: "confirmacion",
        Cell: ({ value }) => (value === true ? inStock : outOfStock),
      },
      { Header: "Acción", accessor: "action" },
    ],
  
    rows: nuevaEstud,
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SuiBox lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Todos los estudiantes
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Estudiantes participantes en MINUME.
              </SuiTypography>
            </SuiBox>
            <Stack spacing={1} direction="row">
              <Link to="/estudiantes/registrar-estudiante">
                <SuiButton variant="gradient" color="info" size="small">
                  + Nuevo estudiante
                </SuiButton>
              </Link>
              <Tooltip title="Actualizar" placement="bottom">
                <SuiButton variant="gradient" color="warning" size="medium" onClick={refrescarLista} iconOnly>
                  <Icon>sync</Icon>
                </SuiButton>
              </Tooltip>
              <Tooltip title="Generar QRs" placement="bottom">
                <SuiButton variant="gradient" color="dark" size="medium" onClick={generarQRs} iconOnly>
                  <QrCode2Icon/>
                </SuiButton>
              </Tooltip>
            </Stack>
          </SuiBox>
          <DataTable
            table={atributos}
            entriesPerPage={{
              defaultValue: 15,
              entries: [15, 20, 25],
            }}
            autoResetPage = {false}
            canSearch
          />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductsList;