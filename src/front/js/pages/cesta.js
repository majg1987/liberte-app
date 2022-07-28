import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ItemDetails from "../component/cesta/ItemDetails.jsx";
// Importo componente de los botones de paypal
import { PaypalCheckoutButton } from "../component/PaypalCheckoutButton";
import "../../styles/cesta.css";

export const Cesta = () => {
  const { store, actions } = useContext(Context);

  const product = {
    description: "Lo vamos a conseguir",
    price: 10.0,
  };

  useEffect(() => {
    console.log("ijij");
    actions.obtenerCesta();
    localStorage.getItem("productSelect") &&
      localStorage.removeItem("productSelect");
  }, []);

  return (
    <>
      <div className="row row-container-cesta">
        <div className="row row-titulo-cesta">
          <p className="cesta">cesta</p>
        </div>

        <div className="col-sm-12 col-lg-6 col-lista-productos">
          <div className="row">
            {store.productosCesta.map((ele) => {
              let productoCesta = (
                <div className="col-6 d-flex justify-content-center">
                  <ItemDetails
                    key={ele.id}
                    id={ele.id}
                    nombre={ele.nombre}
                    img={ele.foto_producto}
                    precio={ele.precio}
                    description={ele.description}
                    dimensiones={ele.dimensiones}
                    tecnica={ele.tecnica}
                    nombreArtista={ele.vendedor_nombre}
                    fotoArtista={ele.vendedor_foto}
                  />
                </div>
              );
              return productoCesta;
            })}
          </div>
        </div>

        {/* Resumen Compra */}
        <div className="col-sm-12 col-lg-6 col-resumen-compra">
          <div className="container-resumenes">
            {/* Resumen pedido */}
            <div className="card card-resumen-pedido">
              <div className="card-body">
                <p className="card-title">RESUMEN DEL PEDIDO</p>
                <div className="card-text row">
                  <div className="card-item col mt-1">
                    <p>Subtotal</p>
                  </div>
                  <div className="card-item2 col d-flex justify-content-end">
                    <p>250€</p>
                  </div>
                </div>
                <div className="card-text row">
                  <p className="card-item col">Envio Express</p>
                  <span className="card-item2 col d-flex justify-content-end">
                    Gratis
                  </span>
                </div>
                <div className="card-text row">
                  <p className="card-item3">Introduce tu código de descuento</p>
                </div>
              </div>
            </div>

            {/*  Paypal */}

            <div className="card card-paypal">
              <div className="card-body">
                <div className="card-text row">
                  <div className="total-pedido col mt-1">
                    <p>Total Pedido</p>
                  </div>
                  <div className="total-pedido-precio col d-flex justify-content-end">
                    <p>250€</p>
                  </div>
                  <div>
                    <p className="total-pedido-iva">Iva Incl.</p>
                  </div>
                </div>
              </div>

              <div className="paypal-button-container">
                <PaypalCheckoutButton product={product} />
              </div>
            </div>
          </div>

          <div className="col-md d-flex justify-content-center">
            <Link
              to="/producto"
              className="btn-continuar-comprando d-flex justify-content-center"
            >
              <p className="text-btn-continuar-comprando">
                CONTINUAR COMPRANDO
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cesta;
