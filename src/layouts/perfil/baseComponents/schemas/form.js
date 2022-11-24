export default {
  formId: "new-user-form",
  formField: {
    cedula: {
      name: "cedula",
      label: "Cédula de identidad",
      type: "number",
      placeholder: "Introducir el número de cédula",
      errorMsg: "El campo cédula es obligatorio.",
    },
    nombre: {
      name: "nombre",
      label: "Nombres",
      type: "text",
      placeholder: "ej. Micheal",
      errorMsg: "El campo Nombre es obligatorio.",
    },
    apellido: {
      name: "apellido",
      label: "Apellidos ",
      type: "text",
      placeholder: "ej. Matos",
      errorMsg: "El campo Apellido es obligatorio.",
    },
    email: {
      name: "email",
      label: "Correo Electrónico",
      type: "email",
      placeholder: "ej. soft@gmail.com",
      errorMsg: "El campo Correo Electrónico es obligatorio.",
      invalidMsg: "Su correo electrónico es incorrecto.",
    },
    repetirEmail: {
      name: "repetirEmail",
      label: "Confirmar Correo Electrónico",
      type: "email",
      placeholder: "ej. soft@gmail.com",
      errorMsg: "El campo confirmar correo electrónico es obligatorio.",
      invalidMsg: "Su correo electrónico es incorrecto.",
    },
    regional: {
      name: "regional",
      label: "Regional educativa",
      type: "number",
      placeholder: "Seleccione una regional",
      errorMsg: "El Campo regional educativa es obligatorio.",
    },
  },
};
