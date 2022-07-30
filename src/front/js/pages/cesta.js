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
/* importamos Sweetalert */
import Swal from "sweetalert2";
/* importamos estilos css */
import "../../styles/cesta.css";

export const Cesta = () => {
  /* destructuring de store y actions del flux */
  /* igualamos a useContext(Context) para el trabajo de appContext (consumer/provider)  */
  const { store, actions } = useContext(Context);
  /* constante para botones de paypal */
  const product = {
    description: "Lo vamos a conseguir",
    price: 10.0,
  };
  /* utilizamos useEffect hook */
  useEffect(() => {
    /* comprobamos en consola que entra el hook */
    console.log("Soy useEffect hook");
    /* llamamos a la action obtenerCesta desde flux */
    actions.obtenerCesta();
    /* trabajamos los datos en el navegador con localStorage */
    /* leemos los pares clave/valor de productSelect en el navegador */
    localStorage.getItem("productSelect") &&
      /* eliminamos los pares clave/valor de productSelect en el navegador */
      localStorage.removeItem("productSelect");
  }, []);
  /* definimos una funcion para comprobar si hay productos en la cesta */
  const calculateTotalPrice = () => {
    console.log(store.productosCesta);
    /* si hay producto(s) en la cesta y su tipo es distinto a undefined sumamos su(s) precio(s) y lo añadimos al total */
    /* si NO hay producto(s) en la cesta retornamos 0 */
    return store.productosCesta != undefined && store.productosCesta.length > 0
      ? store.productosCesta?.reduce(
          (total, producto) => total + producto.precio
        )
      : 0;
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
  shoppingBagViewAlert();

  return (
    /* jsx tag */
    <>
      <h1 className="cesta-header text-center">Cesta de la Compra</h1>
      <div className="item-counter text-muted" style={{ maxWidth: "540px" }}>
        {store.productosCesta.length}&nbsp;articulo(s)
        <div className="item-counter-line text-muted"></div>
      </div>
      {/* LISTA PRODUCTOS*/}
      {/* elemento PADRE */}
      <div className="row row-container-cesta">
        {/*elemento HIJO */}
        <div className="col-sm-12 col-lg-6 col-lista-productos">
          <div className="row">
            {/* mapeamos los items de productosCesta almacenados en store */}
            {store.productosCesta.map((ele) => {
              /* almacenamos en una variable (productoCesta) cada item que se va a renderizar */
              let productoCesta = (
                <div className="col-6 d-flex justify-content-center">
                  {/* componente Item Details */}
                  <ItemDetails
                    /* cada propiedad recibe su valor en el componente */
                    key={ele.id}
                    id={ele.id}
                    nombre={ele.nombre}
                    img={ele.foto_producto}
                    precio={ele.precio}
                    description={ele.description}
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
                    <p>{calculateTotalPrice()}€</p>
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
            {/* RESUMEN PEDIDO -CARD2 */}
            <div className="card card-paypal">
              <div className="card-body">
                <div className="card-text row">
                  <div className="total-pedido col mt-1">
                    <p>Total Pedido</p>
                  </div>
                  <div className="total-pedido-precio col d-flex justify-content-end">
                    <p>{calculateTotalPrice()}€</p>
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
