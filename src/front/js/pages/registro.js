import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
/*Importo el css individual para registro */
import "../../styles/registro.css";
import { Context } from "../store/appContext";
// Importo componente alert
import Alert from "../component/Alert";

export const Registro = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [artista, setArtista] = useState(false);

  /** Recupero valor true o false segun si quiere perfil de artista o no, y lo asigno a artista */
  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setArtista(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nombre !== "" &&
      /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i.test(nombre) &&
      apellidos !== "" &&
      /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i.test(apellidos) &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
      password !== "" &&
      password === passwordRepeat
    ) {
      actions.registro(nombre, apellidos, email, password, artista);
    } else {
      actions.notify(
        "Completa todos los campos de forma correcta, recuerda que nombre y apellidos solo puede contener letras"
      );
    }
  };

  useEffect(() => {
    if (store.registroError) {
      actions.notifyError("Error al realizar el registro");
      actions.registroErrorReset();
    }
  }, [store.registroError]);

  return (
    <>
      {store.registro ? (
        <Navigate to={"/login"} />
      ) : (
        <div className=" contenedor">
          <div className="contenedor-formulario d-flex justify-content-center align-items-center col-10 ">
            <form
              onSubmit={handleSubmit}
              className="formulario-registro col-9 my-auto"
            >
              <h2 className="titulo-registro text-center"> Registro </h2>
              <input
                type="text"
                className="input-registro"
                id="nombre"
                placeholder="Escribe tu nombre"
                onChange={(e) => setNombre(e.target.value)}
                /** Asigno el valor con onChange a la variable nombre */
                value={nombre}
              />
              <input
                type="text"
                className="input-registro"
                id="apellidos"
                placeholder="Escribe tus apellidos"
                onChange={(e) =>
                  setApellidos(e.target.value)
                } /** Asigno el valor con onChange a la variable apellidos */
                value={apellidos}
              />
              <input
                type="email"
                className="input-registro"
                id="email"
                placeholder="Introduce tu email (name@gmail.com)"
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
              <input
                type="password"
                className="input-registro"
                id="password-repeat"
                placeholder="Repite Password"
                onChange={(e) =>
                  setPasswordRepeat(e.target.value)
                } /** Asigno el valor con onChange a la variable nombre */
                value={passwordRepeat}
              />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="artista"
                  onChange={(e) => handleInputChange(e)}
                />
                <label className="form-check-label" forhtml="label-artista">
                  ¿Quieres tener perfil de artista ?
                </label>
              </div>
              <div className="col-12 pl-2 d-flex justify-content-end my-2">
                <Link to="/login">
                  <button className="boton-registro me-2">Volver</button>
                </Link>
                <button className="boton-registro"> Crear Cuenta </button>
              </div>
            </form>
          </div>
          <div>
            {/* Componente Alert */}
            <Alert />
          </div>
        </div>
      )}
    </>
  );
};
