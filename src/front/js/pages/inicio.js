import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ProductCard } from "../component/ProductCard";
import "../../styles/inicio.css";

export const Inicio = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid container-inicio">
            <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>

            {/* <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script> */}

            {/* Seccion portada */}
            <div className="container-portada">
                <div className="container-titulos">
                    <div className="row row-titulos">
                        <div className="col-3 w-100 d-flex justify-content-center p-2">
                            <img
                                className="img-logo"
                                src={
                                    "https://res.cloudinary.com/yisusrobles/image/upload/v1657809752/image/lymgdwlcjwbseldkzljg.png"
                                }
                                alt="logo-liberte"
                            />
                        </div>
                    </div>
                </div>

                <div className="container-foto-portada"></div>
            </div>

            {/* Seccion productos */}

            <div className="container container-titulo-productos">
                <p className="titulo-seccion-producto">Productos</p>
            </div>

            <div className="container container-lista-productos">
                <div className="row  row-productos">
                    {/* <div className="row row-productos" data-masonry='{"percentPosition": true}'> */}

                    <ProductCard
                        img={
                            "https://images.pexels.com/photos/12681200/pexels-photo-12681200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        }
                        nombreArtista="Pepe"
                        precio="16€"
                    />
                    <ProductCard
                        img={
                            "https://images.pexels.com/photos/11791794/pexels-photo-11791794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        }
                        nombreArtista="Juan"
                        precio="1540€"
                    />
                    <ProductCard
                        img={
                            "https://images.pexels.com/photos/10433895/pexels-photo-10433895.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                        }
                        nombreArtista="Rodolfo"
                        precio="56€"
                    />
                    <ProductCard
                        img={
                            "https://images.pexels.com/photos/12499889/pexels-photo-12499889.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                        }
                        nombreArtista="Obama"
                        precio="15€"
                    />
                    <ProductCard
                        img={
                            "https://images.pexels.com/photos/6381090/pexels-photo-6381090.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                        }
                        nombreArtista="Rosinni"
                        precio="140€"
                    />
                    <ProductCard
                        img={
                            "https://images.pexels.com/photos/12641743/pexels-photo-12641743.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                        }
                        nombreArtista="Paco"
                        precio="400€"
                    />
                </div>
            </div>
        </div>
    );
};
