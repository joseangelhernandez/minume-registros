import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import useAuth from "hooks/useAuth";

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
import UserInfo from "layouts/usuarios/reg-usuario/components/UserInfo";
import Comision from "layouts/usuarios/reg-usuario/components/Comision";

// NewUser layout schemas for form and form feilds
import validations from "layouts/usuarios/reg-usuario/schemas/validations";
import form from "layouts/usuarios/reg-usuario/schemas/form";
import initialValues from "layouts/usuarios/reg-usuario/schemas/initialValues";

// sweetalert2 components
import Swal from "sweetalert2";

function getSteps() {
  return ["Información", "Comisión"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    case 1:
      return <Comision formData={formData} />;
    default:
      return null;
  }
}

function NewUser() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const url = "https://minumeapi.azurewebsites.net/api/USUARIOS"
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const jwtInterceoptor = axios.create({});
  jwtInterceoptor.interceptors.request.use((config) => {
    config.headers.common["Authorization"] = `Bearer ${cookies.get('TaHjtwSe')}`;
    config.withCredentials = true;
    return config;
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleBack = () => setActiveStep(activeStep - 1);

  useEffect(() => {auth.role !== 1 && navigate('/Inicio', {replace: true});}, []);

  const submitForm = async (values, actions) => {
    await sleep(500);

    try{
      jwtInterceoptor.post(url,
      {
        usuario: String(values.cedula),
        contraseña: values.contraseña,
        roleId: values.rol,
        codigoResetPass: '',
        email: values.email,
        nombre: values.nombre,
        apellido: values.apellido,
        regional: values.regional,
        comision: values.comision,
        tipo_Mesa: values.tipoMesa,
        confirmacion_envio: false
      });
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
        text: 'Hubo un error intentando registrar o modificar al usuario.',
      });
      console.log(error.response);
    }

    actions.setSubmitting(false);
    actions.resetForm();

    await sleep(2500);

    setActiveStep(0);
  };

  const handleSubmit = (values, actions) => {

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
