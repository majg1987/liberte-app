import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/cesta.css";

export const ItemDetails = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="card mb-3" style={{maxWidth: "540px"}}>
      <div className="row g-0">
        {store.productoSelect.map((producto) => {
          return (
            <div key={producto.id}>
              <div className="col-md-4">
                <img src={producto.img} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{producto.nombreArtista}</h5>
                  <p className="card-text">
                  {producto.tituloObra}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                    {producto.precio}€
                    </small>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    /*  <div className="row">
      <div className="col-6">
        <div className="item-seleccionado position-relative ">
          {store.productoSelect.map((producto) => {
            return (
              <div key={producto.id}>
                <div>
                  <img src={producto.img} className="img-fluid rounded-start" />
                </div>
                <div className="card-body artista">
                  <h6>{producto.nombreArtista}</h6>
                  <p className="card-text titulo-obra">{producto.tituloObra}</p>
                  <button className="eliminar-compra text-muted" href="#">
                    Eliminar
                  </button>
                </div>
                <div className="item-precio position-absolute">
                  <div>{producto.precio}€</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div> */
  );
};

export default ItemDetails;
