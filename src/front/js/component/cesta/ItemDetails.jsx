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
  id,
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
  console.log(nombre);
  /* console.log( nombreArtista);
  console.log({ precio }); */

  return (
    <>
      {/* <div className="wholeCard" style={{ width: 18 + "rem" }}>
        <img src={img} className="itemImg" alt="card image" />
        <h5 className="artistName">nombreArtista</h5>
        <p className="itemTitle">{nombre}</p>
        <p className="itemPrice">{precio}€</p>
        <div className="divButton">
          <button href="#" className="deleteItemButton">
            Eliminar
          </button>
        </div>
      </div> */}
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={img} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{nombre}</h5>
              <p className="card-text">{precio}</p>
              <div className="divButton">
                <button
                  onClick={() => actions.deleteProducto(id)}
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
