import React, { useContext } from "react";
import "../../../styles/perfil/obra.css";
import { BiExpandAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";
//import { ProductCard } from "../../ProductCard";
import { GiShoppingBag } from "react-icons/gi";
import { BsDot } from "react-icons/bs";

export const Obra = (props) => {
  const { store, actions } = useContext(Context);

  const añadirCesta = (e) => {
    if (typeof store.userInfo.id !== "undefined") {
      e.preventDefault();
      actions.añadirACesta(store.userInfo.id, props.obra_id);
    } else {
      actions.errorNoLogin();
    }
  };

  return (
    <>
      <div className="card shadow-sm border-1 d-inline-block pics">
        <Link to={`/producto/${props.obra_id}`}>
          <div
            className="img-size d-block position-relative border-0"
            onClick={() =>
              actions.productoSelect(
                props.obra_id,
                props.nombre,
                props.foto_producto,
                props.precio,
                props.descripcion,
                props.dimensiones,
                props.categoria,
                props.nombreArtista,
                props.fotoArtista
              )
            }
          >
            <BiExpandAlt className="position-absolute expand-icon" />
            <img src={props.foto_producto} alt="pic" className="card-img-top" />
          </div>
        </Link>
        <div
          className="card-body m-0 text-dark position-relative"
          id="product-card-body"
        >
          <h4 className="card-title artistaNombre position-absolute top-0 start-0 m-2">
            {props.nombre}
          </h4>

          <div className="card-text text-secondary position-absolute top-0 end-0 m-2">
            {props.dimensiones + "cm"}
          </div>
          <div className="card-text text-secondary position-absolute bottom-0 start-0 m-2">
            {props.categoria} <BsDot /> {props.precio + "€"}
          </div>
          <a
            href="#"
            className="btn btn-outline-warning btn-sm position-absolute bottom-0 end-0 m-2"
          >
            <GiShoppingBag
              size={15}
              style={{ color: "#e28f2c" }}
              onClick={(e) => añadirCesta(e)}
            />
          </a>
        </div>
      </div>
    </>
  );
};
