import {useEffect, useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import QRCODE from 'qrcode'

// react-router-dom components
import { Link } from "react-router-dom";

import SuiBadge from "components/SuiBadge";

// ProductsList page components
import ProductCell from "layouts/ecommerce/products/products-list/components/ProductCell";
import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";

// Images
import adidasHoodie from "assets/images/ecommerce/adidas-hoodie.jpeg";
import macBookPro from "assets/images/ecommerce/macbook-pro.jpeg";
import metroChair from "assets/images/ecommerce/metro-chair.jpeg";
import alchimiaChair from "assets/images/ecommerce/alchimia-chair.jpeg";
import fendiCoat from "assets/images/ecommerce/fendi-coat.jpeg";
import offWhiteJacket from "assets/images/ecommerce/off-white-jacket.jpeg";
import yohjiYamamoto from "assets/images/ecommerce/yohji-yamamoto.jpeg";
import mcqueenShirt from "assets/images/ecommerce/mcqueen-shirt.jpeg";
import yellowChair from "assets/images/ecommerce/yellow-chair.jpeg";
import heronTshirt from "assets/images/ecommerce/heron-tshirt.jpeg";
import livingChair from "assets/images/ecommerce/living-chair.jpeg";
import orangeSofa from "assets/images/ecommerce/orange-sofa.jpeg";
import burberry from "assets/images/ecommerce/burberry.jpeg";
import dgSkirt from "assets/images/ecommerce/d&g-skirt.jpeg";
import undercover from "assets/images/ecommerce/undercover.jpeg";

// Badges
const outOfStock = (
  <SuiBadge variant="contained" color="error" size="xs" badgeContent="No confirmado" container />
);
const inStock = (
  <SuiBadge variant="contained" color="success" size="xs" badgeContent="Confirmado" container />
);

function Datos (tblEstud){

  /*const data = async () =>{
    tblEstu = await axios.get('http://localhost:14871/api/tablaESTUDIANTE').then(res =>  res.data);
  }

  data();*/

  let nuevaEstud = tblEstud.map(e => ({
    id: e.id,
    nombre: e.nombre,
    grado: e.grado,
    Regional: e.regional,
    comision: e.comision,
    pais: e.pais,
    habitacion: e.habitacion,
    confirmacion: e.confirmacion,
    action: <ActionCell id={e.id}/>,
  }))

  const atributos = {
    columns: [
      {
        Header: "Id",
        accessor: "id",
      },
      { Header: "Nombre", accessor: "nombre" },
      { Header: "Grado", accessor: "grado" },
      { Header: "Regional", accessor: "Regional" },
      { Header: "Comisión", accessor: "comision" },
      { Header: "País", accessor: "pais" },
      { Header: "Habitación", accessor: "habitacion" },
      {
        Header: "Confirmación",
        accessor: "confirmacion",
        Cell: ({ value }) => (value === true ? inStock : outOfStock),
      },
      { Header: "Acción", accessor: "action" },
    ],
  
    rows: nuevaEstud,
  }

  return atributos;
};

export default Datos;
