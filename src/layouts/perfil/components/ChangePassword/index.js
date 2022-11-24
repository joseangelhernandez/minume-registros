import { useState,useEffect } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useHistory } from "react-router";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// NewUser layout schemas for form and form feilds
import validations from "layouts/perfil/baseComponents/schemasPassword/validations";
import form from "layouts/perfil/baseComponents/schemasPassword/form";
import initialValues from "layouts/perfil/baseComponents/schemasPassword/initialValues";

// Settings page components
import FormField from "layouts/perfil/baseComponents/FormField";
import FormFieldPassword from "layouts/perfil/baseComponents/FormFieldPassword";

// sweetalert2 components
import Swal from "sweetalert2";

function getContent(formData, usuarioPut, id) {
  const [contraIncorrecta, setContraIncorrecta] = useState();
  const [mensaje, setMensaje] = useState('Esta contraseña no coincide con la actual.');
  let { formField, values, errors, touched } = formData;
  let { contraseña, nuevaContraseña, repetirContraseña} = formField;
  let {
    contraseña: contraseñaV ,
    nuevaContraseña: nuevaContraseñaV,
    repetirContraseña: repetirContraseñaV,
  } = values;

  const [_values, setvalues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setvalues({showPassword: !_values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [_values2, setvalues2] = useState({
    showPassword: false,
  });

  const handleClickShowPasswordRepeat = () => {
    setvalues2({showPassword: !_values2.showPassword });
  };
  
  const handleMouseDownPasswordRepeat = (event) => {
    event.preventDefault();
  };

  const [_values3, setvalues3] = useState({
    showPassword: false,
  });

  const handleClickShowPasswordNew = () => {
    setvalues3({showPassword: !_values3.showPassword });
  };
  
  const handleMouseDownPasswordNew = (event) => {
    event.preventDefault();
  };

 useEffect(()=>{
  if(contraseñaV != usuarioPut.contraseña && contraseñaV != ''){
    setContraIncorrecta(true);
  }else if(contraseñaV == usuarioPut.contraseña){
    setContraIncorrecta(false);
  }else{
    setContraIncorrecta();
  };

 }, [values.contraseña])
  
  return (
    <SuiBox mt={1.625}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormFieldPassword
            type={_values.showPassword ? "text" : "password"}
            label={contraseña.label}
            name={contraseña.name}
            value={contraseñaV}
            placeholder={contraseña.placeholder}
            error={errors.contraseña && touched.contraseña || contraIncorrecta == true}
            success={contraseñaV.length > 0 && !errors.contraseña && contraIncorrecta == false}
            endAdornment={
              <InputAdornment position="end" sx={{marginLeft: "95.2%"}}>
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
          >
          </FormFieldPassword>
          {contraIncorrecta && <SuiBox mt={-0.90} ml={1} mb={1.65}>
            <SuiTypography component="div" variant="caption" color="error">
              {mensaje}
            </SuiTypography>
          </SuiBox>}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormFieldPassword
            type={_values3.showPassword ? "text" : "password"}
            label={nuevaContraseña.label}
            name={nuevaContraseña.name}
            value={nuevaContraseñaV}
            placeholder={nuevaContraseña.placeholder}
            error={errors.nuevaContraseña && touched.nuevaContraseña}
            success={nuevaContraseñaV.length > 0 && !errors.nuevaContraseña}
            endAdornment={
              <InputAdornment position="end" sx={{marginLeft: "95.2%"}}>
                <IconButton
                  edge="end"
                  onClick={handleClickShowPasswordNew}
                  onMouseDown={handleMouseDownPasswordNew}
                  size="medium"
                  disableRipple={false}
                  color="secondary"
                  sx={{marginBottom: "80%"}}
                >
                  {_values3.showPassword ? <VisibilityIcon /> 
                  : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormFieldPassword
            type={_values2.showPassword ? "text" : "password"}
            label={repetirContraseña.label}
            name={repetirContraseña.name}
            value={repetirContraseñaV}
            placeholder={repetirContraseña.placeholder}
            error={errors.repetirContraseña && touched.repetirContraseña}
            success={repetirContraseñaV.length > 0 && !errors.repetirContraseña}
            endAdornment={
              <InputAdornment position="end" sx={{marginLeft: "95.2%"}}>
                <IconButton
                  edge="end"
                  onClick={handleClickShowPasswordRepeat}
                  onMouseDown={handleMouseDownPasswordRepeat}
                  size="medium"
                  disableRipple={false}
                  color="secondary"
                  sx={{marginBottom: "80%"}}
                >
                  {_values2.showPassword ? <VisibilityIcon /> 
                  : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </SuiBox>
  )
};

function ChangePassword() {
  const cookies = new Cookies();

  const [usuario, setUsuario] = useState('');
  const [cargando, setCargando] = useState(true);
  const url = 'http://jose03-001-site1.htempurl.com/api/USUARIOS'+`/${cookies.get('usuario')}`;
  const { formId, formField } = form;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const submitForm = async (values, actions) => {
    await sleep(500);

    try{
      axios.put(url,
      {
        usuario: cookies.get('usuario'),
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        contraseña: values.nuevaContraseña,
        roleId: usuario.roleId,
        email: usuario.email,
        regional: usuario.regional,
        comision: usuario.comision,
        tipo_Mesa: usuario.tipo_Mesa,
        confirmacion_envio: usuario.confirmacion_envio,
        codigoResetPass: usuario.codigoResetPass,
      })

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contraseña modificada satisfactoriamente',
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
    actions.resetForm();

    await sleep(2700);
    history.go(0);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };


  const passwordRequirements = [
    "Un caracter especial (@, -, _, *, entre otros)",
    "Minimo 6 caracteres",
    "Un número (recomendado 2)",
    "Caracteres en mayúscula y minúscula",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SuiBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <SuiTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SuiTypography>
      </SuiBox>
    );
  });


  useEffect(async ()=>{
    await axios.get('http://jose03-001-site1.htempurl.com/api/USUARIOS'+`/${cookies.get('usuario')}`)
      .then((response)=> {
        setUsuario(response.data)
        setCargando(false)
      });


  },[cargando]);

  if(cargando){
    return(<div>cargando...</div>);
  }else
  {
    return (
      <Card id="cambiar-contraseña">
        <SuiBox pl={3} pt={3}>
          <SuiTypography variant="h5">Cambiar contraseña</SuiTypography>
        </SuiBox>
        <Formik
            initialValues={initialValues}
            validationSchema={validations[0]}
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
                <SuiBox mt={6} mb={1}>
                  <SuiTypography variant="h5">Requisitos de la contraseña</SuiTypography>
                </SuiBox>
                <SuiBox mb={1}>
                  <SuiTypography variant="body2" color="text">
                    Por favor seguir esta guía para crear una contraseña robusta
                  </SuiTypography>
                </SuiBox>
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
                  <SuiBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
                    {renderPasswordRequirements}
                  </SuiBox>
                  <SuiBox ml="auto">
                    <SuiButton 
                    variant="gradient" 
                    color="dark" 
                    size="small"
                    type="submit"
                    disabled={isSubmitting}
                    >
                      Modificar contraseña
                    </SuiButton>
                  </SuiBox>
                </SuiBox>
              </SuiBox>
            </Form>
            )}
          </Formik>
      </Card>
    );
  }
  
}

export default ChangePassword;
