import checkout from "layouts/usuarios/reg-usuario/schemas/form";

const {
  formField: {
    cedula,
    nombre,
    apellido,
    email,
    regional,
    comision,
    tipoMesa,
    rol,
    contraseña,
    repetirContraseña,
  },
} = checkout;

export default {
  [cedula.name]: "",
  [nombre.name]: "",
  [apellido.name]: "",
  [email.name]: "",
  [regional.name]: "",
  [comision.name]: "",
  [tipoMesa.name]: "",
  [rol.name]: "",
  [contraseña.name]: "",
  [repetirContraseña.name]: "",
};
