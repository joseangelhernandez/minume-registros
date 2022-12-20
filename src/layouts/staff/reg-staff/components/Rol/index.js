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
import FormFieldSelect from "layouts/staff/reg-staff/components/FormFieldSelect";
import FormField from "layouts/staff/reg-staff/components/FormField";

function Rol({ formData }) {
  let [comisiones, setComisiones] = useState([{value: 0, label: ''}]);
  const [selectedOption, setSelectedOption] = useState(null);
  const { formField, values, errors, touched } = formData;
  let comparador = false;
  let { comision, cargo } = formField;
  let { comision: comisionV, 
        cargo: cargoV,
      } = values;

  let opcionesComision = comisiones;

  const handleInput = (event) => {
    values.comision = event.value;
    setSelectedOption(event.value);
    comparador = true;
  };

  useEffect(()=>{
    axios.get('https://minumeapi.azurewebsites.net/api/COMISIONDROPDOWN')
    .then((response)=> {
      setComisiones(response.data)
    });

  }, [values.comision]);

  return (
    <SuiBox>
      <SuiTypography variant="h5" fontWeight="bold">
        Rol que desempeñará el staff
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
              <FormField
                type={cargo.type}
                label={cargo.label}
                name={cargo.name}
                value={cargoV}
                placeholder={cargo.placeholder}
                error={errors.cargo && touched.cargo}
                success={cargoV.length > 0 && !errors.cargo}
              />
          </Grid>
        </Grid>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for Rol
Rol.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Rol;
