import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ItemDetails from "../component/cesta/ItemDetails.jsx";
import { PaypalCheckoutButton } from "../component/PaypalCheckoutButton";

// import Swal from "sweetalert2";

import "../../styles/cesta.css";

export const Cesta = () => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  let { id } = store.userInfo;

  const product = {
    description: "Lo vamos a conseguir",
    price: calculateTotalPrice(),
  };

  const shoppingBagViewAlert = () => {
    return store.productosCesta === undefined ||
      store.productosCesta.length === 0
      ? Swal.fire({
          icon: "info",
          title: "La cesta está vacía.",
          text: "Por favor, visita las colecciones de nuestros artistas.",
          footer: '<a href="">Continuar comprando</a>',
        })
      : Swal.fire({
          icon: "success",
          title: "¿Todo listo?",
          text: "Por favor, finaliza la compra.",
          footer: '<a href="">¿Has visto nuestros productos?</a>',
        });
  };

  useEffect(() => {
    if (typeof store.userInfo.id !== "undefined") {
      actions.obtenerCesta(store.userInfo.id);
    }
  }, [store.userInfo.id, store.cambioCesta]);

  function calculateTotalPrice() {
    if (store.productosCesta.length > 0) {
      const newArr = store.productosCesta.map((item) => item.producto.precio);
      return newArr.reduce(
        (valorPrevio, valorActual) => valorPrevio + valorActual
      );
    } else {
      return 0;
    }
  }
  return (
    <>
      <h1 className="cesta-header text-center">Cesta de la Compra</h1>
      <div className="row row-cols-md-2">
        <div className="col-sm-12 col-lg-6 col-lista-productos">
          <div className="row" style={{ maxWidth: "540px" }}>
            <div
              className="item-counter text-muted"
              style={{ maxWidth: "540px" }}
            >
              {store.productosCesta.length}&nbsp;articulo(s)
              <div className="item-counter-line text-muted"></div>
            </div>
            {store.productosCesta.length > 0
              ? store.productosCesta.map((ele) => {
                  return (
                    <div className="col-12" key={ele.producto.id}>
                      <ItemDetails
                        user_id={id}
                        productId={ele.producto.id}
                        nombre={ele.producto.nombre}
                        img={ele.producto.foto_producto}
                        precio={ele.producto.precio}
                        description={ele.producto.description}
                        dimensiones={ele.producto.dimensiones}
                        categoria={ele.producto.categoria}
                        /* nombreArtista={ele.producto.vendedor_nombre} */
                        /* fotoArtista={ele.producto.vendedor_foto} */
                      />
                    </div>
                  );
                })
              : "No hay productos agregados"}
          </div>
        </div>
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
                    {calculateTotalPrice()} €
                  </div>
                </div>
              </div>
            </div>
            <div className="card card-paypal">
              <div className="card-body">
                <div className="card-text row">
                  <div className="total-pedido col mt-1">
                    <p>Total Pedido</p>
                  </div>
                  <div className="total-pedido-precio col d-flex justify-content-end">
                    <p>{calculateTotalPrice()} €</p>
                  </div>
                  <div>
                    <p className="total-pedido-iva text-muted">(Iva Incl.)</p>
                  </div>
                </div>
              </div>
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
    </>
  );
};
