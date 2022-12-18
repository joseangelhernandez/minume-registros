import { useState, useEffect } from "react";
import * as React from "react";
import Cookies from 'universal-cookie';
import axios from 'api/axios';
import useAuth from "hooks/useAuth";

// react-router-dom components
import { useNavigate, Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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

// Image
import chat from "assets/images/illustrations/login.png";

function SubidaDoc(props) {
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

  if(delegadoSelected === ''){
    return(
        <IllustrationLayout
          illustration={{
            image: chat,
          }}
        >
          <Card id="cambiar-foto">
            <SuiBox pl={3} pt={3}>
              <SuiTypography variant="h5">ENVÍO DE DOCUMENTOS DE IDENTIDAD</SuiTypography>
            </SuiBox>
            <Grid container spacing={3} p={3} pb={20}>
              <Grid item xs={12}>
              <SuiTypography variant="subtitle2">Nombre del delegado</SuiTypography>
                <SoftSelect
                    placeholder="Seleccione su nombre"
                    options={dropDown}
                    onChange={handleInput}
                />
              </Grid>
            </Grid>
            <SuiBox pl={3} pb={3}>
              <SuiTypography variant="subtitle2" color="error"
                textGradient>*DEBEN SELECCIONAR SU NOMBRE*</SuiTypography>
            </SuiBox>
          </Card>

        </IllustrationLayout>
    )
    
  }else{
    return (
        <IllustrationLayout
          illustration={{
            image: chat,
          }}
        >
          <Card id="cambiar-foto">
            <SuiBox pl={3} pt={3}>
              <SuiTypography variant="h5">ENVÍO DE DOCUMENTOS DE IDENTIDAD</SuiTypography>
            </SuiBox>
            <Grid container spacing={3} p={3}>
              <Grid item xs={12}>
              <SuiTypography variant="subtitle2">Nombre del delegado</SuiTypography>
                <SoftSelect
                    placeholder="Seleccione su nombre"
                    options={dropDown}
                    onChange={handleInput}
                />
              </Grid>
            </Grid>
            <SuiBox pl={2.5} pr={2.5} pt={-1} pb={3}>
            <SuiDropzone options={{ addRemoveLinks: true, 
                autoProcessQueue: false,
                uploadMultiple: false,
                paramName: "FormFile",
                renameFile: function () {
                  let newName = `${delegadoSelected + '.png'}`;
                  return newName;
              },
                maxFiles: 1, init: function() {
                  let myDropzone = this;
    
                  this.autoDiscover = false;
                  document.getElementById('enviar-foto').addEventListener("click", function (e) {
                      e.preventDefault();
                      myDropzone.processQueue();
                  });
    
                  this.on("maxfilesexceeded", function(file) {
                        this.removeAllFiles();
                        this.addFile(file);
                  })
    
                  this.on('complete', function () {
                    setTimeout(Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Documento enviado satisfactoriamente',
                      timerProgressBar: true,
                      timer: 2500,
                      showConfirmButton: false,
                    }), 1000)
                    setTimeout(location.reload.bind(location), 3200);
                  });
    
              },
                acceptedFiles: ".png, .jpeg, .jpg", 
                dictDefaultMessage: 'Suba o arrastre el documento aquí'}} />
                <SuiBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap" pt={4}>
                  <SuiBox ml="auto">
                    <SuiButton 
                    variant="gradient" 
                    color="dark" 
                    size="small"
                    type="submit"
                    id="enviar-foto"
                    //onClick={EsoMismo}
                    >
                      Enviar documento
                    </SuiButton>
                  </SuiBox>
                </SuiBox>
            </SuiBox>
          </Card>
          
        </IllustrationLayout>
          
      );
  }
  
}

export default SubidaDoc;

/*
<SuiBox component="form" role="form">
        
      </SuiBox>

*/
