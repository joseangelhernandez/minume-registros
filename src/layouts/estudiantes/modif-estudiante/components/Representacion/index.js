import {useEffect, useState} from "react";
import axios from 'api/axios';

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
import FormFieldSelect from "layouts/estudiantes/reg-estudiante/components/FormFieldSelect";

function Representacion({ formData, estudiantePut, id }) {
  let [comisiones, setComisiones] = useState([{value: 0, label: ''}]);
  let paisesSeleccionados = [{value: '', label: 'Debe seleccionar una comisión', comision: 0}];
  const { formField, values, errors, touched } = formData;
  let comparador = false;
  let { comision, pais } = formField;
  let { comision: comisionV, 
        pais: paisV,
        ide3: id3V,
      } = values;

  let opcionesComision = comisiones;

  const handleInput = (event) => {
    values.comision = event.value;
    comparador = true;
    setcampoPais(false)
    paisesSelect(event.value)
  };

  const handleInput2 = (event) => {
    values.pais = event.value;
    paisesSelect()
  };

  let [campoPais, setcampoPais] = useState(true)
  let [paises, setPaises] = useState([{value: '', label: 'Debe seleccionar una comisión', comision: 0}])

  function paisesSelect(valores){
    if(comparador){
      values.pais = '';
      comparador = false;
    }

    if(valores != 0){
      axios.get('/PAISESDROPDOWN'+`/${values.comision}`)
      .then((response)=> {
        setPaises(response.data)
        setcampoPais(false)
      });
    }
  }

  useEffect(()=>{
    axios.get('/COMISIONDROPDOWN')
    .then((response)=> {
      setComisiones(response.data)
    });

    paisesSelect(values.comision);

    if(values.comision != 0){
      setcampoPais(false)
    }

    if(values.comision == ''){
      values.ide3 = id;
      values.comision = estudiantePut.comision
      values.pais = estudiantePut.pais
    }else if(values.ide3 != id){
      values.ide3 = id;
      values.comision = estudiantePut.comision
      values.pais = estudiantePut.pais
    }
    
  }, [values.ide3, values.comision]);

  return (
    <SuiBox>
      <SuiTypography variant="h5" fontWeight="bold">
        Datos de representación
      </SuiTypography>
      <SuiBox mt={1.625} mb={5}>
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
                type={pais.type}
                label={pais.label}
                name={pais.name}
                onChange={handleInput2}
                options={paises}
                isDisabled={campoPais}
                value={paises.filter(function(option) {
                  return option.value === values.pais;
                })}
                placeholder={pais.placeholder}
                error={errors.pais && touched.pais}
                success={values.pais.length > 0 && !errors.pais}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SuiBox mt={0.75} ml={1}>
              <SuiTypography component="div" variant="caption" color="error">
                NOTA IMPORTANTE: ANTES DE SELECCIONAR EL PAIS DEBE SELECCIONAR LA COMISIÓN, LA SELECCIÓN DEL PRIMERO LE DESBLOQUEARÁ EL CAMPO PAÍS.
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for Representacion
Representacion.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Representacion;
