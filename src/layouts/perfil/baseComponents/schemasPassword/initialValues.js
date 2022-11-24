import checkout from "layouts/perfil/baseComponents/schemasPassword/form";

const {
  formField: {
    contraseña,
    nuevaContraseña,
    repetirContraseña,
  },
} = checkout;

export default {
  [contraseña.name]: "",
  [nuevaContraseña.name]: "",
  [repetirContraseña.name]: "",
};
