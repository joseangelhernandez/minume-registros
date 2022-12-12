import {useState} from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field, Formik } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewUser page components
import FormField from "layouts/usuarios/reg-usuario/components/FormField";
import FormFieldPassword from "layouts/usuarios/reg-usuario/components/FormFieldPassword";
import FormFieldSelect from "layouts/usuarios/reg-usuario/components/FormFieldSelect";

function UserInfo({ formData }) {
  const [selectedOption, setSelectedOption] = useState("");
  let { formField, values, errors, touched } = formData;
  let { cedula, nombre, apellido, email, rol, contraseña, repetirContraseña} = formField;
  let {
    cedula: cedulaV,
    nombre: firstNameV,
    apellido: lastNameV,
    email: emailV,
    rol: rolV = selectedOption,
    contraseña: contraseñaV ,
    repetirContraseña: repetirContraseñaV,
  } = values;

  let roles = [
    {value: '1', label: 'Super User'},
    {value: '2', label: 'Admin'},
    {value: '3', label: 'Docente Centro'},
    {value: '4', label: 'Tecnico Distrito'}, 
    {value: '5', label: 'Tecnico Regional'},
    {value: '6', label: 'Delegado'}, 
    {value: '7', label: 'Voluntario'},
  ];

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

  const handleInput = (event) => {
    setSelectedOption(event.value)
    values.rol = event.value;
  };

  return (
    <SuiBox>
      <SuiBox lineHeight={0}>
        <SuiTypography variant="h5" fontWeight="bold">
          Información del usuario
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          Datos generales de la cuenta
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type={cedula.type}
              label={cedula.label}
              name={cedula.name}
              value={cedulaV}
              placeholder={cedula.placeholder}
              error={errors.cedula && touched.cedula}
              success={cedulaV > 0 && !errors.cedula}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={nombre.type}
              label={nombre.label}
              name={nombre.name}
              value={firstNameV}
              placeholder={nombre.placeholder}
              error={errors.nombre && touched.nombre}
              success={firstNameV.length > 0 && !errors.nombre}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={apellido.type}
              label={apellido.label}
              name={apellido.name}
              value={lastNameV}
              placeholder={apellido.placeholder}
              error={errors.apellido && touched.apellido}
              success={lastNameV.length > 0 && !errors.apellido}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
              <FormFieldSelect
                type={rol.type}
                label={rol.label}
                name={rol.name}
                onChange={handleInput}
                options={roles}
                isSearchable={false}
                value={roles.filter(function(option) {
                  return option.value === values.rol;
                })}
                placeholder={rol.placeholder}
                error={errors.rol && touched.rol}
                success={values.rol.length > 0 && !errors.rol}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormFieldPassword
              type={_values.showPassword ? "text" : "password"}
              label={contraseña.label}
              name={contraseña.name}
              value={contraseñaV}
              placeholder={contraseña.placeholder}
              error={errors.contraseña && touched.contraseña }
              success={contraseñaV > 1 && !errors.contraseña}
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
            >
            </FormFieldPassword>
            
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormFieldPassword
              type={_values2.showPassword ? "text" : "password"}
              label={repetirContraseña.label}
              name={repetirContraseña.name}
              value={repetirContraseñaV}
              placeholder={repetirContraseña.placeholder}
              error={errors.repetirContraseña && touched.repetirContraseña}
              success={repetirContraseñaV > 0 && !errors.repetirContraseña}
              endAdornment={
                <InputAdornment position="end" sx={{marginLeft: "89%"}}>
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
    </SuiBox>
  );
}

// typechecking props for EstuInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};


export default UserInfo;
