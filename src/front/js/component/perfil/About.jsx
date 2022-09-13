import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import {
  BiCog, BiPlusCircle, BiListUl
} from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "../../../styles/perfil/about.css";

export const About = () => {
  const { store, actions } = useContext(Context);

  // Default info
  const descripcion = "No has rellenado tu descripción. Cuéntanos de ti!";
  const foto_usuario =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

  return (
    <>
      <div className="container mb-5">
        <div className="card shadow-lg p-3 mb-5 bg-body bg-gradient bg-opacity-10 text-black rounded lh-sm">
          <div className="d-flex about-header-wrapper p-4 position-relative">
            <div className="about-icons position-absolute top-0 end-0">
              {"id" in store.userInfo &&
                store.artista.id === store.userInfo.id ? (
                <ul className="list-unstyled d-flex">
                  <li className="m-0">
                    <Link to={`/pedidos/${store.userInfo.id}`}>
                      <span type="button" className="btn btn-sm border-0">
                        <BiListUl

                          size={28}
                          style={{ color: "#e28f2c" }}
                          title="Mis pedidos"
                        />
                      </span>
                    </Link>
                    <Link to={`/configuracion/${store.userInfo.id}`}>
                      <span type="button" className="btn btn-sm border-0">
                        <BiCog
                          size={28}
                          style={{ color: "#e28f2c" }}
                          title="Configuración"
                        />
                      </span>
                    </Link>

                  </li>
                  {store.artista.artista ? (
                    <li className="m-0">
                      <Link to="/subirProducto">
                        <span
                          type="button"
                          className="btn btn-sm border-0"
                          data-bs-title="Subir producto"
                        >
                          <BiPlusCircle
                            size={28}
                            style={{ color: "#e28f2c" }}
                            title="Añadir obra"
                          />
                        </span>
                      </Link>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </div>
            <div className="position-absolute top-0 start-0 m-3 d-flex">
              <h3 className="me-3">About me</h3>
              <div className="social-container d-none">
                <a
                  className="social-icons link-dark tooltips"
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  <span>Facebook</span>
                  <FaFacebookF />
                </a>
                <a
                  className="social-icons link-dark tooltips"
                  href="https://twitter.com/"
                  target="_blank"
                >
                  <span>Twitter</span>
                  <FaTwitter />
                </a>
                <a
                  className="social-icons link-dark tooltips"
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  <span>Instagram</span>
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          <>
            <div className="about row row-cols-1 row-cols-md-2 justify-content-center fw-light">
              <div className="col text-secondary text-start fst-italic my-4 position-relative">
                <p className="lh-sm w-100 ms-3">
                  {typeof store.artista.descripcion !== "undefined" &&
                    store.artista.descripcion !== null &&
                    store.artista.descripcion.length > 0
                    ? store.artista.descripcion
                    : descripcion}
                </p>
              </div>

              <div className="col img-fluig" id="profile-pic-wrapper">
                <img
                  src={
                    typeof store.artista.foto_usuario !== "undefined" &&
                      store.artista.foto_usuario !== null
                      ? store.artista.foto_usuario
                      : foto_usuario
                  }
                  alt="foto_usuario"
                  className="w-100 "
                  id="profile-pic"
                />
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
