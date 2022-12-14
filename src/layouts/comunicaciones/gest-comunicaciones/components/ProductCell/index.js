

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function ProductCell({ image, name, checked }) {
  return (
    <SuiBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <SuiBox mx={2} width="3.75rem">
        <SuiBox component="img" src={image} alt={name} width="100%" />
      </SuiBox>
      <SuiTypography variant="button" fontWeight="medium">
        {name}
      </SuiTypography>
    </SuiBox>
  );
}

// Setting default value for the props of ProductCell
ProductCell.defaultProps = {
  checked: false,
};

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default ProductCell;
