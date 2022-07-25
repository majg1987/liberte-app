import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/cesta-item-details.css";

export const ItemDetails = ({img, nombreArtista, tituloObra, precio}) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="card-card" style={{ width: 16 + "rem" }}>
        <img
          src={img}
          className="card-img-top rounded"
        />
        <div className="card-card-body">
          <div className="card-item-titulo">
          <h5 className="card-nombre-artista">{nombreArtista}</h5>
            Ut cursus vel leo non mattis.
            <div className="col card-item-precio text-start">
              <br></br>
              <p>PVP: {precio}€</p>
            </div>
            <div className="col card-item-eliminar text-start text-muted">
              <p>
                Eliminar Producto
                <button
                  type="button"
                  className="btn-close align-bottom"
                  aria-label="Close"
                ></button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ItemDetails;
