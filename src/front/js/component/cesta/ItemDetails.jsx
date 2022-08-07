/* importamos la libreria React y el useContext hook */
import React, { useContext } from "react";
/* destructuring de Context */
import { Context } from "../../store/appContext";
/* destructuring de Link */
import { Link } from "react-router-dom";
/* importamos los estilos */
import "../../../styles/itemDetails.css";

/* creamos el componente*/
const ItemDetails = ({
  /* propiedades del componente */
  user_id,
  productId,
  nombre,
  img,
  precio,
  descripcion,
  dimensiones,
  categoria,
  nombreArtista,
  fotoArtista,
}) => {
  /* destructuring de useContext con store y actions de flux */
  /* pasamos datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel */
  const { store, actions } = useContext(Context);

  return (
    <>
      <div
        className="card mb-3"
        style={{ maxWidth: "540px", height: 5 + "rem" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={img}
              className="img-fluid rounded-start"
              alt="item image"
              style={{ width: 10 + "rem", height: 5 + "rem" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{nombre}</h5>
              <p className="card-text">{precio}</p>
              <div className="divButton">
                <button
                  onClick={() => actions.deleteProducto(user_id, productId)}
                  className="deleteItemButton"
                >
                  Eliminar
                </button>
              </div>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
