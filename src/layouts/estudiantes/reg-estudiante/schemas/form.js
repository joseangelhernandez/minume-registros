export default {
  formId: "new-user-form",
  formField: {
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
    comision: {
      name: "comision",
      label: "Comisión",
      type: "number",
      placeholder: "Seleccione una de las comisiones",
      errorMsg: "El campo comisión es obligatorio.",
    },
    pais: {
      name: "pais",
      label: "País de representación",
      type: "number",
      placeholder: "Seleccione uno de los paises disponibles",
      errorMsg: "El campo país de representación es obligatorio.",
    },
    grado: {
      name: "grado",
      label: "Grado académico",
      type: "text",
      placeholder: "Seleccione el grado académico",
      errorMsg: "El campo Grado académico es obligatorio.",
    },
    edad: {
      name: "edad",
      label: "Edad",
      type: "number",
      placeholder: "ej. 18",
      errorMsg: "El Campo Edad es obligatorio.",
      invalidMsg: "Debe revisar el dato introducido en este campo, debe ser entero, positivo y edad válida.",
    },
    sexo: {
      name: "sexo",
      label: "Sexo",
      type: "text",
      placeholder: "Seleccionar sexo",
      errorMsg: "El campo sexo es obligatorio.",
    },
    regional: {
      name: "regional",
      label: "Regional Educativa",
      type: "number",
      placeholder: "Seleccione la Regional Educativa",
      errorMsg: "El Campo Regional Educativa es obligatorio.",
    },
    distrito: {
      name: "distrito",
      label: "Distrito Educativo",
      type: "number",
      placeholder: "Seleccione el Distrito Educativo",
      errorMsg: "El Campo Distrito Educativo es obligatorio.",
    },
    centro_educativo: {
      name: "centro_educativo",
      label: "Centro Educativo",
      type: "number",
      placeholder: "Seleccione el Centro Educativo",
      errorMsg: "El Campo Centro Educativo es obligatorio.",
    },
    telefono: {
      name: "telefono",
      label: "Teléfono celular",
      type: "number",
      placeholder: "Introducir número de teléfono celular",
      errorMsg: "El Campo Teléfono celular es obligatorio.",
      invalidMsg: "El número de teléfono tiene que ser de 10 dígitos sin el +1 (ej. 8098200523).",
    },
    telefono_padres: {
      name: "telefono_padres",
      label: "Teléfono de padre o tutor",
      type: "number",
      placeholder: "Introducir número de teléfono celular de su padre o tutor",
      errorMsg: "El Campo Teléfono de padre o tutor es obligatorio.",
      invalidMsg: "El número de teléfono tiene que ser de 10 dígitos sin el +1 (ej. 8098200523).",
    },
    alergias: {
      name: "alergias",
      label: "Alergias",
      placeholder: "Escribir las alergias en caso de tener alguna.",
    },
    condicion_medica: {
      name: "condicion_medica",
      label: "Condición médicas",
      placeholder: "Escribir condición médica que debe ser atendida con cuidado especial.",
    },
    medicamentos_recomendados: {
      name: "medicamentos_recomendados",
      label: "Medicamentos recomendados",
      placeholder: "Escribir algún o algunos medicamentos recomendados por su padre o tutor para tatrar algo en específico.",
    },
  },
};
