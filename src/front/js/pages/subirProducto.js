import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
/*Importo el css individual para registro */
import "../../styles/subir-producto.css";
import { Context } from "../store/appContext";
/** Importo las librerias para crear alert de registro de producto*/
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SubirProducto = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [nombre, setNombre] = useState("");
  const [dimensiones, setDimensiones] = useState("");
  const fecha = new Date();
  const [tecnica, setTecnica] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenSelect, setImagenSelect] = useState("");
  const [loading, setLoading] = useState(false);
  /* Recupero fecha actual */
  const fecha_alta =
    "Fecha de Alta: " +
    fecha.getDate() +
    "/" +
    (fecha.getMonth() + 1) +
    "/" +
    fecha.getFullYear();

  // Guardamos la imagen utilizando cloudinary
  const subirImagen = async (foto) => {
    const data = new FormData();
    data.append("file", foto);
    data.append("upload_preset", "usuarios-liberte");
    setLoading(true);
    const resp = await fetch(
      "https://api.cloudinary.com/v1_1/yisusrobles/image/upload",
      {
        method: "POST",
        // mode: "no-cors",
        body: data,
      }
    );
    const file = await resp.json();
    console.log(file);
    setImagenSelect(file.secure_url);
    setLoading(false);
  };

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

  /** Mando datos a Flux para realizar fecth hacia la ruta del backEnd*/
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      nombre +
        " " +
        dimensiones +
        " " +
        tecnica +
        " " +
        precio +
        " " +
        imagenSelect +
        " " +
        descripcion
    );
    // Validacion de formulario para subir producto, y llamo a método de flux para mandar info a la ruta de backend
    if (
      nombre !== "" &&
      /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i.test(nombre) &&
      dimensiones !== "" &&
      tecnica !== "" &&
      precio > 0 &&
      imagenSelect !== "" &&
      descripcion !== ""
    ) {
      actions.registroProducto(
        nombre,
        dimensiones,
        tecnica,
        precio,
        imagenSelect,
        descripcion
      );
      if (store.registroProducto) {
        notify("Registro de Producto Completado");
      }
    } else {
      notify("Completa todos los campos de forma correcta");
    }
  };

  return (
    <>
      <div className=" contenedor-principal">
        <div className="contenedor-formulario-producto d-flex justify-content-center align-items-center col-10 my-3">
          <form onSubmit={handleSubmit} className="formulario-producto col-9">
            <h2 className="titulo-registro"> Subir Producto </h2>
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
              placeholder="Dimensiones: 120x120x5cm (AltoxAnchoxProfundidad)"
              onChange={(e) => setDimensiones(e.target.value)}
              /** Asigno el valor con onChange a la variable dimensiones */
              value={dimensiones}
            />
            <input
              type="text"
              className="input-registro"
              id="fecha"
              value={fecha_alta}
              disabled
            />
            <input
              type="number"
              className="input-registro mb-5"
              id="precio"
              placeholder="Precio"
              onChange={(e) =>
                setPrecio(parseFloat(e.target.value))
              } /** Asigno el valor con onChange a la variable nombre */
              value={precio}
            />
            <select
              className="form-select mb-5"
              aria-label="Default select example"
              onChange={(e) => setTecnica(e.target.value)}
            >
              <option defaultValue={"Seleccion de etiqueta"}>
                Seleccione la técnica
              </option>
              <option value="Acuarela">Pintura</option>
              <option value="Lienzo">Lienzo</option>
              <option value="Oleo">Oleo</option>
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
                  <img src={imagenSelect} alt="" className="img-usuario" />
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
              placeholder="Descripcion del Producto"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            ></textarea>

            <div className="mt-4">
              <button className="boton-registro"> Publicar Producto </button>
            </div>
          </form>
        </div>
        <div>
          {/* Componente Alert */}
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
        </div>
      </div>
    </>
  );
};
