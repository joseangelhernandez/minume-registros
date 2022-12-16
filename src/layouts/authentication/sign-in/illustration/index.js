import { useState, useEffect } from "react";
import * as React from "react";
import Cookies from 'universal-cookie';
import axios from 'api/axios';
import useAuth from "hooks/useAuth";

// react-router-dom components
import { useNavigate, Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import CircularProgress from '@mui/material/CircularProgress';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

import SuiInputPassword from "components/SuiInputPassword";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//Form props and validations
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// sweetalert2 components
import Swal from "sweetalert2";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
import chat from "assets/images/illustrations/login.png";

function SignIn(props) {
  const { auth, setAuth } = useAuth();
  const LOGIN_URL = '/USUARIOS';
  const cookies = new Cookies();
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const initialValues={
    username:'',
    password:'',
  };
  const loginValidationsSchema = Yup.object({
    username: Yup.string().required('Campo cédula es obligatorio.').min(11,'La cédula debe ser de 11 dígitos.').max(11,'La cédula no excede de los 11 dígitos.'),
    password: Yup.string().required('Campo contraseña es obligatorio.'),
  })

  const Ingresar = async(valores) => {
    setCargando(true);
    await axios.get(LOGIN_URL+`/${valores.username}/${valores.password}`, {withCredentials: true})
    .then(response=>{
      return response.data;
    }).then(response=>{
      var respuesta=response;
      cookies.set('usuario', respuesta.usuario, {path: '/'});
      var usuario = respuesta.usuario;
      var role = respuesta.roleId;
      var token = respuesta.accessToken;
      var comision = respuesta.comision;
      var nombre = respuesta.nombre;
      var apellido = respuesta.apellido;
      setAuth({usuario, nombre, apellido, comision, role, token});
      navigate('/Inicio');
    })

    .catch(error=>{
      Swal.fire({
        icon: 'error',
        title: 'Credenciales Incorrectas',
        timer: 2500,
        showConfirmButton: false,
        text: 'El usuario o contrasena no son correctos.',
      });
      console.log(error);
    })
  };

  const [_values, setvalues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setvalues({showPassword: !_values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(()=>{
  if(auth !== ''){
    navigate('/Inicio');
  }
  },[]);

  return (
    <IllustrationLayout
      title="Ingresar"
      description="Introduce tus credenciales para ingresar"
      illustration={{
        image: chat,
      }}
    >
      <Formik validationSchema={loginValidationsSchema} initialValues={initialValues} onSubmit={Ingresar}>
        {()=>(
          <Form>
            <SuiBox mb={2}>
              <Field
                as={SuiInput} 
                type="number" 
                placeholder="Cédula" 
                name="username" 
                size="large" 
              ></Field>
              <SuiBox mt={0.75} ml={1.2}>
                <SuiTypography component="div" variant="caption" color="error">
                  <ErrorMessage name="username" />
                </SuiTypography>
              </SuiBox>
            </SuiBox>
            <SuiBox mb={2}>
              <Field as={SuiInputPassword} type={_values.showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              name="password" 
              size="large"
                endAdornment={
                  <InputAdornment position="end" sx={{marginLeft: "89%"}}>
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      size="medium"
                      disableRipple={false}
                      color="secondary"
                      sx={{marginBottom: "80%"}}
                    >
                      {_values.showPassword ? <VisibilityIcon /> 
                      : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                
              />
              <SuiBox mt={0.75} ml={1.2}>
                <SuiTypography component="div" variant="caption" color="error">
                  <ErrorMessage name="password" />
                </SuiTypography>
              </SuiBox>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              {cargando === true
                ? <SuiButton variant="gradient" color="info" size="large" fullWidth type="submit" disabled><CircularProgress color="inherit" size="20px"/></SuiButton>
                :<SuiButton variant="gradient" color="info" size="large" fullWidth type="submit">
                  Ingresar
                </SuiButton>}
                
            </SuiBox>
            {/*<SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                ¿Olvidaste la contraseña?{" "}
              <SuiTypography
                component={Link}
                to="/authentication/sign-up/illustration"
                variant="button"
                color="info"
                textGradient
                fontWeight="medium"
              >
                Recuperar
              </SuiTypography>
              </SuiTypography>
            </SuiBox>*/}
          </Form>
        )}
      </Formik>
      
    </IllustrationLayout>
      
  );
}

export default SignIn;

/*
<SuiBox component="form" role="form">
        
      </SuiBox>

*/
