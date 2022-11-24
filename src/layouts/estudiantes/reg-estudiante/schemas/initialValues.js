import checkout from "layouts/estudiantes/reg-estudiante/schemas/form";

const {
  formField: {
    nombre,
    apellido,
    email,
    comision,
    pais,
    grado,
    edad,
    sexo,
    regional,
    distrito,
    centro_educativo,
    telefono,
    telefono_padres,
    alergias,
    condicion_medica,
    medicamentos_recomendados,
  },
} = checkout;

export default {
  [nombre.name]: "",
  [apellido.name]: "",
  [email.name]: "",
  [comision.name]: "",
  [pais.name]: "",
  [grado.name]: "",
  [edad.name]: "",
  [sexo.name]: "",
  [regional.name]: "",
  [distrito.name]: "",
  [centro_educativo.name]: "",
  [telefono.name]: "",
  [telefono_padres.name]: "",
  [alergias.name]: "",
  [condicion_medica.name]: "",
  [medicamentos_recomendados.name]: "",
};
