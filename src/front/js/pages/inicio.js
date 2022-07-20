import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ProductCard } from "../component/ProductCard";
import "../../styles/inicio.css";

export const Inicio = () => {
    const { store, actions } = useContext(Context);

    console.log(store.productos)

    useEffect(() => {
        actions.productosInicio();
    }, []);

    return (
        <div className="container-fluid container-inicio">
            {/* Seccion portada */}
            <div className="container-portada  d-flex justify-content-center align-items-center">

                <div className="row row-logo">
                    <img
                        className="img-logo"
                        src={
                            "https://res.cloudinary.com/yisusrobles/image/upload/v1657809752/image/lymgdwlcjwbseldkzljg.png"
                        }
                        alt="logo-liberte"
                    />
                </div>

            </div>


            <div className="container container-titulo-productos">
                <p className="titulo-seccion-producto">Productos</p>
            </div>

            <div className="container container-lista-productos">
                <div className="row  row-productos">


                    {
                        store.productos.map((ele, i) => {
                            console.log("elee", ele.foto_producto);
                            let productCard =
                                <ProductCard
                                    key={ele.id}
                                    id={ele.id}
                                    img={ele.foto_producto}

                                    nombreArtista={ele.nombre}
                                    precio={ele.precio}
                                />
                            return productCard
                        })

                    }

                </div>
            </div>
        </div>
    );
};
