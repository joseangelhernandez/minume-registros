import { useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';

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
import BasicInfo from "layouts/staff/reg-staff/components/BasicInfo";
import Rol from "layouts/staff/reg-staff/components/Rol";

// NewUser layout schemas for form and form feilds
import validations from "layouts/staff/reg-staff/schemas/validations";
import form from "layouts/staff/reg-staff/schemas/form";
import initialValues from "layouts/staff/reg-staff/schemas/initialValues";

// sweetalert2 components
import Swal from "sweetalert2";
import { ThemeContext } from "@emotion/react";

function getSteps() {
  return ["Info", "Rol"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <BasicInfo formData={formData} />;
    case 1:
      return <Rol formData={formData} />;
    default:
      return null;
  }
}

function NewUser() {
  const cookies = new Cookies();
  const jwtInterceoptor = axios.create({});
  const url = "https://minumeapi.azurewebsites.net/api/STAFF"
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await sleep(500);

    try{
      jwtInterceoptor.post(url,
      {
        cedula: String(values.cedula),
        nombre: values.nombre,
        email: values.email,
        sexo: values.sexo,
        cargo: values.cargo,
        telefono: String(values.telefono),
        comision: values.comision,
        habitacion: null,
        confirmacion: false
        
      }).then(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Registro y/o modificación realizada satisfactoriamente',
          timer: 2500,
          showConfirmButton: false,
        });
      }).catch((error) => {console.log(error.response.data)});

    } catch (error){
      Swal.fire({
        icon: 'error',
        title: 'Error en el envío de datos',
        timer: 2500,
        showConfirmButton: false,
        text: 'Hubo un error intentando registrar o modificar el staff.',
      });
      console.log(error.response);
    }

    actions.setSubmitting(false);
    actions.resetForm();

    await sleep(2500);

    setActiveStep(0);
  };

  const handleSubmit = (values, actions) => {

    if(values.telefono != ''){
      values.telefono = values.telefono.toString();
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
                        })}
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
                            {isLastStep ? "crear" : "siguiente"}
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
