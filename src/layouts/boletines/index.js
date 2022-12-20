import { useState, useEffect } from "react";
import * as React from "react";
import Cookies from 'universal-cookie';
import axios from 'api/axios';
import useAuth from "hooks/useAuth";
import { Document, Page } from 'react-pdf';

// react-router-dom components
import { useNavigate, Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/PageLayout-perfil";
import DashboardNavbar from "examples/Navbar-perfil/DashboardNavbar";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import SuiDropzone from "components/SuiDropzone_delegados";

import SuiInputPassword from "components/SuiInputPassword";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//Form props and validations
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// sweetalert2 components
import Swal from "sweetalert2";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// NewUser page components
import SoftSelect from "components/SuiSelect";

import Bolpdf from "assets/boletines/Boletín-1-MINUMEXIIICSNU.pdf"

// Image
import chat from "assets/images/illustrations/login.png";

function boletines(props) {
  const { auth } = useAuth();
  const [delegados, setDelegados] = useState([{}]);
  const [selectedOption, setSelectedOption] = useState("");
  const [delegadoSelected, setDelegadoSelected] = useState("");

  const picRequirements = [
    "Foto con calidad estimada de 720px x 720px.",
    "Debe ser desde los hombros hacia arriba.",
    "Preferiblemente con fondo de color neutro o desenfocado.",
  ];

  const renderpicRequirements = picRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <SuiBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <SuiTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </SuiTypography>
      </SuiBox>
    );
  });

  const handleInput = (event) => {
    console.log(event.value)
    setSelectedOption(event.value)
    setDelegadoSelected(event.value);
  };

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('https://minume-umnurd.edu.do/api/ESTUDIANTES').then((res)=>{
        setDelegados(res.data);
    });
  },[])

  let dropDown = delegados.map(e => ({
    value: e.id,
    label: e.nombres + ' '+ e.apellidos
  }))

  return(
    <DashboardLayout>
      <SuiBox>
      <object width="100%" height="400" data={Bolpdf} type="application/pdf">   </object>
      </SuiBox>
    </DashboardLayout>
  );
  
}

export default boletines;

/*
<SuiBox component="form" role="form">
        
      </SuiBox>

*/
