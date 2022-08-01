import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProductCard } from "../component/ProductCard";
import "../../styles/inicio.css";
import Masonry from "react-masonry-css";

export const Inicio = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.productosInicio();
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const prd = store.productos;
  console.log("prd", prd);

  useEffect(() => {
    localStorage.getItem("productSelect") &&
      localStorage.removeItem("productSelect");
  }, []);

  return (

    <div className="container-fluid container-inicio">

      {/* Seccion portada */}

      <div className="container-portada  d-flex justify-content-center align-items-center">
        <div className="row row-logo">
          <img
            className="img-logo"
            src={
              "https://res.cloudinary.com/yisusrobles/image/upload/v1657809752/image/lymgdwlcjwbseldkzljg.png"
            }
            alt="logo-liberte"
          />
        </div>
      </div>

      {/* Seccion productos */}

      <div className="container container-titulo-productos">
        <p className="titulo-seccion-producto">Productos</p>
      </div>

      <div className="container container-lista-productos">
        <div className="row  row-productos">
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {prd ? (
              prd.map((ele, i) => {
                console.log("ele", ele);
                let productCard = (
                  <ProductCard
                    key={ele.id}
                    id={ele.id}
                    nombre={ele.nombre}
                    img={ele.foto_producto}
                    precio={ele.precio}
                    descripcion={ele.descripcion}
                    dimensiones={ele.dimensiones}
                    categoria={ele.categoria}
                    nombreArtista={ele.vendedor_nombre}
                    fotoArtista={ele.vendedor_foto}
                  />
                );
                return productCard;
              })
            ) : (
              <div className="no"></div>
            )}
          </Masonry>
        </div>
      </div>
    </div>
  );
};
