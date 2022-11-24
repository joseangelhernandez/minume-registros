import * as Yup from "yup";
import checkout from "layouts/usuarios/reg-usuario/schemas/form";

const {
  formField: { cedula, nombre, apellido, email, comision, regional, tipoMesa, rol, contraseña, repetirContraseña  },
} = checkout;

export default [
  Yup.object().shape({
    [cedula.name]: Yup.string().required(cedula.errorMsg).min(11,'La cédula debe ser de 11 dígitos.').max(11,'La cédula no excede de los 11 dígitos.'),
    [nombre.name]: Yup.string().required(nombre.errorMsg),
    [apellido.name]: Yup.string().required(apellido.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [rol.name]: Yup.string().required(rol.errorMsg),
    [contraseña.name]: Yup.string().required(contraseña.errorMsg),
    [repetirContraseña.name]: Yup.string().required(contraseña.errorMsg)
     .oneOf([Yup.ref('contraseña'), null], 'La contraseña no coincide.')
  }),

  Yup.object().shape({
    [regional.name]: Yup.string().required(regional.errorMsg),
    [comision.name]: Yup.string().required(comision.errorMsg),
    [tipoMesa.name]: Yup.string().required(tipoMesa.errorMsg),
  }),
];
