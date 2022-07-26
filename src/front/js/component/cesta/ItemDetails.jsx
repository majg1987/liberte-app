/* importamos la libreria React y el useContext hook */
import React, { useContext } from "react";
/* destructuring de Context */
import { Context } from "../../store/appContext";
/* destructuring de Link */
import { Link } from "react-router-dom";
/* importamos los estilos */
import "../../../styles/itemDetails.css";

/* almacenamos las propiedades del objeto en una constante */
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
  /* destructuring de useContext con store y actions de flux */
  /* pasamos datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel */
  const { store, actions } = useContext(Context);

  return (
    /* elemento PADRE. formateamos el elemento. pasamos la clave id */
    /* aqui viene la imagen con su id */
    <div className="container-intem-detail" key={id}>
      {/*elemento HIJO. formateamos el elemento */}
      <div className="col-4 col-foto-info-producto-cesta">
        <div className="container-foto-info-producto-cesta">
          {/*elemento HIJO2. pasamos la imagen*/}
          <img src={img} />
        </div>
      </div>
      {/*elemento HIJO. formateamos el elemento*/}
      <div className="col-8 col-info-producto-cesta">
        <div className="artista">
          {/* elemento HIJO.  */}
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
      {/* fin del elemento padre*/}
    </div>
  );
};

export default ItemDetails;
