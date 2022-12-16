import * as Yup from "yup";
import checkout from "layouts/staff/modif-staff/schemas/form";

const {
  formField: { cedula, nombre, email, sexo, comision, cargo },
} = checkout;

export default [
  Yup.object().shape({
    [cedula.name]: Yup.string().required(cedula.errorMsg).min(11,'La cédula debe ser de 11 dígitos.').max(11,'La cédula no excede de los 11 dígitos.'),
    [nombre.name]: Yup.string().required(nombre.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [sexo.name]: Yup.string().required(sexo.errorMsg),
    
  }),

  Yup.object().shape({
    [comision.name]: Yup.string().required(comision.errorMsg),
    [cargo.name]: Yup.string().required(cargo.errorMsg),
  }),
];
