import { useEffect } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewUser page components
import FormField from "layouts/estudiantes/reg-estudiante/components/FormField";

function DatMed({ formData, estudiantePut, id }) {
  const { formField, values, errors, touched } = formData;
  let { telefono_padres, condicion_medica, alergias, medicamentos_recomendados} = formField;
  let { 
    telefono_padres: telefono_padresV, 
    condicion_medica: condicion_medicaV,
    alergias: alergiasV, 
    medicamentos_recomendados: medicamentos_recomendadosV,
    ide1: id1V,
  } = values;

  useEffect(()=>{
    if(values.telefono_padres == ''){
      values.ide1 = id;
      values.telefono_padres = estudiantePut.telefono_padres_tutores
      values.condicion_medica = estudiantePut.condicion_medica
      values.alergias = estudiantePut.alergias
      values.medicamentos_recomendados = estudiantePut.medicamentos_recomendados
    }else if(values.ide1 != id){
      values.ide1 = id;
      values.telefono_padres = estudiantePut.telefono_padres_tutores
      values.condicion_medica = estudiantePut.condicion_medica
      values.alergias = estudiantePut.alergias
      values.medicamentos_recomendados = estudiantePut.medicamentos_recomendados
    }

  }, []);

  return (
    <SuiBox>
      <SuiTypography variant="h5" fontWeight="bold">
        Datos médicos y de emergencias
      </SuiTypography>
      <SuiBox mt={1.625}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormField
              type={telefono_padres.type}
              label={telefono_padres.label}
              name={telefono_padres.name}
              value={values.telefono_padres}
              placeholder={telefono_padres.placeholder}
              error={errors.telefono_padres && touched.telefono_padres }
              success={values.telefono_padres > 1 && !errors.telefono_padres}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              type={condicion_medica.type}
              label={condicion_medica.label}
              name={condicion_medica.name}
              value={values.condicion_medica}
              placeholder={condicion_medica.placeholder}
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              type={alergias.type}
              label={alergias.label}
              name={alergias.name}
              value={values.alergias}
              placeholder={alergias.placeholder}
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              type={medicamentos_recomendados.type}
              label={medicamentos_recomendados.label}
              name={medicamentos_recomendados.name}
              value={values.medicamentos_recomendados}
              placeholder={medicamentos_recomendados.placeholder}
              multiline
              rows={5}
            />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for DatMed
DatMed.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default DatMed;
