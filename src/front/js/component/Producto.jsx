import React from "react";
import { Link } from "react-router-dom";

export const Producto = ({ nombreObra, foto, artista, precio, descripcion }) => {


    return (
        <div className="col-lg-6 col-md-12 col-sm-12 titulo-foto-producto">
            <p className="nombre-obra">mimimi</p>
            <img src={"https://images.pexels.com/photos/12776968/pexels-photo-12776968.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"} alt="" />
        </div>

    );
};
