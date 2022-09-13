import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Filtro } from "../component/perfil/Filtro.jsx";
import { About } from "../component/perfil/About.jsx";
import "../../styles/perfil/perfil.css";

export const Perfil = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.perfil_artista(id);
  }, [id]);

  useEffect(() => {
    localStorage.getItem("productSelect") &&
      localStorage.removeItem("productSelect");
  }, []);


  return (
    <>
      <div className="pt-4 mb-0">
        <div className="container">
          <h1 className="perfil-header fst-italic fw-light mb-4" id="stack-top">
            {typeof store.artista.nombre !== "undefined"
              ? typeof store.userInfo.id !== "undefined" &&
                store.userInfo.id == id
                ? `Hi, ${store.artista.nombre} ${store.artista.apellido}!`
                : `${store.artista.nombre} ${store.artista.apellido}`
              : `${store.artista.nombre} ${store.artista.apellido}`}
          </h1>
          <About id={id} />
        </div>
        <Filtro
          id={id}
          nombreArtista={`${store.artista.nombre} ${store.artista.apellido}`}
          fotoArtista={store.artista.foto_usuario}
        />
      </div>
    </>
  );
};
