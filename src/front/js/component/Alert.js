import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
/** Importo las librerias para crear alert de registro erroneo */
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Alert() {
  const { store, actions } = useContext(Context);
  return (
    <>
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
        className="mb-4"
      />
    </>
  );
}
