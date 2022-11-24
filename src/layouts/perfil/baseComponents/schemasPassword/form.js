export default {
  formId: "cambiar-pass-form",
  formField: {
    contraseña: {
      name: "contraseña",
      label: "Contraseña actual",
      type: "password",
      placeholder: "Escriba su contraseña actual",
      errorMsg: "El campo contraseña antigua es obligatorio.",
    },
    nuevaContraseña: {
      name: "nuevaContraseña",
      label: "Nueva Contraseña",
      type: "password",
      placeholder: "Escriba su nueva contraseña",
      errorMsg: "El campo nueva contraseña es obligatorio.",
    },
    repetirContraseña: {
      name: "repetirContraseña",
      label: "Confirmar contraseña",
      type: "password",
      placeholder: "Confirma su contraseña",
      errorMsg: "El campo confirmar contraseña es obligatorio.",
    },
  },
};
