import React, { useState, useContext, useEffect } from "react";
/*Importo el css de registro, reutilizo muchas de las propiedades */
import "../../styles/registro.css";
import { Context } from "../store/appContext";
// Importo componente de Alert
import Alert from "../component/Alert";

export const RecuperacionPassword = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "") {
      actions.RecuperacionPassword(email);
    } else {
      actions.notify("Introduce tu email");
    }
  };

  useEffect(() => {
    if (store.mailOk) {
      actions.notifyOk("Nuevo Password enviado al Email");
      actions.emailOkReset();
    }
  }, [store.mailOk]);

  useEffect(() => {
    if (store.mailError) {
      actions.notifyError("Email no Registrado");
      actions.emailErrorReset();
    }
  }, [store.mailError]);

  return (
    <>
      <div className="container-principal-recuperacionPassword d-flex align-items-center">
        <div className="contenedor-formulario contenedor-recuperacionPassword d-flex justify-content-center align-items-center col-10">
          <form onSubmit={handleSubmit} className="formulario-registro">
            <h2 className="titulo-registro">Introduce tu email</h2>
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
            <div className="d-flex flex-column">
              <button className="boton-registro mb-2">
                Recuperar Password
              </button>
            </div>
          </form>
        </div>

        <div>
          {/* Componente Alert */}
          <Alert />
        </div>
      </div>
    </>
  );
};
