import {useEffect, useState, useMemo} from "react";
import axios from 'axios';
import QRCODE from 'qrcode'
import Cookies from 'universal-cookie';
import axiosORIGIN from 'axios';
import useAuth from "hooks/useAuth";
import { useNavigate} from "react-router-dom";

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

import ActionCell from "layouts/usuarios/gest-usuario/components/ActionCell";
import { saveAs } from "file-saver";

// sweetalert2 components
import Swal from "sweetalert2";

function GestUser() {
  const navigate = useNavigate();
  const {auth} = useAuth();
  const cookies = new Cookies();
  const rutas_dev = ""
  const jwtInterceoptor = axiosORIGIN.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  let [tblUser, settblUser] = useState([
    {
      usuario: '',
      nombre: '',
      roleName: '',
      comision: '',
      tipo_mesa: '',
      }]
  );

  let nuevaUser = tblUser.map(e => ({
    usuario: e.usuario,
    nombre: e.nombre,
    roleName: e.roleName,
    comision: e.comision,
    tipo_mesa: e.tipo_mesa,
    action: <ActionCell id={e.usuario}/>,
  }))

  const [qrcode, setQRCode] = useState('');

  let url = '';
  const refrescarLista = () => {
    obtenerDatos();
  }

  function obtenerDatos(){
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/USUARIOS_SP'+`/${auth.usuario}`)
    .then((response)=> {
      settblUser(response.data)
    });
  }

  useEffect(()=>{
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/USUARIOS_SP'+`/${auth.usuario}`)
    .then((response)=> {
      settblUser(response.data)
    });

    auth.role !== 1 && navigate('/Inicio', {replace: true});
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
        accessor: "usuario",
      },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Comisión", accessor: "comision" },
      { Header: "Rol del usuario", accessor: "roleName" },
      { Header: "Cargo", accessor: "tipo_mesa" },
      { Header: "Acción", accessor: "action" },
    ],
  
    rows: nuevaUser,
  }

  const tablaDatosUsuario = useMemo(() => atributos, [tblUser]);

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <SuiBox my={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SuiBox lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                Todos las cuentas
              </SuiTypography>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Cuentas exisitente en la app de MINUME.
              </SuiTypography>
            </SuiBox>
            <Stack spacing={1} direction="row">
              <Link to={rutas_dev+"/usuarios/cuentas/crear-cuenta"}>
                <SuiButton variant="gradient" color="info" size="small">
                  + Nueva cuenta
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
            table={tablaDatosUsuario}
            entriesPerPage={{
              defaultValue: 15,
              entries: [15, 20, 25],
            }}
            canSearch
          />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GestUser;
