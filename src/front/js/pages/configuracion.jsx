import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/configuracion-usuario.css";
import Alert from "../component/Alert";
import { Link } from "react-router-dom";

export const ConfiguracionUsuario = () => {
  const { store, actions } = useContext(Context);

  const [artistProvisional, setArtistProvisional] = useState(
    store.userInfo.artista
  );
  const [imagenSelect, setImagenSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(store.userInfo.nombre);
  const [apellido, setApellido] = useState(store.userInfo.apellido);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [artista, setArtista] = useState(store.userInfo.artista);
  const [nacimiento, setNacimiento] = useState(store.userInfo.nacimiento);
  const [descripcion, setDescripcion] = useState(store.userInfo.descripcion);
  const [tipo_via, setTipo_via] = useState(store.direccion.tipo_via);
  const [nombre_via, setNombre_via] = useState(store.direccion.nombre_via);
  const [numero, setNumero] = useState(store.direccion.numero);
  const [piso, setPiso] = useState(store.direccion.piso);
  const [puerta, setPuerta] = useState(store.direccion.puerta);

  const subirImagen = async (foto) => {
    const data = new FormData();
    data.append("file", foto);
    data.append("upload_preset", "usuarios-liberte");
    setLoading(true);

    try {
      const resp = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const file = await resp.json();
      setImagenSelect(file.secure_url);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (typeof store.userInfo.id !== "undefined") {
      actions.obtenerDireccion();
    }
  }, []);

  const enviarCambiosUsuario = (e) => {
    e.preventDefault();

    // Antes de llamar al método mantenemos la imagen de usuario si no ha puesto una nueva
    if (password === password2) {
      const img =
        imagenSelect === "" ? store.userInfo.foto_usuario : imagenSelect;
      actions.configuracionUsuario(
        nombre,
        apellido,
        password,
        artistProvisional,
        nacimiento,
        descripcion,
        img,
        tipo_via,
        nombre_via,
        numero,
        piso,
        puerta
      );
    } else {
      actions.notify("No se ha podido camiar la contraseña, no coincide");
    }
  };

  useEffect(() => {
    if (store.configuracionOk) {
      actions.notifyOk("Cambios Guardados");
      actions.configuracionOkReset();
    }
  }, [store.configuracionOk]);

  useEffect(() => {
    if (store.configuracionError) {
      actions.notifyError("Error al guardar los cambios");
      actions.configuracionErrorReset();
    }
  }, [store.configuracionError]);

  return (
    <div className="contenedor-principal-configuracion my-3 d-flex justify-content-center">
      <div className="contenedor-configuracion d-flex justify-content-center align-items-center">
        <form className="formulario-registro">
          <h2 className="titulo-registro text-center"> Configuración </h2>

          <div className="row row-nombre">
            <div className="col-3 col-titulo-nombre">
              <p className="nombre">Nombre</p>
            </div>
            <div className="col-9 col-input-nombre">
              <input
                type="text"
                className="input-registro input-nombre"
                onChange={(e) => setNombre(e.target.value)}
                defaultValue={store.userInfo.nombre}
              />
            </div>
          </div>

          <div className="row row-apellido">
            <div className="col-3 col-titulo-apellido">
              <p className="apellido">Apellido</p>
            </div>
            <div className="col-9 col-input-apellido">
              <input
                type="text"
                className="input-registro input-nombre"
                onChange={(e) => setApellido(e.target.value)}
                defaultValue={store.userInfo.apellido}
              />
            </div>
          </div>

          <div className="row row-contraseña">
            <div className="col-3 col-titulo-password">
              <p className="password">Nueva contraseña</p>
            </div>
            <div className="col-9 col-input-password">
              <input
                type="password"
                className="input-registro input-nombre"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row row-contraseña">
            <div className="col-3 col-titulo-password">
              <p className="password">Repita su nueva contraseña</p>
            </div>
            <div className="col-9 col-input-password">
              <input
                type="password"
                className="input-registro input-nombre"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
          </div>

          <div className="row row-artista">
            <div className="col-3 col-titulo-artista">
              <p className="password">Quieres cuenta de artista?</p>
            </div>

            {
              // Comprobaciones para que salga señalada según las caracteristicas del usuario (artista/no artista)
              artistProvisional == true ? (
                <>
                  <div className="col-4 col-input-artista">
                    <label htmlFor="artista-si">Sí</label>
                    <input
                      id="artista-si"
                      type="radio"
                      name="artista"
                      value={true}
                      className="input-artista-configuracion"
                      onLoad={(e) => {
                        setArtista(e.target.value);
                      }}
                      defaultChecked
                    />
                  </div>
                  <div className="col-4 col-input-artista">
                    <label htmlFor="artista-no">No</label>
                    <input
                      id="artista-no"
                      type="radio"
                      name="artista"
                      value={false}
                      className="input-artista-configuracion"
                      onChange={(e) => {
                        setArtista(e.target.value);
                        setArtistProvisional(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-4 col-input-artista">
                    <label htmlFor="artista-si">Sí</label>
                    <input
                      id="artista-si"
                      type="radio"
                      name="artista"
                      value={true}
                      className="input-artista-configuracion"
                      onChange={(e) => {
                        setArtista(e.target.value);
                        setArtistProvisional(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-4 col-input-artista">
                    <label htmlFor="artista-no">No</label>
                    <input
                      id="artista-no"
                      type="radio"
                      name="artista"
                      value={false}
                      className="input-artista-configuracion"
                      onLoad={(e) => {
                        setArtista(e.target.value);
                        setArtistProvisional(e.target.value);
                      }}
                      defaultChecked
                    />
                  </div>
                </>
              )
            }
          </div>

          <div className="row row-nacimiento">
            <div className="col-3 col-titulo-nacimiento">
              <p className="nacimiento">Nacimiento</p>
            </div>
            <div className="col-9 col-input-nacimiento">
              <input
                type="date"
                className="input-registro input-nacimiento"
                onChange={(e) => setNacimiento(e.target.value)}
                defaultValue={store.userInfo.nacimiento}
              />
            </div>
          </div>

          <div className="row row-tipo_via">
            <div className="col-3 col-titulo-tipo_via">
              <p className="tipo_via">Tipo de vía</p>
            </div>
            <div className="col-9 col-input-tipo_via">
              <input
                type="text"
                className="input-registro input-tipo_via"
                onChange={(e) => setTipo_via(e.target.value)}
                defaultValue={store.direccion.tipo_via}
              />
            </div>
          </div>

          <div className="row row-nombre_via">
            <div className="col-3 col-titulo-nombre_via">
              <p className="nombre_via">Nombre de vía</p>
            </div>
            <div className="col-9 col-input-tipo_via">
              <input
                type="text"
                className="input-registro input-nombre_via"
                onChange={(e) => setNombre_via(e.target.value)}
                defaultValue={store.direccion.nombre_via}
              />
            </div>
          </div>

          <div className="row row-numero">
            <div className="col-3 col-titulo-numero">
              <p className="numero">Número</p>
            </div>
            <div className="col-9 col-input-tipo_via">
              <input
                type="number"
                className="input-registro input-numero"
                onChange={(e) => setNumero(e.target.value)}
                defaultValue={store.direccion.numero}
              />
            </div>
          </div>

          <div className="row row-piso">
            <div className="col-3 col-titulo-piso">
              <p className="piso">Piso</p>
            </div>
            <div className="col-9 col-input-piso">
              <input
                type="number"
                className="input-registro input-piso"
                onChange={(e) => setPiso(e.target.value)}
                defaultValue={store.direccion.piso}
              />
            </div>
          </div>

          <div className="row row-puerta">
            <div className="col-3 col-titulo-puerta">
              <p className="puerta">Puerta</p>
            </div>
            <div className="col-9 col-input-puerta">
              <input
                type="text"
                className="input-registro input-puerta"
                onChange={(e) => setPuerta(e.target.value)}
                defaultValue={store.direccion.puerta}
              />
            </div>
          </div>

          <div className="row row-descripcion">
            <div className="col-3 col-titulo-descripcion">
              <p className="descripcion">Descripción</p>
            </div>
            <div className="col-9 col-input-descripcion ">
              <textarea
                className="input-descripcion"
                onChange={(e) => setDescripcion(e.target.value)}
                defaultValue={store.userInfo.descripcion}
              ></textarea>
            </div>
          </div>

          <div className="row row-foto">
            <div className="col-3 col-titulo-foto">
              <label
                className="label-boton-subir-foto"
                htmlFor="boton-subir-foto"
              >
                Subir foto
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
            <div className="col-9 col-input-foto ">
              <div className="row row-input-foto">
                <div className="col-3 pl-2">
                  <div className="contenedor-img-user">
                    {imagenSelect == "" ? (
                      <img
                        className="sin-foto-perfil img-usuario"
                        src={store.userInfo.foto_usuario}
                      />
                    ) : (
                      <img src={imagenSelect} alt="" className="img-usuario" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-boton">
            <div className="col-3 col-titulo-boton"></div>
            <div className="col-9 col-input-foto ">
              <div className="row row-input-foto">
                <div className="col-12 pl-2 d-flex justify-content-end my-2">
                  <Link to={`/perfil/${store.userInfo.id}`}>
                    <button className="boton-registro me-2">Cancelar</button>
                  </Link>

                  <button
                    className="boton-registro mb-2"
                    onClick={(e) => enviarCambiosUsuario(e)}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Alert />
    </div>
  );
};
