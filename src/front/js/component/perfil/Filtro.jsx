import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Galeria } from "../../component/perfil/Galeria.jsx";
import { BsFilter } from "react-icons/bs";

export const Filtro = (props) => {
  const { store, actions } = useContext(Context);

  const [Filtros, setFiltros] = useState({
    precio_min: "",
    precio_max: "",
    categoria: "",
    vendido: false,
  });

  const checkboxHandler = (e) => {
    const checked = e.target.checked;
    setFiltros((prevState) => {
      return { ...prevState, vendido: checked };
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFiltros((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    actions.perfil_galeria(props.id, Filtros);
  }, [props.id, Filtros]);

  return (
    <>
      {store.artistaGaleria.length > 0 ? (
        <div>
          <nav className="container rounded navbar bg-light shadow-sm m-auto mb-5">
            <div className="container-fluid">
              <h2 className="navbar-brand m-2">Galeria de obras</h2>
              <button
                className="navbar-toggler btn btn-sm"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <BsFilter
                  className="navbar-toggler-icon mt-1 border-0"
                  size={15}
                  style={{ color: "#e28f2c" }}
                  title="Filtros galeria"
                />
              </button>
              <div
                className="collapse navbar-collapse m-2"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav align-items-left">
                  <li className="nav-item flex-fill">
                    <div className="input-group rounded">
                      <span className="me-2 mt-2">Precio €</span>
                      <input
                        id="precio_min"
                        name="precio_min"
                        type="number"
                        value={Filtros.precio_min}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Min"
                        aria-label="Min"
                      />
                      <input
                        id="precio_max"
                        name="precio_max"
                        type="number"
                        value={Filtros.precio_max}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Max"
                        aria-label="Max"
                      />
                    </div>
                  </li>
                  <li
                    className="nav-item col flex-fill mb-3 mt-3"
                    id="input-categoria"
                  >
                    <select
                      id="categoria"
                      name="categoria"
                      className="form-select"
                      value={Filtros.categoria}
                      onChange={changeHandler}
                    >
                      <option value="">Categoria</option>
                      <option value="Pintura">Pintura</option>
                      <option value="Dibujo">Dibujo</option>
                      <option value="Grabado">Grabado</option>
                      <option value="Escultura">Escultura</option>
                      <option value="Orfebrería">Orfebrería</option>
                      <option value="Evanistería">Evanistería</option>
                      <option value="Cerámica">Cerámica</option>
                      <option value="Fotografía">Fotografía</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </li>
                  <li className="nav-item flex-fill">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="vendidos"
                        name="vendidos"
                        defaultChecked={false}
                        onChange={checkboxHandler}
                      />

                      <label className="form-check-label" htmlFor="vendidos">
                        Vendido
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {store.artistaGaleriaFiltered.length > 0 ? (
            <Galeria
              key={props.nombreArtista}
              nombreArtista={props.nombreArtista}
              fotoArtista={props.fotoArtista}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};
