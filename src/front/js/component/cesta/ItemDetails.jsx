import React from "react";
import { Link } from "react-router-dom";

import "../../../styles/cesta.css";

export const ItemDetails = () => {
  return (
    <div className="row d-flex justify-content-between flex-nowrap">
      <div className="col-6">
        <div className="item-seleccionado position-relative d-flex justify-content-start">
          <div>
            <img src="https://picsum.photos/100" />
          </div>
          <div className="artista">
            <h6>Erika Hanns</h6>
            <p className="titulo-obra">Autorretrato con peineta</p>
            <p className="eliminar-compra" href="#">
              Eliminar
            </p>
          </div>
          <div className="item-precio position-absolute top-0 start-100">
            <div>250€</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;