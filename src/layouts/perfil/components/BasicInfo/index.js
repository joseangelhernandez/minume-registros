import { useState,useEffect } from "react";
import useAuth from "hooks/useAuth";
import axios from 'api/axios';
import axiosORIGIN from 'axios';
import Cookies from "universal-cookie";

// formik components
import { Formik, Form } from "formik";

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// NewUser layout schemas for form and form feilds
import validations from "layouts/perfil/baseComponents/schemas/validations";
import form from "layouts/perfil/baseComponents/schemas/form";
import initialValues from "layouts/perfil/baseComponents/schemas/initialValues";

//Componente
import InfoGral from "layouts/perfil/components/BasicInfo/InfoGeneral";

// sweetalert2 components
import Swal from "sweetalert2";

function getContent(formData, usuarioPut, id) {
  return <InfoGral formData={formData} usuarioPut={usuarioPut} id={id}/>;
};

function BasicInfo() {
  const {auth} = useAuth();

  const [usuario, setUsuario] = useState('');
  const currentValidation = validations[0];
  const [cargando, setCargando] = useState(true);
  const url = 'https://minume-umnurd.edu.do/api/USUARIOS'+`/${auth.usuario}`;
  const { formId, formField } = form;
  const cookies = new Cookies();
  const jwtInterceoptor = axiosORIGIN.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const submitForm = async (values, actions) => {
    console.log(values);
    await sleep(500);

    try{
      jwtInterceoptor.put(url,
      {
        usuario: auth.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        contraseña: usuario.contraseña,
        roleId: usuario.roleId,
        email: values.email,
        regional: usuario.regional,
        comision: usuario.comision,
        tipo_Mesa: usuario.tipo_Mesa,
        confirmacion_envio: usuario.confirmacion_envio,
        codigoResetPass: usuario.codigoResetPass,
        imageName: usuario.imageName,
        refreshToken: usuario.refreshToken,
        tokenCreado : usuario.tokenCreado,
        tokenExpira : usuario.tokenExpira,
      })

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Información modificada satisfactoriamente',
        timer: 2500,
        showConfirmButton: false,
      });

    } catch (error){
      Swal.fire({
        icon: 'error',
        title: 'Error en el envío de datos',
        timer: 2500,
        showConfirmButton: false,
        text: 'Hubo un error inesperado.',
      });
      console.log(error.response);
    }

    actions.setSubmitting(false);

    await sleep(2500);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  useEffect(()=>{
    jwtInterceoptor.get('https://minume-umnurd.edu.do/api/USUARIOS'+`/${auth.usuario}`)
      .then((response)=> {
        setUsuario(response.data)
        setCargando(false)
        console.log(response.data);
      });

  },[cargando]);

  if(cargando){
    return(<Box sx={{ position: 'relative' }}>
    <CircularProgress
      variant="determinate"
      sx={{
        color: (theme) =>
          theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
      }}
      size={40}
      thickness={4}
      value={100}
    />
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
      size={40}
      thickness={4}
    />
  </Box>);
  }else
  {
    return (
      <Card id="perfil" sx={{ overflow: "visible" }}>
        <SuiBox pl={3} pt={3}>
          <SuiTypography variant="h5">Información General</SuiTypography>
        </SuiBox>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidation}
          onSubmit={handleSubmit}
          
        >
          {({ values, errors, touched, isSubmitting }) =>(
          <Form id={formId} autoComplete="off">
            <SuiBox pl={2.5} pr={2.5} pt={-1} pb={3}>
              {getContent({
                values,
                touched,
                formField,
                errors,
              }, usuario, usuario.usuario)}
              <SuiBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                <SuiButton
                  disabled={isSubmitting}
                  type="submit"
                  variant="gradient"
                  color="dark"
                >Modificar
                </SuiButton>
              </SuiBox>
            </SuiBox>
          </Form>
          )}
        </Formik>
      </Card>
    );
  };
  
}

export default BasicInfo;
