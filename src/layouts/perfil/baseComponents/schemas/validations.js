import * as Yup from "yup";
import checkout from "layouts/perfil/baseComponents/schemas/form";

const {
  formField: { email, repetirEmail },
} = checkout;

export default [
  Yup.object().shape({
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [repetirEmail.name]: Yup.string().required(repetirEmail.errorMsg).email(repetirEmail.invalidMsg)
    .required(repetirEmail.errorMsg)
    .oneOf([Yup.ref(email.name), null], 'El correo electrónico no coincide.')
  }),
];
