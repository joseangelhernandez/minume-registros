import {useEffect, useState} from "react";
import axios from 'axios';

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field, Formik } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";


// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";


// NewUser page components
import FormField from "layouts/estudiantes/modif-estudiante/components/FormField";
import FormFieldSelect from "layouts/estudiantes/modif-estudiante/components/FormFieldSelect";

function EstuInfo({ formData, estudiantePut, id }) {
  const [selectedOption, setSelectedOption] = useState("");
  let [comisiones, setComisiones] = useState([{value: 1, label: ''}]);
  let { formField, values, errors, touched } = formData;
  let { nombre, apellido, email, edad, sexo, telefono} = formField;
  let {
    nombre: firstNameV,
    apellido: lastNameV,
    email: emailV,
    edad: edadV,
    sexo: sexoV = selectedOption,
    telefono: telefonoV,
    ide: idV,
  } = values;

  let options = [
    {value: 'M', label:'Masculino'},
    {value: 'F', label: 'Femenino'}, 
  ]

  const handleInput = (event) => {
    setSelectedOption(event.value)
    values.sexo = event.value;
  };

 useEffect(()=>{
  if(values.nombre == ''){
    values.ide = id;
    values.nombre = estudiantePut.nombres
    values.apellido = estudiantePut.apellidos
    values.email = estudiantePut.correo_electronico
    values.edad = estudiantePut.edad
    values.sexo = estudiantePut.sexo
    values.telefono = estudiantePut.telefono
  }else if(values.ide != id){
    values.ide = id;
    values.nombre = estudiantePut.nombres
    values.apellido = estudiantePut.apellidos
    values.email = estudiantePut.correo_electronico
    values.edad = estudiantePut.edad
    values.sexo = estudiantePut.sexo
    values.telefono = estudiantePut.telefono
  }

 }, [])

  return (
    <SuiBox>
      <SuiBox lineHeight={0}>
        <SuiTypography variant="h5" fontWeight="bold">
          Información del Estudiante
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          Datos generales del estudiantes
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={1.625}>
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
                type={sexo.type}
                label={sexo.label}
                name={sexo.name}
                onChange={handleInput}
                options={options}
                isSearchable={false}
                value={options.filter(function(option) {
                  return option.value === values.sexo;
                })}
                placeholder={sexo.placeholder}
                error={errors.sexo && touched.sexo}
                success={values.sexo.length > 0 && !errors.sexo}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <FormField
              type={telefono.type}
              label={telefono.label}
              name={telefono.name}
              value={telefonoV}
              placeholder={telefono.placeholder}
              error={errors.telefono && touched.telefono }
              success={telefonoV > 1 && !errors.telefono}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormField
              type={edad.type}
              label={edad.label}
              name={edad.name}
              value={edadV}
              placeholder={edad.placeholder}
              error={errors.edad && touched.edad}
              success={edadV > 0 && !errors.edad}
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for EstuInfo
EstuInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

/*<SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                Sexo
                </SuiTypography>
              </SuiBox>
              <SuiSelect
                name={sexo.name}
                onChange={handleInput}
                placeholder="Seleccionar sexo"
                options = {options}
                value={options.filter(function(option) {
                  return option.value === selectedOption;
                })}
                error={errors.sexo}
              />
              <SuiBox mt={0.75}>
                <SuiTypography component="div" variant="caption" color="error">
                  <ErrorMessage name={sexo.name} />
                </SuiTypography>
              </SuiBox>*/

export default EstuInfo;
