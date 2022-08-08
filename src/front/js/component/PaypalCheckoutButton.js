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
    actions.hacerPedido();
    notifyOk("Su pago ha sido realizado correctamente");
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
                amount: {
                  currency_code: "EUR",
                  value: store.precioCesta,
                },
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
};
