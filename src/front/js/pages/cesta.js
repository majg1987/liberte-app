/* importamos la libreria React y los hooks necesarios */
import React, { useState, useEffect, useContext } from "react";
/* importamos el destructuring Link */
import { Link } from "react-router-dom";
/* importamos destructuring de Context */
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
  const [total, setTotal] = useState(0);
  let { user_id } = store.userInfo;
  /* constante para botones de paypal */
  const product = {
    description: "Lo vamos a conseguir",
    price: calculateTotalPrice(),
  };
  /* console.log(store.productosCesta[0]?.producto.nombre); */
  /* utilizamos useEffect hook */
  useEffect(() => {
    /* comprobamos en consola que entra el hook */
    console.log("Soy useEffect hook");
    /* llamamos a action obtenerCesta desde flux */
    /* actions.obtenerCesta(); */
    /* trabajamos los datos en el navegador con localStorage */
    /* leemos los pares clave/valor de productSelect en el navegador */
    /* localStorage.getItem("productSelect") && */
    /* eliminamos los pares clave/valor de productSelect en el navegador */
    /*  localStorage.removeItem("productSelect"); */
    /* llamamos a action getCart desde flux */

    actions.getCart(user_id);
    console.log(user_id);
  }, []);

  /* definimos una funcion para comprobar si hay productos en la cesta */
  function calculateTotalPrice() {
    if (store.productosCesta.length > 0) {
      const newArr = store.productosCesta.map((item) => item.producto.precio);
      return newArr.reduce(
        (valorPrevio, valorActual) => valorPrevio + valorActual
      );
    } else {
      return 0;
    }

    /* si hay producto(s) en la cesta y su tipo es distinto a undefined sumamos su(s) precio(s) y lo añadimos al total */
  }
  /* definimos una funcion para alertar sobre si hay productos en la cesta o no al usuario */
  const shoppingBagViewAlert = () => {
    return store.productosCesta === undefined ||
      store.productosCesta.length === 0
      ? /* si NO hay productos en la cesta */
        Swal.fire({
          icon: "info",
          title: "La cesta está vacía.",
          text: "Por favor, visita las colecciones de nuestros artistas.",
          footer: '<a href="">Continuar comprando</a>',
        })
      : /* si hay productos en la cesta */
        Swal.fire({
          icon: "success",
          title: "¿Todo listo?",
          text: "Por favor, finaliza la compra.",
          footer: '<a href="">¿Has visto nuestros productos?</a>',
        });
  };
  /* llamamos a la función shoppingBagViewAlert() */
  /*shoppingBagViewAlert();*/
  return (
    /* jsx tag */
    <>
      <h1 className="cesta-header text-center">Cesta de la Compra</h1>
      {/* LISTA PRODUCTOS*/}
      {/* elemento PADRE */}
      <div className="row row-cols-md-2">
        {/*elemento HIJO */}
        <div className="col-sm-12 col-lg-6 col-lista-productos">
          <div className="row" style={{ maxWidth: "540px" }}>
            <div
              className="item-counter text-muted"
              style={{ maxWidth: "540px" }}
            >
              {store.productosCesta.length}&nbsp;articulo(s)
              <div className="item-counter-line text-muted"></div>
            </div>
            {/* mapeamos los items de productosCesta almacenados en store */}
            {store.productosCesta.length > 0
              ? store.productosCesta.map((ele) => {
                  /* almacenamos en una variable (productoCesta) cada item almacenado */
                  return (
                    <div className="col-12" key={ele.producto.id}>
                      {/* componente ItemDetails */}
                      <ItemDetails
                        /* cada propiedad recibe su valor en el componente */

                        id={ele.producto.id}
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
                    {/* llamamos a la funcion para calcular el precio total*/}
                    {calculateTotalPrice()} €
                  </div>
                </div>
                {/* <div className="card-text row">
                  <p className="card-item col">Envio Express</p>
                  <span className="card-item2 col d-flex justify-content-end">
                    Gratis
                  </span>
                </div> */}
                {/* <div className="card-text row">
                  <button onClick={handleClick} className="card-item3">
                    Introduce tu código de descuento
                  </button>
                  <div>
                    <input
                      type="text"
                      className={`prom-code-input ${
                        isVisible ? "visible" : "hidden"
                      }`}
                    />
                  </div>
                </div> */}
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
                    {/* llamamos a la funcion calculateTotalPrice */}
                    <p>{calculateTotalPrice()} €</p>
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

/* export default Cesta; */
{
  /* <div className="item">
{store.productosCesta.map((cesta, index) => {
  return <div key={index}>{cesta.producto.nombreArtista}</div>;
})}
</div> */
}
