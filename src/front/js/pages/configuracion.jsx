import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/configuracion-usuario.css";

export const ConfiguracionUsuario = () => {
    const { store, actions } = useContext(Context);


    const [imagenSelect, setImagenSelect] = useState("");
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState(store.userInfo.nombre);
    const [apellido, setApellido] = useState(store.userInfo.apellido);
    const [email, setEmail] = useState(store.userInfo.email);
    const [artista, setArtista] = useState(store.userInfo.artista);
    const [nacimiento, setNacimiento] = useState(store.userInfo.necimiento);
    const [descripcion, setDescripcion] = useState(store.userInfo.descripcion);

    const subirImagen = async (foto) => {
        console.log(foto);
        const data = new FormData();
        data.append("file", foto);
        data.append("upload_preset", "usuarios-liberte");
        setLoading(true);

        try {
            const resp = await fetch(
                "https://api.cloudinary.com/v1_1/yisusrobles/image/upload",
                // `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const file = await resp.json();

            setImagenSelect(file.secure_url);
            setLoading(false);

        } catch (e) {
            console.log(e)
        }


    };

    useEffect(() => {
        console.log("nombre", nombre)
        var myBool = Boolean(artista);
        console.log("ARTIST", myBool)
        console.log("ARTIST", typeof (myBool))

    }, [nombre])



    const enviarCambiosUsuario = (e) => {
        e.preventDefault();
        actions.configuracionUsuario(nombre, apellido, email, artista, nacimiento, descripcion, imagenSelect);
    }


    return (

        <div className="contenedor-principal-configuracion pt-5 d-flex justify-content-center">
            <div className="contenedor-configuracion d-flex justify-content-center align-items-center">
                <form className="formulario-registro">

                    <h2 className="titulo-registro text-center"> Configuración </h2>


                    <div className="row row-nombre">
                        <div className="col-3 col-titulo-nombre">
                            <p className="nombre" >Nombre</p>
                        </div>
                        <div className="col-9 col-input-nombre">
                            <input type="text" className="input-registro input-nombre" onChange={(e) => setNombre(e.target.value)} defaultValue={store.userInfo.nombre} />
                        </div>
                    </div>

                    <div className="row row-apellido">
                        <div className="col-3 col-titulo-apellido">
                            <p className="apellido">Apellido</p>
                        </div>
                        <div className="col-9 col-input-apellido">
                            <input type="text" className="input-registro input-nombre" onChange={(e) => setApellido(e.target.value)} defaultValue={store.userInfo.apellido} />
                        </div>
                    </div>

                    <div className="row row-email">
                        <div className="col-3 col-titulo-email">
                            <p className="email">Email</p>
                        </div>
                        <div className="col-9 col-input-email">
                            <input type="email" className="input-registro input-nombre" onChange={(e) => setEmail(e.target.value)} defaultValue={store.userInfo.email} />
                        </div>
                    </div>

                    <div className="row row-password">
                        <div className="col-3 col-titulo-password">
                            <p className="password">Quieres cuenta de artista?</p>
                        </div>
                        <div className="col-4 col-input-artista">
                            <label htmlFor="artista-si">Sí</label>
                            <input id="artista-si" type="radio" name='artista' value={true} className="input-artista-configuracion" onChange={(e) => setArtista(e.target.value)} />
                        </div>
                        <div className="col-4 col-input-artista">
                            <label htmlFor="artista-no">No</label>
                            <input id="artista-no" type="radio" name='artista' value={false} className="input-artista-configuracion" onChange={(e) => setArtista(e.target.value)} />
                        </div>
                    </div>



                    <div className="row row-nacimiento">
                        <div className="col-3 col-titulo-nacimiento">
                            <p className="nacimiento">Nacimiento</p>
                        </div>
                        <div className="col-9 col-input-nacimiento">
                            <input type="date" className="input-registro input-nacimiento" onChange={(e) => setNacimiento(e.target.value)} defaultValue={store.userInfo.nacimiento} />
                        </div>
                    </div>

                    <div className="row row-descripcion">
                        <div className="col-3 col-titulo-descripcion">
                            <p className="descripcion">Descripcion</p>
                        </div>
                        <div className="col-9 col-input-descripcion ">
                            <textarea className="input-descripcion" onChange={(e) => setDescripcion(e.target.value)} defaultValue={store.userInfo.descripcion}></textarea>
                        </div>
                    </div>

                    <div className="row row-foto">
                        <div className="col-3 col-titulo-foto">

                            <label className="label-boton-subir-foto" htmlFor="boton-subir-foto">Subir foto</label>

                            <input
                                id="boton-subir-foto"
                                type="file"
                                name="foto"
                                onChange={(e) => {
                                    subirImagen(e.target.files[0]);
                                }}
                            ></input>
                        </div>
                        <div className="col-9 col-input-foto ">
                            <div className="row row-input-foto">

                                <div className="col-3 pl-2">
                                    <div className="contenedor-img-user">
                                        {
                                            imagenSelect == "" ?
                                                <img className="sin-foto-perfil img-usuario" src={store.userInfo.foto_usuario} />
                                                :
                                                <img src={imagenSelect} alt="" className="img-usuario" />

                                        }
                                    </div>
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
                                    <button className="boton-registro mb-2" onClick={(e) => enviarCambiosUsuario(e)}> Guardar </button>
                                </div>

                            </div>

                        </div>
                    </div>



                </form>
            </div >
        </div >

    );
};
