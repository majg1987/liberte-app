/* importamos la libreria React y los hooks necesarios */
import React, { useState, useEffect, useContext } from "react";
/* importamos el destructuring Link */
import { Link } from "react-router-dom";
/* destructuring de Context */
import { Context } from "../store/appContext";
/* importamos el componente Item Details */
import ItemDetails from "../component/cesta/ItemDetails.jsx";
/* Importamos destructuring del componente de los botones de paypal */
import { PaypalCheckoutButton } from "../component/PaypalCheckoutButton";
/* importamos estilos css */
import "../../styles/cesta.css";

export const Cesta = () => {
  const { store, actions } = useContext(Context);
  const [precios, setPrecios] = useState(1);
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (typeof store.userInfo.id !== "undefined") {
      actions.obtenerCesta(store.userInfo.id);
    }
  }, [store.userInfo.id, store.cambioCesta]);

  const product = {
    price: precios,
    description: "Realice su compra",
  };

  return (
    <>
      <h1 className="cesta-header text-center">Cesta de la Compra</h1>

      {/* LISTA PRODUCTOS*/}
      <div className="row row-container-cesta">
        <div className="col-sm-12 col-lg-6 col-lista-productos">
          <div className="item-counter text-muted">
            {`Tienes ${store.productosCesta.length} producto(s) en tu cesta`}
          </div>
          <div className="row w-100">
            {store.productosCesta.map((ele) => {
              let productoCesta = (
                <div
                  className="col-6 d-flex justify-content-center"
                  key={ele.id}
                >
                  <ItemDetails
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
                </div>
              );
              /* retornamos la variable productoCesta */
              return productoCesta;
            })}
          </div>
        </div>

        {/* RESUMEN PEDIDO */}
        {/* elemento HIJO */}
        {/* RESUMEN PEDIDO - CARD1 */}
        <div
          className="col-sm-12 col-lg-6 col-resumen-compra"
          style={{ maxWidth: "540px" }}
        >
          <div className="container-resumenes">
            <div className="card card-resumen-pedido">
              <div className="card-body">
                <p className="card-title">RESUMEN DEL PEDIDO</p>
                <div className="card-text row">
                  <div className="card-item col">
                    <p>Subtotal</p>
                  </div>
                  <div className="card-item2 col d-flex justify-content-end">
                    <p>{store.precioCesta}€</p>
                  </div>
                </div>
                <div className="card-text row">
                  <p className="card-item col">Envio Express</p>
                  <span className="card-item2 col d-flex justify-content-end">
                    Gratis
                  </span>
                </div>
              </div>
            </div>
            {/* RESUMEN PEDIDO -CARD2 */}
            <div className="card card-paypal">
              <div className="card-body">
                <div className="card-text row">
                  <div className="total-pedido col mt-1">
                    <p>Total Pedido</p>
                  </div>
                  <div className="total-pedido-precio col d-flex justify-content-end">
                    {/* <p>{calculateTotalPrice()}€</p> */}
                  </div>
                  <div>
                    <p className="total-pedido-iva text-muted">(Iva Incl.)</p>
                  </div>
                </div>
              </div>
              {/* Botones PayPal */}
              <div className="paypal-button-container">
                <PaypalCheckoutButton product={product} />
              </div>
              <Link to="/producto">
                <button className="btn-continuar-comprando">
                  CONTINUAR COMPRANDO
                </button>
              </Link>
            </div>
            <div className="nav-margin-bottom"></div>
          </div>
        </div>
      </div>
      {/* fin de jsx tag */}
    </>
  );
};

export default Cesta;
