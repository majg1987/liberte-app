import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
/*Importo el css individual para registro */
import "../../styles/registro.css";
import { Context } from "../store/appContext";
/** Importo las librerias para crear alert de registro erroneo */
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [artista, setArtista] = useState(false);
  const [ok, setOk] = useState(null);

  /** Creo las caracteristicas de alert */
  const notify = () =>
    toast.warn("Asegurate de completar todos los datos correctamente", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    });

  /** Recupero valor true o false segun si quiere perfil de artista o no, y lo asigno a artista */
  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setArtista(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOk(true);
    if (nombre === "") {
      setOk(false);
    }
    if (apellidos === "") {
      setOk(false);
    }
    if (password === "" || password !== passwordRepeat) {
      setOk(false);
    }
    if (ok) {
      actions.registro(nombre, apellidos, email, password, artista);
    } else {
      notify();
    }
  };

  return (
    <>
      {store.registro ? (
        <Navigate to={"/login"} />
      ) : (
        <div className=" contenedor-principal pt-5">
          <div className="contenedor-formulario d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="formulario-registro ">
              <h2 className="titulo-registro">Login</h2>

              <input
                type="email"
                className="input-registro"
                id="email"
                placeholder="Escribe tu email"
                onChange={(e) =>
                  setEmail(e.target.value)
                } /** Asigno el valor con onChange a la variable email */
                value={email}
              />
              <input
                type="password"
                className="input-registro"
                id="password"
                placeholder="Introduce un password"
                onChange={(e) =>
                  setPassword(e.target.value)
                } /** Asigno el valor con onChange a la variable nombre */
                value={password}
              />

              <button className="boton-registro">Crear Cuenta</button>
            </form>
          </div>
          <div>
            {!ok ? (
              /** Componente Alert */
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
            ) : (
              <p></p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
