import React from "react";
import { Link } from "react-router-dom";
import '../../styles/productCard.css'

export const ProductCard = ({ img, nombreArtista, precio }) => {


    return (
        <div className="grid col-lg-4 col-md-6 col-sm-12 col-productos">
            {/* // <div className="grid col-12 col-productos"> */}
            <div className="grid-item container-producto">
                <a href="" className="h-100 w-100">
                    <div className="row info-artista">
                        <div className="col-10 columna-nombre-artista">
                            <p className="nombre-artista">
                                {nombreArtista}
                            </p>
                        </div>
                        <div className="col-2 columna-precio/obra">
                            <p className="nombre-artista">
                                {precio}
                            </p>
                        </div>

                    </div>
                </a>
                <img src={img} alt="" className="img-producto" >
                </img>
            </div>
        </div>
    );
};
