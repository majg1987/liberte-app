import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/producto.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Alert from "../component/Alert";

export const Producto = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const [scroll, setScroll] = useState(null);

  // Por algun motivo la pagina se renderiza con scroll hacia abajo, asi que ejecutamos esto para que se cargue si scroll (no tarda nada)
  useEffect(() => {
    window.scrollTo(0, 0);
    setScroll(true);
    actions.productoSelect();
  }, []);

  const añadirCesta = (e) => {
    if (typeof store.userInfo.id !== "undefined") {
      e.preventDefault();
      actions.añadirACesta(store.userInfo.id, store.productoSelect.id);
    } else {
      actions.errorNoLogin();
    }
  };

  const siguiente = (direccion) => {
    let indexProducto;
    let arraySeleccionado;
    let storeSeleccionado;

    if (store.listaCesta) {
      storeSeleccionado = store.productosCesta;
    } else if (store.listaCesta === false && store.listaPerfil === false && store.listaPedidos === false) {
      storeSeleccionado = store.productos;
    }
    else if (store.listaPerfil) {
      storeSeleccionado = store.artistaGaleria;
    }
    else if (store.listaPedidos) {
      storeSeleccionado = store.pedido;
      console.log("ijijI", storeSeleccionado)
    };



    for (let i = 0; i < storeSeleccionado.length; i++) {

      let comprobacionId;
      console.log("eueue", store.listaPedidos)
      store.listaPedidos ?
        comprobacionId = storeSeleccionado[i].productos_info.id
        :
        comprobacionId = storeSeleccionado[i].id;

      if (comprobacionId === store.productoSelect.id) {
        indexProducto = i;
        console.log(indexProducto)
        arraySeleccionado = storeSeleccionado;
        console.log(arraySeleccionado[2])
        break;
      }

    }

    let productoTarget;
    direccion === "right"
      ? (productoTarget = arraySeleccionado[indexProducto + 1])
      : (productoTarget = arraySeleccionado[indexProducto - 1]);

    localStorage.removeItem("productSelect");

    if (productoTarget !== undefined) {

      if (store.listaPedidos) {
        productoTarget = productoTarget.productos_info;
        console.log("holaola")
      }

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
    }

    navigate(`../producto/${productoTarget.id}`);
  };

  useEffect(() => {
    if (store.okAñadirProducto) {

      actions.notifyOk("Producto añadido a cesta correctamente");
      actions.okAñadirProductoReset();
    }
  }, [store.okAñadirProducto]);



  useEffect(() => {
    if (store.errorAñadirProducto) {
      actions.notifyError("Error al añadir el producto a cesta");
      actions.errorAñadirProductoReset();
    }
  }, [store.errorAñadirProducto]);

  useEffect(() => {
    if (store.yaAñadidoProducto) {
      actions.notifyOk("Este producto ya esta añadido en la cesta");
      actions.yaAñadidoProductoReset();
    }
  }, [store.yaAñadidoProducto]);

  useEffect(() => {
    if (store.errorNoLogin) {
      actions.notifyError("Inicia sesión para agregar productos al carrito");
      actions.errorNoLogin(true);
    }
  }, [store.errorNoLogin]);

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
                <p className="nombre-obra fst-italic fw-light">
                  {store.productoSelect.nombre}
                </p>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 col-foto-producto p-0 productoTarget-2">
                <div className="container-foto-producto">
                  <img
                    className="foto-producto"
                    src={store.productoSelect.img}
                    alt="foto-producto"
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-info-producto">
                <div className="row row-foto-nombre-artista">
                  <div className="col-1 col-foto-artista">
                    <img
                      className="foto-artista"
                      src={
                        store.productoSelect.fotoArtista != null
                          ? store.productoSelect.fotoArtista
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="foto-artista"
                    />
                  </div>

                  <div className="col-5 col-nombre-artista d-flex align-items-center">
                    <h4 className="nombre-artista mt-3">
                      {store.productoSelect.nombreArtista}
                    </h4>
                  </div>

                  <div className="col-6 col-boton-cesta d-flex justify-content-end">
                    <button
                      className="boton-registro"
                      onClick={(e) => añadirCesta(e)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>

                <div className="row row-precio">
                  <div className="col-12 col-titulo-precio pt-4">
                    <p className="precio">Precio:</p>
                  </div>

                  <div className="col-12 col-precio-obra">
                    <p className="precioObra">{`${store.productoSelect.precio}€`}</p>
                  </div>
                </div>

                <div className="row row-categoria">
                  <div className="col-12 col-titulo-precio pt-1">
                    <p className="precio">Categoría:</p>
                  </div>

                  <div className="col-12 col-precio-obra">
                    <p className="precioObra">
                      {store.productoSelect.categoria}
                    </p>
                  </div>
                </div>

                <div className="row row-dimensiones">
                  <div className="col-12 col-titulo-precio pt-1">
                    <p className="precio">Dimensiones:</p>
                  </div>

                  <div className="col-12 col-precio-obra">
                    <p className="dimensiones-obra">
                      {store.productoSelect.dimensiones + "cm"}
                    </p>
                  </div>
                </div>

                <div className="row row-descripcion">
                  <div className="col-12 col-titulo-descripcion pt-1">
                    <p className="descripcion">Descripción:</p>
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
          <Alert />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
