import checkout from "layouts/participantes/modif-participantes/schemas/form";

const {
  formField: {
    cedula,
    nombre,
    email,
    tipoParticipante,
    sexo,
    telefono,
    institucion,
  },
} = checkout;

export default {
  [cedula.name]: "",
  [nombre.name]: "",
  [institucion.name]: "",
  [email.name]: "",
  [tipoParticipante.name]: "",
  [sexo.name]: "",
  [telefono.name]: "",
};
