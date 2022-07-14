import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/configuracion-usuario.css";

export const ConfiguracionUsuario = () => {
    const { store, actions } = useContext(Context);

    const [imagenSelect, setImagenSelect] = useState("");
    const [loading, setLoading] = useState(false);

    const subirImagen = async (foto) => {
        console.log(foto);
        const data = new FormData();
        data.append("file", foto);
        data.append("upload_preset", "usuarios-liberte");
        setLoading(true);
        const resp = await fetch(
            "https://api.cloudinary.com/v1_1/yisusrobles/image/upload",
            {
                method: "POST",
                // mode: "no-cors",
                body: data,
            }
        );
        const file = await resp.json();
        console.log(file);
        setImagenSelect(file.secure_url);
        setLoading(false);


    };


    return (

        <div className="contenedor-principal-configuracion pt-5 d-flex justify-content-center">
            <div className="contenedor-configuracion d-flex justify-content-center align-items-center">
                <form className="formulario-registro">

                    <h2 className="titulo-registro text-center"> Configuración </h2>


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

                    <div className="row row-foto">
                        <div className="col-3 col-titulo-foto">
                            <p className="foto">Foto</p>
                        </div>
                        <div className="col-9 col-input-foto ">
                            <div className="row row-input-foto">

                                <div className="col-3 pl-2">
                                    <div className="contenedor-img-user">
                                        {
                                            imagenSelect == "" ?
                                                <img className="sin-foto-perfil img-usuario" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                                                :
                                                <img src={imagenSelect} alt="" className="img-usuario" />

                                        }
                                    </div>
                                </div>

                                <div className="col-8">
                                    <input
                                        type="file"
                                        name="pic"
                                        onChange={(e) => {
                                            subirImagen(e.target.files[0]);
                                        }}
                                    ></input>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="row row-boton">
                        <div className="col-3 col-titulo-boton">
                        </div>
                        <div className="col-9 col-input-foto ">
                            <div className="row row-input-foto">

                                <div className="col-12 pl-2 d-flex justify-content-end">
                                    <button className="boton-registro mb-2"> Guardar </button>
                                </div>

                            </div>

                        </div>
                    </div>



                </form>
            </div>
        </div>

    );
};
