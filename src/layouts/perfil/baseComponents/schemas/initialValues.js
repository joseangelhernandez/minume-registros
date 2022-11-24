import checkout from "layouts/perfil/baseComponents/schemas/form";

const {
  formField: {
    cedula,
    nombre,
    apellido,
    email,
    regional,
    repetirEmail,
  },
} = checkout;

export default {
  [cedula.name]: "",
  [nombre.name]: "",
  [apellido.name]: "",
  [email.name]: "",
  [regional.name]: "",
  [repetirEmail.name]: "",
};
