import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/configuracion-usuario.css";

export const ConfiguracionUsuario = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <div className="contenedor-principal pt-5 d-flex justify-content-center">
                <div className="contenedor-configuracion d-flex justify-content-center align-items-center">
                    <form className="formulario-registro">

                        <h2 className="titulo-registro"> Configuración </h2>

                        <div className="row row-nombre">
                            <div className="col-3 col-titulo-nombre">
                                <p className="nombre">Nombre</p>
                            </div>
                            <div className="col-9 col-input-nombre">
                                <input type="text" className="input-registro input-nombre" />
                            </div>
                        </div>

                        <div className="row row-apellido">
                            <div className="col-3 col-titulo-apellido">
                                <p className="apellido">Apellido</p>
                            </div>
                            <div className="col-9 col-input-apellido">
                                <input type="text" className="input-registro input-nombre" />
                            </div>
                        </div>

                        <div className="row row-email">
                            <div className="col-3 col-titulo-email">
                                <p className="email">Email</p>
                            </div>
                            <div className="col-9 col-input-email">
                                <input type="email" className="input-registro input-nombre" />
                            </div>
                        </div>

                        <div className="row row-contraseña">
                            <div className="col-3 col-titulo-contraseña">
                                <p className="contraseña">Contraseña</p>
                            </div>
                            <div className="col-9 col-input-contraseña">
                                <input type="password" className="input-registro input-contraseña" />
                            </div>
                        </div>

                        <div className="row row-DNI">
                            <div className="col-3 col-titulo-DNI">
                                <p className="DNI">DNI</p>
                            </div>
                            <div className="col-9 col-input-DNI">
                                <input type="text" className="input-registro input-DNI" />
                            </div>
                        </div>

                        <div className="row row-nacimiento">
                            <div className="col-3 col-titulo-nacimiento">
                                <p className="nombre">Fecha de nacimiento</p>
                            </div>
                            <div className="col-9 col-input-nacimiento">
                                <input type="text" className="input-registro input-nacimiento d-flex align-items-end" />
                            </div>
                        </div>

                        <div className="row row-nacimiento">
                            <div className="col-3 col-titulo-nacimiento">
                                <p className="nacimiento">Nacimiento</p>
                            </div>
                            <div className="col-9 col-input-nacimiento">
                                <input type="date" className="input-registro input-nacimiento" />
                            </div>
                        </div>

                        <div className="row row-descripcion">
                            <div className="col-3 col-titulo-descripcion">
                                <p className="descripcion">Descripcion</p>
                            </div>
                            <div className="col-9 col-input-descripcion ">
                                <textarea className="input-descripcion"></textarea>
                            </div>
                        </div>



                    </form>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};
