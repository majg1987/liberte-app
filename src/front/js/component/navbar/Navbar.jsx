import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { Context } from "../../store/appContext";
import yellow from "../../../img/yellow.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (typeof store.userInfo.id !== "undefined") {
      actions.obtenerCesta(store.userInfo.id);
    }
  }, [store.userInfo.id, store.cambioCesta]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/">
            <img
              src={yellow}
              style={{ width: "80%", height: "70%" }}
              alt="Liberte"
              className="ms-2"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <GiHamburgerMenu
              className="navbar-toggler-icon mt-1 border-0"
              size={15}
              style={{ color: "#e28f2c" }}
              title="Perfil y barra buscadora"
            />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <div className="nav-item mx-auto my-0">
              <SearchBar />
            </div>
            <span className="navbar-text list-unstyled ms-5">
              {store.auth ? (
                <>
                  <li className="nav-item dropdown d-flex">
                    <Link to="/">
                      <button
                        onClick={actions.logout}
                        type="button"
                        className="btn btn-sm mx-2 border-0"
                      >
                        <FiLogOut size={28} style={{ color: "#e28f2c" }} />
                      </button>
                    </Link>
                    <Link to={`/perfil/${store.userInfo.id}`}>
                      <button
                        type="button"
                        className="btn btn-sm mx-2 border-0"
                      >
                        <AiOutlineUser size={28} style={{ color: "#e28f2c" }} />
                      </button>
                    </Link>
                    <Link to={`/cesta/${store.userInfo.id}`}>
                      <button
                        type="button"
                        className="btn btn-sm border-0 me-5"
                      >
                        <GiShoppingBag
                          size={28}
                          style={{ color: "#e28f2c" }}
                          title="Cesta"
                        />
                        <span className="position-absolute badge rounded-pill bg-danger">
                          {store.numeroProductosCesta}
                          <span className="visually-hidden"></span>
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <Link to="/login">
                    <button type="button" className="btn btn-sm mx-2 border-0">
                      <AiOutlineUser size={28} style={{ color: "#e28f2c" }} />
                    </button>
                  </Link>
                </li>
              )}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};
