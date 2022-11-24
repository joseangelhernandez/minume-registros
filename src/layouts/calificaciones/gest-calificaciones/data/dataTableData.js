import {useEffect, useState} from "react";
import axios from 'axios';


// Soft UI Dashboard PRO React components
import SuiBadge from "components/SuiBadge";

// ProductsList page components
import ProductCell from "layouts/ecommerce/products/products-list/components/ProductCell";
import ActionCell from "layouts/estudiantes/gest-estudiante/components/ActionCell";

function useDatosTabla() {
  // Badges
  const outOfStock = (
    <SuiBadge variant="contained" color="error" size="xs" badgeContent="No confirmado" container />
  );
  const inStock = (
    <SuiBadge variant="contained" color="success" size="xs" badgeContent="Confirmado" container />
  );

  /*const [estu, setEstu] = useState([{
    id: '1',
    nombres: '2',
    edad: '3',
    grado: '4',
    Regional: '',
    comision: '',
    pais: '',
    habitacion: '',
    confirmacion: '',
  }])*/

  const [resultArray, setResultArray] = useState([]);

/*useEffect(() => {
    const expensesListResp = async () => {
      await axios.get('http://localhost:14871/api/tablaESTUDIANTE')
      .then(
        response => setResultArray(response.data))
    }
    expensesListResp();
  }, []);

  const expensesListResp = async () => {
    const resultado = await axios.get('http://localhost:14871/api/tablaESTUDIANTE')
  }
  console.log(resultArray);

  /*let estudiantes = {estu};*/


 /*axios.get('http://localhost:14871/api/tablaESTUDIANTE').then((response)=> {
    setEstu(response.data)
  });*/

  const datos = [{
    id: '3',
    nombre: '2',
    edad: '3',
    grado: '4',
    Regional: '',
    comision: '',
    pais: '',
    habitacion: '',
    confirmacion: '',
    }];


  return {
    columns: [
      {
        Header: "id",
        accessor: "id",
      },
      { Header: "nombre", accessor: "nombre" },
      { Header: "edad", accessor: "edad" },
      { Header: "grado", accessor: "grado" },
      { Header: "Regional", accessor: "Regional" },
      { Header: "comision", accessor: "comision" },
      { Header: "pais", accessor: "pais" },
      { Header: "habitacion", accessor: "habitacion" },
      {
        Header: "confirmacion",
        accessor: "confirmacion",
        Cell: ({ value }) => (value === "true" ? inStock : outOfStock),
      },
      { Header: "action", accessor: "action" },
    ],
  
    rows: datos,
  }

}

export default useDatosTabla()

/*export default {
  columns: [
    {
      Header: "id",
      accessor: "id",
    },
    { Header: "nombre", accessor: "nombre" },
    { Header: "edad", accessor: "edad" },
    { Header: "grado", accessor: "grado" },
    { Header: "Regional", accessor: "Regional" },
    { Header: "comision", accessor: "comision" },
    { Header: "pais", accessor: "pais" },
    { Header: "habitacion", accessor: "habitacion" },
    {
      Header: "confirmacion",
      accessor: "confirmacion",
      Cell: ({ value }) => (value === "true" ? inStock : outOfStock),
    },
    { Header: "action", accessor: "action" },
  ],

  rows: estudiantesDatos(),
};*/

/*rows: [
    {
      id: "BKLGO Full Zip Hoodie",
      nombre: "Cloting",
      edad: "$1,321",
      grado: 243598234,
      Regional: 0,
      comision: 0,
      pais: 0,
      habitacion: 0,
      confirmacion: "out of stock",
      action: <ActionCell />,
    },
  ],*/