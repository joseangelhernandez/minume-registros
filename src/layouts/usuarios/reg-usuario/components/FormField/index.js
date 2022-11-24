// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field } from "formik";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";



function FormField({ label, name, ...rest }) {
  return (
    <SuiBox mb={1.5}>
      <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SuiTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SuiTypography>
      </SuiBox>
      <Field {...rest} name={name} as={SuiInput} />
      <SuiBox mt={0.75} ml={1}>
        <SuiTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FormField;
