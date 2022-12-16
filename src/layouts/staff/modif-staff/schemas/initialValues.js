import checkout from "layouts/staff/modif-staff/schemas/form";

const {
  formField: {
    cedula,
    nombre,
    email,
    comision,
    sexo,
    telefono,
    cargo,
  },
} = checkout;

export default {
  [cedula.name]: "",
  [nombre.name]: "",
  [cargo.name]: "",
  [email.name]: "",
  [comision.name]: "",
  [sexo.name]: "",
  [telefono.name]: "",
};
