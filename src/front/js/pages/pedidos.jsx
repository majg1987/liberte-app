import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import DetallesPedido from "../component/detallesPedido.jsx";
import Masonry from "react-masonry-css";



export const Pedidos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.verPedidos()

    }, []);

    let productsInfo = store.pedido.productos_info;



    return (
        <div className="container-fluid min-vh-100 container-inicio">
            <h1 className="cesta-header text-center">Mis pedidos</h1>
            {
                <div className="col-sm-12 col-lg-12 col-lista-productos">
                    <div className="item-counter text-muted">
                        {productsInfo !== undefined && `Has pedido ${productsInfo.length} productos`}
                    </div>

                    <div className="row w-100">

                        {

                            productsInfo !== undefined &&
                            productsInfo.map((ele => {
                                let productosPedido = (
                                    <div
                                        className="col-12 col-lg-6 d-flex justify-content-center"
                                        key={ele.id}
                                    >
                                        <DetallesPedido
                                            id={ele.id}
                                            nombre={ele.nombre}
                                            img={ele.foto_producto}
                                            precio={ele.precio}
                                            descripcion={ele.descripcion}
                                            dimensiones={ele.dimensiones}
                                            categoria={ele.categoria}
                                            nombreArtista={ele.vendedor_nombre}
                                            fotoArtista={ele.vendedor_foto}
                                            fechaPedidoProp={store.pedido.fecha_pedido}
                                            idUser={ele.vendedor_user_id}

                                        />
                                    </div>
                                );

                                return productosPedido;

                            }))
                        }
                        {/* {store.pedido.map((ele) => {
                            let fechaPedido = ele.fecha_pedido;
                            let productosPedido = (
                                <div
                                    className="col-12 col-lg-6 d-flex justify-content-center"
                                // key={ele.productos_info.id}
                                >
                                    <DetallesPedido
                                        key={ele.productos_info.id}
                                        id={ele.productos_info.id}
                                        nombre={ele.productos_info.nombre}
                                        img={ele.productos_info.foto_producto}
                                        precio={ele.productos_info.precio}
                                        descripcion={ele.productos_info.descripcion}
                                        dimensiones={ele.productos_info.dimensiones}
                                        categoria={ele.productos_info.categoria}
                                        nombreArtista={ele.productos_info.vendedor_nombre}
                                        fotoArtista={ele.productos_info.vendedor_foto}
                                        fechaPedidoProp={fechaPedido}
                                        idUser={ele.productos_info.vendedor_user_id}

                                    />
                                </div>
                            );

                            return productosPedido;
                        })} */}
                        {/* {store.pedido.map((ele) => {
                            let fechaPedido = ele.fecha_pedido;
                            console.log(ele)
                            let productosPedido = (
                                <div
                                    className="col-12 col-lg-6 d-flex justify-content-center"
                                // key={ele.productos_info.id}
                                >
                                    <DetallesPedido
                                        key={ele.productos_info.id}
                                        id={ele.productos_info.id}
                                        nombre={ele.productos_info.nombre}
                                        img={ele.productos_info.foto_producto}
                                        precio={ele.productos_info.precio}
                                        descripcion={ele.productos_info.descripcion}
                                        dimensiones={ele.productos_info.dimensiones}
                                        categoria={ele.productos_info.categoria}
                                        nombreArtista={ele.productos_info.vendedor_nombre}
                                        fotoArtista={ele.productos_info.vendedor_foto}
                                        fechaPedidoProp={fechaPedido}
                                        idUser={ele.productos_info.vendedor_user_id}

                                    />
                                </div>
                            );

                            return productosPedido;
                        })} */}
                    </div>

                </div>
            }
        </div >
    );
};
