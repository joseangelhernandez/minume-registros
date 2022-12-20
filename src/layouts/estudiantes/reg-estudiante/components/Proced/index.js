import {useEffect, useState} from "react";
import axios from 'axios';

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewUser page components
import FormFieldSelect from "layouts/estudiantes/reg-estudiante/components/FormFieldSelect";

function Proced({ formData }) {
  const { formField, values, errors, touched } = formData;
  let { regional, distrito, centro_educativo, grado } = formField;
  const [selectedgrad, setSelectedgrad] = useState('');
  const [selectedcentro, setselectedcentro] = useState('');
  let [regionales, setRegionales] = useState([{value: 0, label: ''}]);
  let [campoDistrito, setcampoDistrito] = useState(true)
  let [campoCentro, setcampoCentro] = useState(true)
  let [distrito_edu, setDistrito] = useState([{value: '', label: 'Debe seleccionar una Regional'}])
  let [centro, setCentro] = useState([{value: '', label: 'Debe seleccionar un Distrito'}])
  let Opcionesregional = regionales;
  let Opcionesdistrito = distrito_edu;
  let Opcionescentro = centro;
  const grado_acad = ([
    {value: 'Primero de Secundaria', label: 'Primero de Secundaria'},
    {value: 'Segundo de Secundaria', label: 'Segundo de Secundaria'},
    {value: 'Tercero de Secundaria', label: 'Tercero de Secundaria'},
    {value: 'Cuarto de Secundaria', label: 'Cuarto de Secundaria'},
    {value: 'Quinto de Secundaria', label: 'Quinto de Secundaria'},
    {value: 'Sexto de Secundaria', label: 'Sexto de Secundaria'},
    {value: 'Universitario', label: 'Universitario'}
  ]);
  let comparador_distrito = false;
  let comparador_centro = false;
  let {
    regional: regionalV, 
    distrito: distritoV, 
    centro_educativo: centro_educativoV,
    grado: gradoV,
  } = values;

  const handleInput = (event) => {
    values.regional = event.value;
    comparador_distrito = true;
    setcampoDistrito(false)
    setcampoCentro(true)
    distritoSelect(event.value)
  };

  const handleInput2 = (event) => {
    values.distrito = event.value;
    comparador_centro = true;
    setcampoCentro(false)
    centroSelect(event.value)
  };

  const handleInput3 = (e) => {
    setselectedcentro(e.event);
    values.centro_educativo = e.value;
  };

  const handleInput4 = (event) => {
    setSelectedgrad(event.value)
    values.grado = event.value;
  };

  function distritoSelect(valores){
    if(comparador_distrito){
      values.distrito = '';
      comparador_distrito = false;
    }

    if(valores != 0){
      axios.get('https://minumeapi.azurewebsites.net/api/DISTRITOS_EDUCATIVOS'+`/${values.regional}`)
      .then((response)=> {
        setDistrito(response.data)
        setcampoDistrito(false)
      });
    }
  }

  function centroSelect(valores){
    if(comparador_centro){
      values.centro_educativo = '';
      comparador_centro = false;
    }

    if(valores != 0){
      axios.get('https://minumeapi.azurewebsites.net/api/CENTROS_EDUCATIVOS'+`/${values.distrito}`)
      .then((response)=> {
        setCentro(response.data)
        setcampoCentro(false)
      });
    }
  }

  useEffect(()=>{
    axios.get('https://minumeapi.azurewebsites.net/api/REGIONALES_EDUCATIVAS')
    .then((response)=> {
      setRegionales(response.data)
    });

    distritoSelect(values.regional);
    centroSelect(values.distrito)

    if(values.regional != 0){
      setcampoDistrito(false)
      if(values.distrito != 0)
      {
        setcampoCentro(false);
      }
    }
  }, [values.regional]);

  return (
    <SuiBox>
      <SuiTypography variant="h5" fontWeight="bold">
        Datos de procedencia del estudiante
      </SuiTypography>
      <SuiBox mt={1.625} mb={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <FormFieldSelect
                type={regional.type}
                label={regional.label}
                name={regional.name}
                onChange={handleInput}
                options={Opcionesregional}
                value={Opcionesregional.filter(function(option) {
                  return option.value === regionalV;
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
                type={distrito.type}
                label={distrito.label}
                name={distrito.name}
                onChange={handleInput2}
                options={Opcionesdistrito}
                isDisabled={campoDistrito}
                value={Opcionesdistrito.filter(function(option) {
                  return option.value === distritoV;
                })}
                placeholder={distrito.placeholder}
                error={errors.distrito && touched.distrito}
                success={values.distrito > 0 && !errors.distrito}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <FormFieldSelect
                type={centro_educativo.type}
                label={centro_educativo.label}
                name={centro_educativo.name}
                onChange={handleInput3}
                options={Opcionescentro}
                isDisabled={campoCentro}
                value={Opcionescentro.filter(function(option) {
                  return option.value === centro_educativoV;
                })}
                placeholder={centro_educativo.placeholder}
                error={errors.centro_educativo && touched.centro_educativo}
                success={values.centro_educativo > 0 && !errors.centro_educativo}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <FormFieldSelect
                type={grado.type}
                label={grado.label}
                name={grado.name}
                onChange={handleInput4}
                options={grado_acad}
                value={grado_acad.filter(function(option) {
                  return option.value === gradoV;
                })}
                placeholder={grado.placeholder}
                error={errors.grado && touched.grado}
                success={values.grado.length > 0 && !errors.grado}
              />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SuiBox mt={0.75} ml={1}>
              <SuiTypography component="div" variant="caption" color="error">
                *NOTA IMPORTANTE*
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SuiBox mt={0.75} ml={1}>
              <SuiTypography component="div" variant="caption" color="error">
                ANTES DE SELECCIONAR EL DISTRITO EDUCATIVO O CENTRO EDUCATIVO DEBE SELECCIONAR LA REGIONAL EDUCATIVA, LA SELECCIÓN DEL PRIMERO LE DESBLOQUEARÁ LOS SIGUIENTES, ES UNA SELECCIÓN EN CASCADA.< br/>
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>< br/></Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SuiBox mt={0.75} ml={1}>
              <SuiTypography component="div" variant="caption" color="success">
                *CONSEJO*
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SuiBox mt={0.75} ml={1}>
              <SuiTypography component="div" variant="caption" color="success">
                PARA FACILITAR SU BÚSQUEDA EN EL 'SELECT' DE CADA CAMPO PUEDE TAMBIÉN AYUDARSE ESCRIBIENDO LA REGIONAL, DISTRITO Y/O CENTRO EDUCATIVO PARA ENCONTRAR LA OPCIÓN QUE DESEA DE UNA FORMA MÁS INSTANTÁNEA.
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for Proced
Proced.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Proced;
