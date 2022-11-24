import * as Yup from "yup";
import checkout from "layouts/perfil/baseComponents/schemasPassword/form";

const {
  formField: { contraseña, nuevaContraseña,repetirContraseña },
} = checkout;

export default [
  Yup.object().shape({
    [contraseña.name]: Yup.string().required(contraseña.errorMsg),
    [nuevaContraseña.name]: Yup.string().required(nuevaContraseña.errorMsg)
    .min(6, 'Contraseña muy corta')
    .matches(/^(?=.*[a-z])/, 'Debe contener por lo menos una minúscula.')
    .matches(/^(?=.*[A-Z])/, 'Debe contener por lo menos una mayúscula.')
    .matches(/^(?=.*[0-9])/, 'Debe contener por lo menos un número.')
    .matches(/^(?=.*[!@#%&$])/, 'Debe contener por lo menos un caracter especial.'),
    [repetirContraseña.name]: Yup.string().required(repetirContraseña.errorMsg)
    .required(repetirContraseña.errorMsg)
    .oneOf([Yup.ref(nuevaContraseña.name), null], 'La contraseña no coincide con la nueva contraseña.')
  }),
];
