import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import DetallesPedido from "../component/detallesPedido.jsx";



export const Pedidos = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.verPedidos()

    }, []);


    return (
        <div className="container-fluid container-inicio">
            <h1 className="cesta-header text-center">Mis pedidos</h1>
            {
                <div className="col-sm-12 col-lg-12 col-lista-productos">
                    <div className="item-counter text-muted">
                        {`Has pedido ${store.pedido.length} productos`}
                    </div>
                    <div className="row w-100">
                        {console.log(store.pedido)}
                        {store.pedido.map((ele) => {
                            let fechaPedido = ele.fecha_pedido;
                            console.log(ele)
                            let productosPedido = (
                                <div
                                    className="col-12 col-lg-6 d-flex justify-content-center"
                                    key={ele.productos_info.id}
                                >
                                    <DetallesPedido
                                        id={ele.productos_info.id}
                                        nombre={ele.productos_info.nombre}
                                        img={ele.productos_info.foto_producto}
                                        precio={ele.productos_info.precio}
                                        descripcion={ele.productos_info.descripcion}
                                        dimensiones={ele.productos_info.dimensiones}
                                        categoria={ele.productos_info.categoria}
                                        nombreArtista={ele.productos_info.nombre_artista}
                                        fotoArtista={ele.productos_info.vendedor_foto}
                                        fechaPedidoProp={fechaPedido}
                                    />
                                </div>
                            );



                            return productosPedido;
                        })}
                    </div>
                </div>
            }
        </div >
    );
};
