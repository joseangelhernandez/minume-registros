import * as Yup from "yup";
import checkout from "layouts/estudiantes/reg-estudiante/schemas/form";

const {
  formField: { nombre, apellido, email, edad, sexo, telefono, comision, pais, regional, 
    distrito, centro_educativo, grado, telefono_padres },
} = checkout;

export default [
  Yup.object().shape({
    [nombre.name]: Yup.string().required(nombre.errorMsg),
    [apellido.name]: Yup.string().required(apellido.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [edad.name]: Yup.number().required(edad.errorMsg).positive(edad.invalidMsg).integer(edad.invalidMsg).min(12, edad.invalidMsg),
    [sexo.name]: Yup.string().required(sexo.errorMsg),
    [telefono.name]: Yup.string().required(telefono.errorMsg).length(10, telefono.invalidMsg),
    
  }),

  Yup.object().shape({
    [comision.name]: Yup.string().required(comision.errorMsg),
    [pais.name]: Yup.string().required(pais.errorMsg),
    //[zip.name]: Yup.string().required(zip.errorMsg),
    //[zip.name]: Yup.string().required(zip.errorMsg).min(6, zip.invalidMsg),
  }),

  Yup.object().shape({
    [regional.name]: Yup.number().required(regional.errorMsg),
    [distrito.name]: Yup.number().required(distrito.errorMsg),
    [centro_educativo.name]: Yup.number().required(centro_educativo.errorMsg),
    [grado.name]: Yup.string().required(grado.errorMsg),
  }),

  Yup.object().shape({
    [telefono_padres.name]: Yup.string().required(telefono_padres.errorMsg).length(10, telefono.invalidMsg),
  }),
];
