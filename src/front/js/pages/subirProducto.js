import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
/*Importo el css individual para registro */
import "../../styles/subir-producto.css";
import { Context } from "../store/appContext";
// Importo componente del Alert
import Alert from "../component/Alert";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
/** Importo las librerias para crear alert de registro de producto*/
// import { ToastContainer, toast, Zoom } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const SubirProducto = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [nombre, setNombre] = useState("");
  const [dimensiones, setDimensiones] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenSelect, setImagenSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Guardamos la imagen utilizando cloudinary
  const subirImagen = async (foto) => {
    const data = new FormData();
    data.append("file", foto);
    data.append("upload_preset", "usuarios-liberte");
    setLoading(true);
    const resp = await fetch(
      "https://api.cloudinary.com/v1_1/" +
        process.env.CLOUD_NAME +
        "/image/upload",
      {
        method: "POST",
        // mode: "no-cors",
        body: data,
      }
    );
    const file = await resp.json();
    setImagenSelect(file.secure_url);
    setLoading(false);
  };

  /** Mando datos a Flux para realizar fecth hacia la ruta del backEnd*/
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validacion de formulario para subir producto, y llamo a método de flux para mandar info a la ruta de backend

    for (const e of [nombre, categoria, precio, imagenSelect, descripcion]) {
      if (e.length == 0) {
        actions.notify(
          "Verifica que todos los campos se han completado de forma correcta"
        );
        return;
      }
    }

    if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i.test(nombre)) {
      actions.notify(
        "El nombre de tu obra solo puede incluir letras y espacios"
      );
      return;
    } else if (!/^[0-9]+x[0-9]+$/i.test(dimensiones)) {
      actions.notify(
        "Las dimensiones de tu obra, en centímetros, deben ser del tipo ANCHOxALTO (e.g. 120x120)"
      );
      return;
    } else if (precio <= 0) {
      actions.notify("El precio de tu obra no puede ser igual o menor a cero");
      return;
    }

    actions.registroProducto(
      nombre,
      categoria,
      precio,
      imagenSelect,
      dimensiones,
      descripcion
    );
    setNombre("");
    setDimensiones("");
    setPrecio("");
    setDescripcion("");
  };

  useEffect(() => {
    if (store.registroProducto) {
      actions.notifyOk("Producto Registrado");
      actions.registroProductoReset();
    }
  }, [store.registroProducto]);

  useEffect(() => {
    if (store.registroProductoError) {
      actions.notifyError("Error al realizar el registro del producto");
      actions.registroProductoErrorReset();
    }
  }, [store.registroProductoError]);

  return (
    <>
      <div className="contenedor-principal">
        <div className="contenedor-formulario-producto d-flex justify-content-center align-items-center col-10 mb-4">
          <form onSubmit={handleSubmit} className="formulario-producto col-9">
            <h2 className="titulo-registro text-center"> Subir Producto </h2>
            <div className="row"></div>
            <input
              type="text"
              className="input-registro"
              id="nombre"
              placeholder="Escribe el nombre de tu obra"
              onChange={(e) => setNombre(e.target.value)}
              /** Asigno el valor con onChange a la variable nombre */
              value={nombre}
            />
            <input
              type="text"
              className="input-registro"
              id="dimensiones"
              placeholder="Dimensiones: 120x120cm (AltoxAnchocm)"
              onChange={(e) => setDimensiones(e.target.value)}
              /** Asigno el valor con onChange a la variable dimensiones */
              value={dimensiones}
            />
            <input
              type="number"
              className="input-registro mb-5"
              id="precio"
              placeholder="Precio €"
              onChange={(e) =>
                setPrecio(parseFloat(e.target.value))
              } /** Asigno el valor con onChange a la variable nombre */
              value={precio}
            />
            <select
              className="form-select mb-5"
              aria-label="Default select example"
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option defaultValue={"Seleccion de etiqueta"}>
                Seleccione Categoria
              </option>
              <option value="Pintura">Pintura</option>
              <option value="Dibujo">Dibujo</option>
              <option value="Grabado">Grabado</option>
              <option value="Escultura">Escultura</option>
              <option value="Orfebrería">Orfebrería</option>
              <option value="Evanistería">Evanistería</option>
              <option value="Cerámica">Cerámica</option>
              <option value="Fotografía">Fotografía</option>
              <option value="Otro">Otro</option>
            </select>
            <div className="d-flex">
              <div className="contenedor-img-user">
                {imagenSelect == "" ? (
                  <img
                    className="sin-foto-perfil img-usuario"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  />
                ) : (
                  <img
                    src={imagenSelect}
                    alt="img-usuario"
                    className="img-usuario"
                  />
                )}
              </div>
              <div className="d-flex align-items-center ms-5">
                <label
                  className="label-boton-subir-foto"
                  htmlFor="boton-subir-foto"
                >
                  Foto
                </label>
                <input
                  id="boton-subir-foto"
                  type="file"
                  name="foto"
                  onChange={(e) => {
                    subirImagen(e.target.files[0]);
                  }}
                ></input>
              </div>
            </div>
            <textarea
              className="mt-5 col-12"
              name="descripcion"
              id="descripcion-objeto"
              placeholder="Descripción del Producto"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            ></textarea>
            <div className="col-12 pl-2 d-flex justify-content-end my-2">
              <Link to={`/perfil/${store.userInfo.id}`}>
                <button className="boton-registro me-2">Volver</button>
              </Link>
              <button className="boton-registro">Publicar Producto</button>
            </div>
          </form>
        </div>
        <div>
          {/* Componente Alert */}
          <Alert />;
        </div>
      </div>
    </>
  );
};
