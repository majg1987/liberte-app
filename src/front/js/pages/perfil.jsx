import React from "react";
import { useParams } from "react-router-dom";
import { Galeria } from "../component/perfil/Galeria.jsx";
import { About } from "../component/perfil/About.jsx";

export const Perfil = () => {
  const { user_id } = useParams();

  return (
    <>
      <div className=" bg-warning bg-gradient bg-opacity-50">
        <h1 className="perfil-header">Welcome!</h1>
        <About user_id={user_id} />
        <Galeria user_id={user_id} />
      </div>
    </>
  );
};
