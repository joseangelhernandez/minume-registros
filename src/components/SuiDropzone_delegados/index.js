import { useEffect, useRef } from "react";
import Cookies from 'universal-cookie';

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Dropzone components
import Dropzone from "dropzone";

// Dropzone styles
import "dropzone/dist/dropzone.css";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Custom styles for the SuiDropzone
import SuiDropzoneRoot from "components/SuiDropzone/SuiDropzoneRoot";

function SuiDropzone({ options }) {
  const cookies = new Cookies();
  const dropzoneRef = useRef();
  Dropzone.autoDiscover = false;

  useEffect(() => {
    function createDropzone() {
      return new Dropzone(dropzoneRef.current, { ...options});
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, []);

  return (
    <SuiDropzoneRoot
      component="form"
      id="dropform"
      action= 'https://minumeapi.azurewebsites.net/api/DELDOCS'
      method="post" 
      encType="multipart/form-data"
      ref={dropzoneRef}
      className="form-control dropzone"
      
    >
      <SuiBox className="fallback">
        <SuiBox component="input" type="img"/>
      </SuiBox>
      
    </SuiDropzoneRoot>
    
  );
}

// Typechecking props for the SuiDropzone
SuiDropzone.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SuiDropzone;
