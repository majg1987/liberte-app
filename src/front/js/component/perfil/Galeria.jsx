import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Obra } from "../../component/perfil/Obra.jsx";
import Alert from "../Alert";

export const Galeria = (props) => {
  const { store, actions } = useContext(Context);

  /*   useEffect(() => {
    localStorage.getItem("productSelect") &&
      localStorage.removeItem("productSelect");
  }, []);
 */

  useEffect(() => {
    if (store.errorNoLogin) {
      actions.notifyError("Inicia sesión para agregar productos al carrito");
      actions.errorNoLogin(true);
    }
  }, [store.errorNoLogin]);

  useEffect(() => {
    if (store.yaAñadidoProducto) {
      actions.notify("Este producto ya esta añadido en la cesta");
      actions.yaAñadidoProductoReset();
    }
  }, [store.yaAñadidoProducto]);

  useEffect(() => {
    if (store.okAñadirProducto) {
      actions.notifyOk("Producto añadido a cesta correctamente");
      actions.okAñadirProductoReset();
    }
  }, [store.okAñadirProducto]);

  useEffect(() => {
    if (store.errorAñadirProducto) {
      actions.notifyError("Error al añadir el producto a cesta");
      actions.errorAñadirProductoReset();
    }
  }, [store.errorAñadirProducto]);

  return (
    <>
      <div className="container">
        <div className="gallery me-4">
          <ul>
            {store.artistaGaleriaFiltered.map((obra) => (
              <div key={obra.id}>
                <Obra
                  obra_id={obra.id}
                  foto_producto={obra.foto_producto}
                  nombre={obra.nombre}
                  precio={obra.precio}
                  categoria={obra.categoria}
                  dimensiones={obra.dimensiones}
                  nombreArtista={props.nombreArtista}
                  descripcion={obra.descripcion}
                  fotoArtista={props.fotoArtista}
                />
              </div>
            ))}
          </ul>
        </div>
        <Alert />
      </div>
    </>
  );
};
