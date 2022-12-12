import {useEffect, useState} from "react";
import axios from 'api/axios';

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Settings page components
import FormField from "layouts/perfil/baseComponents/FormField";
import FormFieldSelect from "layouts/perfil/baseComponents/FormFieldSelect";

function InfoGeneral({ formData, usuarioPut, id }) {
  const [selectedOption, setSelectedOption] = useState("");
  let [comisiones, setComisiones] = useState([{value: 0, label: ''}]);
  let [regionales, setRegionales] = useState([{value: 0, label: ''}]);
  let opcionesComision = comisiones;
  let opcionesRegionales = regionales;
  let { formField, values, errors, touched } = formData;
  let { cedula, nombre, apellido, email, regional, repetirEmail} = formField;
  const [selectedReg, setSelectedReg] = useState('');
  const [selectedCom, setselectedCom] = useState('');
  let {
    cedula: cedulaV,
    nombre: firstNameV,
    apellido: lastNameV,
    email: emailV,
    regional: regionalV,
    repetirEmail: repetirEmailV,
    id: idV,
  } = values;

  const handleInput3 = (event) => {
    setSelectedReg(event.value)
    values.regional = event.value;
  };

 useEffect(()=>{
  axios.get('/COMISIONDROPDOWN')
    .then((response)=> {
      setComisiones(response.data)
    });

    axios.get('/REGIONALES_EDUCATIVAS')
    .then((response)=> {
      setRegionales(response.data)
    });

  if(values.cedula == ''){
    values.ide = id;
    values.cedula = usuarioPut.usuario;
    values.nombre = usuarioPut.nombre;
    values.apellido = usuarioPut.apellido;
    values.email = usuarioPut.email;
    values.regional = usuarioPut.regional;
    values.repetirEmail = usuarioPut.email;

  }else if(values.ide != id){
    values.ide = id;
    values.cedula = usuarioPut.usuario;
    values.nombre = usuarioPut.nombre;
    values.apellido = usuarioPut.apellido;
    values.email = usuarioPut.email;
    values.regional = usuarioPut.regional;
    values.repetirEmail = usuarioPut.email;
  }
 }, []);

  return (
    <SuiBox mt={1.625}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormField
            type={cedula.type}
            label={cedula.label}
            name={cedula.name}
            value={cedulaV}
            placeholder={cedula.placeholder}
            disabled
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
            disabled
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
            disabled
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            type={repetirEmail.type}
            label={repetirEmail.label}
            name={repetirEmail.name}
            value={repetirEmailV}
            placeholder={repetirEmail.placeholder}
            error={errors.repetirEmail && touched.repetirEmail}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <FormFieldSelect
              type={regional.type}
              label={regional.label}
              name={regional.name}
              onChange={handleInput3}
              options={opcionesRegionales}
              value={opcionesRegionales.filter(function(option) {
                return option.value === values.regional;
              })}
              placeholder={regional.placeholder}
              error={errors.regional && touched.regional}
              isDisabled={true}
            />
        </Grid>
      </Grid>
    </SuiBox>
  );
}

// typechecking props for EstuInfo
InfoGeneral.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default InfoGeneral;
