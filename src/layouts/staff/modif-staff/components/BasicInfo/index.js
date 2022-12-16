import {useEffect, useState} from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";


// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewUser page components
import FormField from "layouts/staff/modif-staff/components/FormField";
import FormFieldSelect from "layouts/staff/modif-staff/components/FormFieldSelect";

function BasicInfo({ formData, staffPut, id }) {
  const [selectedOption, setSelectedOption] = useState("");
  let { formField, values, errors, touched } = formData;
  let { cedula, nombre, email, sexo, telefono} = formField;
  let {
    cedula: cedulaV,
    nombre: firstNameV,
    email: emailV,
    sexo: sexoV = selectedOption,
    telefono: telefonoV,
    ide: idV
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
    values.nombre = staffPut.nombre
    values.cedula = staffPut.cedula
    values.email = staffPut.email
    values.sexo = staffPut.sexo
    values.telefono = staffPut.telefono
  }else if(values.ide != id){
    values.ide = id;
    values.nombre = staffPut.nombre
    values.cedula = staffPut.cedula
    values.email = staffPut.email
    values.sexo = staffPut.sexo
    values.telefono = staffPut.telefono
  }

 }, [])

 return (
    <SuiBox>
      <SuiBox lineHeight={0}>
        <SuiTypography variant="h5" fontWeight="bold">
          Información del Staff
        </SuiTypography>
        <SuiTypography variant="button" fontWeight="regular" color="text">
          Datos generales del staff
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
              success={cedulaV > 10 && !errors.cedula}
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
                success={values.sexo != '' && !errors.sexo}
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
BasicInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};


export default BasicInfo;
