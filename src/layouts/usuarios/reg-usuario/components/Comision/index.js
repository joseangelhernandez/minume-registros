import {useEffect, useState} from "react";
import axios from 'axios';

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";

// NewUser page components
import FormFieldSelect from "layouts/usuarios/reg-usuario/components/FormFieldSelect";

function Comision({ formData }) {
  const { formField, values, errors, touched } = formData;
  let { comision, regional, tipoMesa } = formField;
  let [comisiones, setComisiones] = useState([{value: 0, label: ''}]);
  let [regionales, setRegionales] = useState([{value: 0, label: ''}]);
  const [selectedReg, setSelectedReg] = useState('');
  const [selectedCom, setselectedCom] = useState('');
  const [selectedCargo, setselectedCargo] = useState('');
  let opcionesComision = comisiones;
  let opcionesRegionales = regionales
  const tipoMesaOptions = ([
    {value: 'DIRECTOR', label: 'DIRECTOR'},
    {value: 'DIRECTOR ADJUNTO', label: 'DIRECTOR ADJUNTO'},
    {value: 'PRESIDENTE', label: 'PRESIDENTE'},
    {value: 'VICEPRESIDENTE', label: 'VICEPRESIDENTE'},
    {value: 'CONTROL Y EVALUACION', label: 'CONTROL Y EVALUACION'},
  ]);
  let { comision: comisionV, 
        regional: regionalV,
        tipoMesa: tipoMesaV,
      } = values;

  const handleInput = (event) => {
    setselectedCom(event.value)
    values.comision = event.value;
  };

  const handleInput2 = (event) => {
    setselectedCargo(event.value)
    values.tipoMesa = event.value;
  };

  const handleInput3 = (event) => {
    setSelectedReg(event.value)
    values.regional = event.value;
  };

  useEffect(()=>{
    axios.get('https://minume-umnurd.edu.do/api/COMISIONDROPDOWN')
    .then((response)=> {
      setComisiones(response.data)
    });

    axios.get('https://minume-umnurd.edu.do/api/REGIONALES_EDUCATIVAS')
    .then((response)=> {
      setRegionales(response.data)
    });

  }, []);

  return (
    <SuiBox>
      <SuiTypography variant="h5" fontWeight="bold">
        Datos de representación
      </SuiTypography>
      <SuiBox mt={1.625} mb={5}>
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
                success={values.regional > 0 && !errors.regional}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <FormFieldSelect
                type={comision.type}
                label={comision.label}
                name={comision.name}
                onChange={handleInput}
                options={opcionesComision}
                value={opcionesComision.filter(function(option) {
                  return option.value === values.comision;
                })}
                placeholder={comision.placeholder}
                error={errors.comision && touched.comision}
                success={values.comision > 0 && !errors.comision}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <FormFieldSelect
                type={tipoMesa.type}
                label={tipoMesa.label}
                name={tipoMesa.name}
                onChange={handleInput2}
                options={tipoMesaOptions}
                value={tipoMesaOptions.filter(function(option) {
                  return option.value === values.tipoMesa;
                })}
                placeholder={tipoMesa.placeholder}
                error={errors.tipoMesa && touched.tipoMesa}
                success={values.tipoMesa.length > 0 && !errors.tipoMesa}
              />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for Representacion
Comision.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Comision;
