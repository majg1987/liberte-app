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
  /* console.log( nombreArtista });
  console.log({ precio }); */

  return (
    <div className="card" style={{ width: 18 + "rem" }}>
      <img src={img} className="card-img-top" alt="card image" />
      <div className="card-body">
        <h5 className="card-title"></h5>
        <p className="card-text"></p>
        <button href="#" className="btn btn-primary">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
