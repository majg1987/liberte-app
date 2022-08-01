import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/producto.css";

export const Producto = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  console.log("productoSelect", store.productoSelect);

  const [scroll, setScroll] = useState(null);

  // Por algun motivo la pagina se renderiza con scroll hacia abajo, asi que ejecutamos esto para que se cargue si scroll (no tarda nada)
  useEffect(() => {
    window.scrollTo(0, 0);
    setScroll(true);
    actions.productoSelect();
  }, []);

  const añadirCesta = () => {
    localStorage.removeItem("cesta");
    actions.añadirACesta();
    alert("producto añadido a cesta");
  };

  return (
    <>
      {scroll ? (
        <div className="container-producto-vista-producto">
          <div className="container">
            <div className="row row-producto">
              <div className="row row-titulo-obra">
                <p className="nombre-obra">{store.productoSelect.nombre}</p>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 col-foto-producto p-0 pr-2">
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
                    <button className="boton-registro" onClick={añadirCesta}>
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
