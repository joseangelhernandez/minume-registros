import * as Yup from "yup";
import checkout from "layouts/participantes/modif-participantes/schemas/form";

const {
  formField: { cedula,
    nombre,
    email,
    tipoParticipante,
    sexo,
    telefono,
    institucion},
} = checkout;

export default [
  Yup.object().shape({
    [cedula.name]: Yup.string().required(cedula.errorMsg).min(11,'La cédula debe ser de 11 dígitos.').max(11,'La cédula no excede de los 11 dígitos.'),
    [nombre.name]: Yup.string().required(nombre.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [sexo.name]: Yup.string().required(sexo.errorMsg),
    [telefono.name]: Yup.string().required(telefono.errorMsg),
    
  }),

  Yup.object().shape({
    [tipoParticipante.name]: Yup.string().required(tipoParticipante.errorMsg),
    [institucion.name]: Yup.string().required(institucion.errorMsg),
  }),

];
