import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/producto.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const Producto = (props) => {
  const { store, actions } = useContext(Context);
  console.log("productoSelect", store.productoSelect);
  let navigate = useNavigate();

  const [scroll, setScroll] = useState(null);

  // Por algun motivo la pagina se renderiza con scroll hacia abajo, asi que ejecutamos esto para que se cargue si scroll (no tarda nada)
  useEffect(() => {
    window.scrollTo(0, 0);
    setScroll(true);
    actions.productoSelect();
  }, []);

  const añadirCesta = (e) => {
    e.preventDefault()
    localStorage.removeItem("cesta");
    actions.añadirACesta();
    // alert("producto añadido a cesta");
  };

  const siguiente = (direccion) => {
    let indexProducto;

    for (let i = 0; i < store.productos.length; i++) {
      if (store.productos[i].id === store.productoSelect.id) {
        indexProducto = i;
        break;
      }
    }
    let productoTarget;
    direccion === "right"
      ? (productoTarget = store.productos[indexProducto + 1])
      : (productoTarget = store.productos[indexProducto - 1]);

    localStorage.removeItem("productSelect");

    productoTarget !== undefined &&
      actions.productoSelect(
        productoTarget.id,
        productoTarget.nombre,
        productoTarget.foto_producto,
        productoTarget.precio,
        productoTarget.descripcion,
        productoTarget.dimensiones,
        productoTarget.categoria,
        productoTarget.vendedor_nombre,
        productoTarget.vendedor_foto
      );

    navigate(`../producto/${productoTarget.id}`)

  };

  return (
    <>
      {scroll ? (
        <div className="container-producto-vista-producto">
          <AiOutlineArrowRight
            className="icono-right icono-direccion"
            size={28}
            onClick={() => siguiente("right")}
          />

          <AiOutlineArrowLeft
            className="icono-left icono-direccion"
            size={28}
            onClick={() => siguiente("left")}
          />
          <div className="container">
            <div className="row row-producto">
              <div className="row row-titulo-obra">
                <p className="nombre-obra">{store.productoSelect.nombre}</p>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 col-foto-producto p-0 productoTarget-2">
                <div className="container-foto-producto">
                  <img
                    className="foto-producto"
                    src={store.productoSelect.img}
                    alt=""
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-info-producto">
                <div className="row row-foto-nombre-artista">
                  <div className="col-12 col-titulo-artista pb-3">
                    <p className="artista">Artista</p>
                  </div>

                  <div className="col-1 col-foto-artista">
                    <img
                      className="foto-artista"
                      src={
                        store.productoSelect.fotoArtista != null
                          ? store.productoSelect.fotoArtista
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt=""
                    />
                  </div>

                  <div className="col-5 col-nombre-artista d-flex align-items-center">
                    <p className="nombre-artista">
                      {store.productoSelect.nombreArtista}
                    </p>
                  </div>

                  <div className="col-6 col-boton-cesta d-flex justify-content-end">
                    <button
                      className="boton-registro"
                      onClick={(e) => añadirCesta(e)}
                    >
                      añadir a carrito
                    </button>
                  </div>
                </div>

                <div className="row row-precio">
                  <div className="col-12 col-titulo-precio pb-3">
                    <p className="precio">Precio</p>
                  </div>

                  <div className="col-12 col-precio-obra">
                    <p className="precioObra">{`${store.productoSelect.precio}€`}</p>
                  </div>
                </div>

                <div className="row row-categoria">
                  <div className="col-12 col-titulo-precio pb-3">
                    <p className="precio">Categoria</p>
                  </div>

                  <div className="col-12 col-precio-obra">
                    <p className="precioObra">
                      {store.productoSelect.categoria}
                    </p>
                  </div>
                </div>

                <div className="row row-dimensiones">
                  <div className="col-12 col-titulo-precio pb-3">
                    <p className="precio">Dimensiones</p>
                  </div>

                  <div className="col-12 col-precio-obra">
                    <p className="precioObra">
                      {store.productoSelect.dimensiones}
                    </p>
                  </div>
                </div>

                <div className="row row-descripcion">
                  <div className="col-12 col-titulo-descrpcion pb-3">
                    <p className="descrpcion">Descrpcion</p>
                  </div>

                  <div className="col-12 col-descripcion">
                    <p className="descripcion-obra">
                      {store.productoSelect.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
