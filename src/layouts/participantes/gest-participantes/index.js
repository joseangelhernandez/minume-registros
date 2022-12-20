import {useEffect, useState, useMemo} from "react";
import Cookies from 'universal-cookie';
import axiosOrigin from 'axios';
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

import ActionCell from "layouts/participantes/gest-participantes/components/ActionCell";
import { saveAs } from "file-saver";

// sweetalert2 components
import Swal from "sweetalert2";

function ProductsList() {
  const cookies = new Cookies();
  const { auth } = useAuth();
  const rutas_dev = ""
  let url = '';
  const jwtInterceoptor = axiosOrigin.create({});
  const _url = 'https://minumeapi.azurewebsites.net/api/PARTICIPANTE';
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });
  const [tblParticipante, setblParticipante] = useState([
    {
      id: '',
      nombre: '',
      cedula: '',
      sexo: '',
      edad: '',
      email: '',
      telefono: '',
      tipo_participante: '',
      institucion: '',
      habitacion: '',
      confirmacion: '',
      }]
  );

  const [qrcode, setQRCode] = useState('');

  
  const refrescarLista = () => {
    obtenerDatos();
  }

  function obtenerDatos(){
    jwtInterceoptor.get(_url)
    .then((response)=> {
      setblParticipante(response.data)
    });
  }

  useEffect(()=>{
    jwtInterceoptor.get(_url)
    .then((response)=> {
      setblParticipante(response.data)
    }).catch((error)=>{console.log(error.response.data)});
  }, []);

  let nuevaPartic = tblParticipante.map(e => ({
    id: e.id,
    cedula: e.cedula,
    nombre: e.nombre,
    sexo: e.sexo,
    institucion: e.institucion,
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
      tblParticipante.forEach((e, i, array)=> setTimeout(
        ()=> {
        url = 'https://minume.minerd.gob.do/participantePerfil'+`/${e.id}`
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

  let atributos = {
    columns: [
      {
        Header: "Id",
        accessor: "id",
      },
      { Header: "Cédula", accessor: "cedula" },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Sexo", accessor: "sexo" },
      { Header: "Institución", accessor: "institucion" },
      { Header: "Habitación", accessor: "habitacion" },
      {
        Header: "Confirmación",
        accessor: "confirmacion",
        Cell: ({ value }) => (value === true ? inStock : outOfStock),
      },
      { Header: "Acción", accessor: "action" },
    ],
  
    rows: nuevaPartic,
  }

  const tablaDatos = useMemo(() => atributos, [tblParticipante]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox my={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SuiBox lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Todos los participantes
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Personas en MINUME.
              </SuiTypography>
            </SuiBox>
            <Stack spacing={1} direction="row">
              {auth.role === 1 
              &&<Link to={rutas_dev+"/participantes/registrar-participantes"}>
                <SuiButton variant="gradient" color="info" size="small">
                  + Nuevo participante
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
          {tblParticipante.length === 1 
          ? <DataTable
              table={{columns: [
                {
                  Header: "Id",
                  accessor: "id",
                },
                { Header: "Cédula", accessor: "cedula" },
                { Header: "Nombre", accessor: "nombre" },
                { Header: "Sexo", accessor: "sexo" },
                { Header: "Institución", accessor: "institucion" },
                { Header: "Habitación", accessor: "habitacion" },
                {
                  Header: "Confirmación",
                  accessor: "confirmacion",
                },
              ],
  
              rows: [
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
                {
                  id: <Skeleton animation="wave" width={100}/>,
                  cedula: <Skeleton animation="wave" width={100}/>,
                  nombre: <Skeleton animation="wave" width={100}/>,
                  sexo: <Skeleton animation="wave" width={100}/>,
                  institucion: <Skeleton animation="wave" width={100}/>,
                  habitacion: <Skeleton animation="wave" width={100}/>,
                  confirmacion: <Skeleton animation="wave" width={100}/>,
                },
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