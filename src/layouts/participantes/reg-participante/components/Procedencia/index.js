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
import FormField from "layouts/participantes/reg-participante/components/FormField";

function Procedencia({ formData }) {
  const { formField, values, errors, touched } = formData;
  let { institucion, tipoParticipante } = formField;
  let { institucion: institucionV, 
        tipoParticipante: tipoParticipanteV,
  } = values;

  return (
    <SuiBox>
      <SuiTypography variant="h5" fontWeight="bold">
        Datos de procedencia del participante
      </SuiTypography>
      <SuiBox mt={1.625} mb={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type={institucion.type}
              label={institucion.label}
              name={institucion.name}
              value={institucionV}
              placeholder={institucion.placeholder}
              error={errors.institucion && touched.institucion}
              success={institucionV.length > 0 && !errors.institucion}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type={tipoParticipante.type}
              label={tipoParticipante.label}
              name={tipoParticipante.name}
              value={tipoParticipanteV}
              placeholder={tipoParticipante.placeholder}
              error={errors.tipoParticipante && touched.tipoParticipante}
              success={tipoParticipanteV.length > 0 && !errors.tipoParticipante}
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for Procedencia
Procedencia.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Procedencia;
