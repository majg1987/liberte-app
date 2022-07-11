import React from "react";
import { Link } from "react-router-dom";
import '../../styles/inicio.css'

export const ProductCard = ({ img }) => {


    return (
        <div className="grid col-lg-4 col-md-6 col-sm-12 col-productos">
            <div className="grid-item container-producto">
                <div className="info-artista">

                    <p className="nombre-artista">
                        ihihi
                    </p>
                </div>
                <img src={img} alt="" className="img-producto" >
                </img>
            </div>
        </div>
    );
};
