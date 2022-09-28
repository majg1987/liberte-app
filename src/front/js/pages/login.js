import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
/*Importo el css de registro, reutilizo muchas de las propiedades */
import "../../styles/registro.css";
import { Context } from "../store/appContext";
// Importo componente de Alert
import Alert from "../component/Alert";
// Importaciones para login con Google de Firebase
import { auth, provider } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Login = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** Compruebo que los campos no se encuentren vacios, si estan completos, mando datos a metodo login en flux
   * si no es asi salta un alert que indica al usuario que debe rellenar los campos del formulario login
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      actions.login(email, password);
    } else {
      actions.notify("Completa todos los campos");
    }
  };

  const signInWithPopUp = (e) => {
    e.preventDefault();
    // console.log("Función signPopUp");
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info
        const user = result.user;
        // console.log(user);
        actions.loginWithGoogle(user);
      })
      .catch((error) => {
        // Handle error here
        const errorCode = error.code;
        const errorMessage = error.message;
        // The emails of the user´s account used
        const email = error.customData.email;
        // The AuthCredential type that was used
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  // Cuando los datos mandados al backend son erróneos invocamos alert
  useEffect(() => {
    if (store.errorAuth) {
      actions.notify("Email o Password incorrectos");
      actions.errorAuth();
    }
  }, [store.errorAuth]);

  return (
    <>
      {store.auth ? (
        <Navigate to={"/"} />
      ) : (
        <div className="min-vh-100 container-principal-login">
          <div className="contenedor-formulario contenedor-login d-flex justify-content-center align-items-center col-10">
            <form className="formulario-registro">
              <h2 className="titulo-registro text-center"> Login </h2>
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
                autoComplete="on"
                id="password"
                placeholder="Introduce tu password"
                onChange={(e) =>
                  setPassword(e.target.value)
                } /** Asigno el valor con onChange a la variable password */
                value={password}
              />
              <div className="d-flex flex-column">
                <button onClick={handleSubmit} className="boton-registro mb-2">
                  Acceder
                </button>
                <button
                  onClick={signInWithPopUp}
                  className="boton-registro mb-2"
                >
                  <i className="fab fa-google me-2"> </i>
                  Acceso con Google
                </button>
                <Link
                  to={"/recuperacionPassword"}
                  className="text-center buttons-login"
                >
                  ¿Has olvidado tu contraseña ? Recupérala
                </Link>
                <Link to={"/registro"} className="text-center buttons-login">
                  Registrarse
                </Link>
              </div>
            </form>
          </div>
          <div>
            {/* Componente Alert */} <Alert />
          </div>
        </div>
      )}
    </>
  );
};
