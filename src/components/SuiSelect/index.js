import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-select components
import Select from "react-select";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

// Custom styles for SuiSelect
import styles from "components/SuiSelect/styles";

const SuiSelect = forwardRef(({ size, error, success, name, ...rest }, ref) => {
  const { light } = colors;

  return (
    <Select
      name={name}
      {...rest}
      ref={ref}
      styles={styles(size, error, success)}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: light.main,
          primary: light.main,
        },
      })}
    />
  );
});

// Setting default values for the props of SuiSelect
SuiSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the SuiSelect
SuiSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default SuiSelect;
