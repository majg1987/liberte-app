import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

import "../../../styles/cesta.css";

const ItemDetails = ({
  id,
  nombre,
  img,
  precio,
  descripcion,
  dimensiones,
  tecnica,
  nombreArtista,
  fotoArtista,
}) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-intem-detail" key={id}>
      <div className="col-4 col-foto-info-producto-cesta">
        <div className="container-foto-info-producto-cesta">
          <img src={img} />
        </div>
      </div>

      <div className="col-8 col-info-producto-cesta">
        <div className="artista">
          <Link
            to={`/producto/${id}`}
            onClick={() =>
              actions.productoSelect(
                id,
                nombre,
                img,
                precio,
                descripcion,
                dimensiones,
                tecnica,
                nombreArtista,
                fotoArtista
              )
            }
          >
            <p className="titulo-obra">{nombre}</p>
          </Link>
          <h6>{nombreArtista}</h6>
          <p className="eliminar-compra" href="#">
            Eliminar
          </p>
        </div>
        <div className="item-precio position-absolute top-0 start-100">
          <div>{precio}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
