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
import FormField from "layouts/participantes/reg-participante/components/FormField";
import FormFieldSelect from "layouts/participantes/reg-participante/components/FormFieldSelect";

function EstuInfo({ formData }) {
  const [selectedOption, setSelectedOption] = useState("");
  let { formField, values, errors, touched } = formData;
  let { cedula, nombre, email, sexo, telefono} = formField;
  let {
    cedula: cedulaV,
    nombre: firstNameV,
    email: emailV,
    sexo: sexoV = selectedOption,
    telefono: telefonoV,
  } = values;

  let options = [
    {value: 'M', label:'Masculino'},
    {value: 'F', label: 'Femenino'}, 
  ]

  const handleInput = (event) => {
    setSelectedOption(event.value)
    values.sexo = event.value;
  };

  return (
    <SuiBox>
      <SuiBox lineHeight={0}>
        <SuiTypography variant="h5" fontWeight="bold">
          Información del participante
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          Datos generales del participante
        </SuiTypography>
      </SuiBox>
      <SuiBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12}>
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
