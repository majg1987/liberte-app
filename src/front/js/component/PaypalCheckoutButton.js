import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import ReactDOM from "react-dom";
// Importamos librerias para botones Paypal
import { PayPalButtons } from "@paypal/react-paypal-js";
// Importamos librerias para crear alerts
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Importamos estilos de Css
import "../../styles/registro.css";

export const PaypalCheckoutButton = ({ product }) => {
  const { store, actions } = useContext(Context);
  // Creamos variable donde guardamos si el pago esta realizado
  const [paidFor, setPaidFor] = useState(false);
  // Creamos variable por si ocurre algun error
  const [error, setError] = useState(null);

  /** Creo las caracteristicas de alert Ok */
  const notifyOk = (mensaje) =>
    toast.info("🦄 " + mensaje, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    });
  /** Creo las caracteristicas de alert Error */
  const notifyError = (mensaje) =>
    toast.error(mensaje, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    });
  const handleAprove = (orderId) => {
    // Llamamos a la funcion con el backend para cumplir con el pedido

    // Si response es correcto
    setPaidFor(true);
    // Actualizamos la cuenta del usuario

    setPaidFor(false);
  };

  if (paidFor) {
    // Mostramos mensaje indicando al usuario que el pago se ha completado con exito
    notifyOk("Su pago ha sido realizado correctamente");
    actions.borrarCesta();
    actions.hacerPedido();
    localStorage.removeItem("cesta");
    actions.obtenerCesta();
  }

  if (error) {
    // Mostramos mensaje de error
    notifyError("Error al realizar el pago!!!");
  }

  return (
    <>
      <PayPalButtons
        className="button-paypal"
        style={{
          color: "gold",
          layout: "vertical",
          heigth: 30,
          shape: "rect",
          label: "pay",
          size: "small",
          tagline: false,
        }}
        // Creamos la orden
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                // description: product.description,
                amount: {
                  currency_code: "EUR",
                  value: store.precioCesta,
                  // breakdown: {
                  //   item_total: {
                  //     currency_code: "EUR",
                  //     value: numero
                  //   }
                },
                // items: [
                //   {
                //     name: "MY PRODUCT NAME",
                //     unit_amount: {
                //       currency_code: "EUR",
                //       value: product.price
                //     },
                //     quantity: 1
                //   }
                // ]

                // amount: {
                //   currency_code: "EUR",
                //   // value: product.price,
                //   value: "30.00",
                //   breakdown: {
                //     item_total: { currency_code: "EUR", value: "100.00" },
                //     tax_total: { currency_code: "EUR", value: "10.00" }
                //   }

                // },
              },
            ],
          });
        }}
        onClick={(data, actions) => {
          // Validamos al hacer click en el boton, el lado del cliente o del servidor
          const hashAlreadyBoughtCourse = false;

          if (hashAlreadyBoughtCourse) {
            setError(
              "Ya compraste este articulo, ve a tu cuenta para ver tu lista de articulos comprados"
            );
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        // Aprobacion
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          handleAprove(data.orderID);
        }}
        onCancel={() => {
          //Mostramos mensaje si hay una cancelacion
          notifyError("La peticion de pago ha sido cancelada");
        }}
        // En caso de Error
        onError={(error) => {
          setError(true);
          console.error("Error al realizarse la operación", error);
          setError(false);
        }}
      />
      <div>
        {/* Componente Alert  */}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
  //   // Configuracion
  //   const paypalConf = {
  //     currency: "EUR",
  //     env: "sandbox",
  //     client: {
  //       sandbox:
  //         "AQu5Lp_0-hUc8mFQkjOpqGk8bDYyfuxGfqnhgz_PpsDKqWRQlRjedgcZ3LAon7aybiVDsL7tSjtQ2sGb",
  //       production: "-- id--",
  //     },
  //     style: {
  //       label: "pay",
  //       size: "small",
  //       shape: "rect",
  //       color: "gold",
  //     },
  //   };
  //   const PaypalButton = paypal.Button.driver("react", { React, ReactDOM });
  //   // Establece un pago
  //   const payment = (data, actions) => {
  //     const payment = {
  //       transactions: [
  //         {
  //           amount: {
  //             total: order.total,
  //             currency: paypalConf.currency,
  //           },
  //           descripcion: "Compra en Liberte app",
  //           custom: order.customer || "",
  //           item_list: {
  //             items: order.items,
  //           },
  //         },
  //       ],
  //       note_to_payer: "Contactenos para cualquier aclaración",
  //     };
  //     return actions.payment.create({ payment });
  //   };
  //   // Autorización de pago
  //   const onAuthorize = (data, actions) => {
  //     return actions.payment
  //       .execute()
  //       .then((response) => {
  //         console.log(response);
  //         alert(`El pago fue procesado correctamente, ID: ${response.id}`);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         alert("Ocurrio un error al procesar el pago con paypal");
  //       });
  //   };
  //   // Error
  //   const onError = (error) => {
  //     console.log(error);
  //     alert("El pago no fue realizado, vuelva a intentarlo");
  //   };
  //   // Cancelacion
  //   const onCancel = (data, actions) => {
  //     alert("Pago no realizado, el usuario cancelo el proceso");
  //   };
  //   return (
  //     <PaypalButton
  //       env={paypalConf.env}
  //       client={paypalConf.client}
  //       payment={(data, actions) => payment(data, actions)}
  //       onAuthorize={(data, actions) => onAuthorize(data, actions)}
  //       onCancel={(data, actions) => onCancel(data, actions)}
  //       onError={(error) => onError(error)}
  //       style={paypalConf.style}
  //       commit
  //       locale="es-ES"
  //     />
  //   );
};
