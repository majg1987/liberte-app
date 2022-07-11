import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/inicio.css';


export const Inicio = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid container-inicio">

            {/* Seccion portada */}
            <div className="container-portada">

                <div className="container-titulos">
                    <div className="row row-titulos">
                        <div className="col-3">
                            <h5 className="titulo-1">La Liberté</h5>
                        </div>
                        <div className="col-6">

                            <h5 className="titulo-2">MImimimimi</h5>
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

                <div className="row row-productos">

                    <div className="col-lg-4 col-md-6 col-sm-12 col-productos">
                        <div className="container-producto">
                            <img src={"https://images.pexels.com/photos/12681200/pexels-photo-12681200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} alt="" className="img-producto" />
                            <img src={"https://images.pexels.com/photos/11791794/pexels-photo-11791794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="img-producto" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 col-productos">
                        <div className="container-producto">
                            <img src={"https://images.pexels.com/photos/11791794/pexels-photo-11791794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="img-producto" />
                            <img src={"https://images.pexels.com/photos/12681200/pexels-photo-12681200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} alt="" className="img-producto" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 col-productos">
                        <div className="container-producto">
                            <img src={"https://images.pexels.com/photos/12516131/pexels-photo-12516131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="img-producto" />
                            <img src={"https://images.pexels.com/photos/11791794/pexels-photo-11791794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="img-producto" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
