import { useState,useEffect } from "react";
import axios from 'api/axios';
import axiosORIGIN from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// NewUser page components
import EstuInfo from "layouts/estudiantes/modif-estudiante/components/EstuInfo";
import Representacion from "layouts/estudiantes/modif-estudiante/components/Representacion";
import Proced from "layouts/estudiantes/modif-estudiante/components/Proced";
import DatMed from "layouts/estudiantes/modif-estudiante/components/DatMed";

// NewUser layout schemas for form and form feilds
import validations from "layouts/estudiantes/modif-estudiante/schemas/validations";
import form from "layouts/estudiantes/modif-estudiante/schemas/form";
import initialValues from "layouts/estudiantes/reg-estudiante/schemas/initialValues";
import checkout from "layouts/estudiantes/modif-estudiante/schemas/form"

// sweetalert2 components
import Swal from "sweetalert2";

function getSteps() {
  return ["1", "2", "3", "4"];
}

function getStepContent(stepIndex, formData, estudiantePut, id) {
  switch (stepIndex) {
    case 0:
      return <EstuInfo formData={formData} estudiantePut={estudiantePut} id={id}/>;
    case 1:
      return <Representacion formData={formData} estudiantePut={estudiantePut} id={id}/>;
    case 2:
      return <Proced formData={formData} estudiantePut={estudiantePut} id={id}/>;
    case 3:
      return <DatMed formData={formData} estudiantePut={estudiantePut} id={id}/>;
    default:
      return null;
  }
}

function NewUser() {
  const cookies = new Cookies();
  const location = useLocation();
  const jwtInterceoptor = axiosORIGIN.create({});
  const url = 'https://minume-umnurd.edu.do/api/ESTUDIANTES'+`/${location.state.persona.id}`
  const [activeStep, setActiveStep] = useState(0);
  const history = useNavigate();
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const rutas_dev = ""

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleBack = () => setActiveStep(activeStep - 1);

  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const submitForm = async (values, actions) => {
    await sleep(500);

    try{
      jwtInterceoptor.put(url,
      {
        id: location.state.persona.id,
        nombres: values.nombre,
        apellidos: values.apellido,
        correo_electronico: values.email,
        edad: values.edad,
        sexo: values.sexo,
        telefono: values.telefono,
        comision: values.comision,
        pais: values.pais,
        regional: values.regional,
        distrito: values.distrito,
        centro_educativo: values.centro_educativo,
        grado: values.grado,
        telefono_padres_tutores: values.telefono_padres,
        condicion_medica: values.condicion_medica,
        alergias: values.alergias,
        medicamentos_recomendados: values.medicamentos_recomendados,
        habitacion: null,
        codigo_qr: null,
        confirmacion: false,
        visado_americana: false,
      })
      Swal.fire({
        icon: 'success',
        title: 'Registro y/o modificación realizada satisfactoriamente',
        timer: 2500,
        showConfirmButton: false,
      });

    } catch (error){
      Swal.fire({
        icon: 'error',
        title: 'Error en el envío de datos',
        timer: 2500,
        showConfirmButton: false,
        text: 'Hubo un error intentando registrar o modificar el estudiante.',
      });
      console.log(error.response);
    }

    actions.setSubmitting(false);
    actions.resetForm();

    await sleep(2500);

    history(rutas_dev+'/estudiantes/gestionar-estudiantes');
    history(0);
  };

  const handleSubmit = (values, actions) => {

    if(values.telefono != ''){
      values.telefono = values.telefono.toString();
    }

    if(values.telefono_padres != ''){
      values.telefono_padres = values.telefono_padres.toString();
    }

    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
              
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <SuiBox p={2}>
                      <SuiBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        }, location.state.persona, location.state.persona.id)}
                        <SuiBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <SuiBox />
                          ) : (
                            <SuiButton variant="gradient" color="light" onClick={handleBack}>
                              regresar
                            </SuiButton>
                          )}
                          <SuiButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            {isLastStep ? "modificar" : "siguiente"}
                          </SuiButton>
                        </SuiBox>
                      </SuiBox>
                    </SuiBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewUser;
