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
  categoria,
  nombreArtista,
  fotoArtista,
}) => {
  const { store, actions } = useContext(Context);


  return (
    <div className="container-intem-detail">
      <div className="col-6 col-foto-info-producto-cesta">
        <div className="container-foto-info-producto-cesta">
          <img src={img} />
        </div>
      </div>

      <div className="col-6 col-info-producto-cesta d-flex">
        <div className="artista">
          {/* elemento HIJO.  */}
          <Link
            to={`/producto/${id}`}
            onClick={() => {
              actions.productoSelect(
                id,
                nombre,
                img,
                precio,
                descripcion,
                dimensiones,
                categoria,
                nombreArtista,
                fotoArtista
              );
              store.listaCesta = true;
            }
            }
          >
            <p className="titulo-obra">{nombre}</p>
          </Link>
          <h6>{nombreArtista}</h6>
          <div className="d-flex align-self-end h-50 p">
            <p
              className="align-self-end eliminar-compra"
              href="#"
              onClick={() => actions.borrarProductoCesta(store.userInfo.id, id)}
            >
              Eliminar
            </p>
          </div>
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
