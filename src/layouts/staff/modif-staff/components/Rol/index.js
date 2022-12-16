import {useEffect, useState} from "react";
import axios from 'api/axios';

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewUser page components
import FormFieldSelect from "layouts/staff/modif-staff/components/FormFieldSelect";
import FormField from "layouts/staff/modif-staff/components/FormField";

function Rol({ formData, staffPut, id }) {
  let [comisiones, setComisiones] = useState([{value: 0, label: ''}]);
  const [selectedOption, setSelectedOption] = useState(null);
  const { formField, values, errors, touched } = formData;
  let comparador = false;
  let { comision, cargo } = formField;
  let { comision: comisionV, 
        cargo: cargoV,
        id3: id3V,
      } = values;

  let opcionesComision = comisiones;

  const handleInput = (event) => {
    values.comision = event.value;
    setSelectedOption(event.value);
    comparador = true;
  };

  useEffect(()=>{
    axios.get('/COMISIONDROPDOWN')
    .then((response)=> {
      setComisiones(response.data)
    });

    if(values.comision == ''){
      values.ide3 = id;
      values.comision = staffPut.comision
      values.cargo = staffPut.cargo
    }else if(values.ide3 != id){
      values.ide3 = id;
      values.comision = staffPut.comision
      values.cargo = staffPut.cargo
    }
    
  }, [values.ide3, values.comision]);

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
