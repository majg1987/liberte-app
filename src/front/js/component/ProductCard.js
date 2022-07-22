import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/productCard.css";

export const ProductCard = ({ img, nombreArtista, precio, id }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="col-productos" key={id}>
            <Link to={`/producto/${id}`}>
                <div
                    className="grid-item container-producto"
                    onClick={() => actions.productoSelect(img, nombreArtista, precio, id)}
                >
                    <div className="row info-artista">
                        <div className="col-10 columna-nombre-artista">
                            <p className="nombre-artista">{nombreArtista}</p>
                        </div>
                        <div className="col-2 columna-precio/obra">
                            <p className="precio obra">{precio + '€'}</p>
                        </div>
                    </div>

                    <img src={img} alt="" className="img-producto"></img>
                </div>
            </Link>
        </div>
    );
};
