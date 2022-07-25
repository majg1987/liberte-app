import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
/*Importo el css de registro, reutilizo muchas de las propiedades */
import "../../styles/registro.css";
import { Context } from "../store/appContext";
/** Importo las librerias para crear alert de registro erroneo */
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** Creo las caracteristicas de alert */
  const notify = (mensaje) =>
    toast.warn(mensaje, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    });

  /** Compruebo que los campos no se encuentren vacios, si estan completos, mando datos a metodo login en flux
   * si no es asi salta un alert que indica al usuario que debe rellenar los campos del formulario login
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      actions.login(email, password);
    } else {
      notify("Completa todos los campos");
    }
  };

  // Cuando los datos mandados al backend son erróneos invocamos alert
  useEffect(() => {
    if (store.errorAuth) {
      notify("Datos Erroneos");
    }
  }, []);

  return (
    <>
      {store.auth ? (
        <Navigate to={"/"} />
      ) : (
        <div className=" container-principal-login">
          <div className="contenedor-formulario contenedor-login d-flex justify-content-center align-items-center col-10">
            <form onSubmit={handleSubmit} className="formulario-registro">
              <h2 className="titulo-registro"> Login </h2>{" "}
              <input
                type="email"
                className="input-registro"
                id="email"
                placeholder="Escribe tu email"
                onChange={(e) =>
                  setEmail(e.target.value)
                } /** Asigno el valor con onChange a la variable email */
                value={email}
              />{" "}
              <input
                type="password"
                className="input-registro"
                id="password"
                placeholder="Introduce un password"
                onChange={(e) =>
                  setPassword(e.target.value)
                } /** Asigno el valor con onChange a la variable password */
                value={password}
              />{" "}
              <div className="d-flex flex-column">
                <button className="boton-registro mb-2"> Acceder </button>{" "}
                {/* <button className="boton-registro"> */}{" "}
                <Link to={"/registro"} className="text-center">
                  Registrarse{" "}
                </Link>{" "}
                {/* </button> */}{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
          <div>
            {" "}
            {/* Componente Alert  */}{" "}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className="toast-container-login"
            />
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};
