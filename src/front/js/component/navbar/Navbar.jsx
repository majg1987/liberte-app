import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { Context } from "../../store/appContext";

import yellow from "../../../img/yellow.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top navbar-expand-sm navbar-light bg-light">
        <div className="container d-flex justify-content-around position-relative">
          <div className="navbar-brand m-0">
            <Link to="/">
              <img
                src={yellow}
                style={{ width: "80%", height: "70%" }}
                alt="Liberte"
              />
            </Link>
          </div>
          <button className="navbar-toggler"></button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active d-inline position-absolute top-50 start-50 translate-middle">
                <SearchBar />
              </li>

              <div className="d-flex d-inline position-absolute top-50 start-100 translate-middle">
                {store.auth ? (
                  <li className="nav-item dropdown">
                    <Link to="/">
                      <button
                        onClick={actions.logout}
                        type="button"
                        className="btn btn-sm mx-2 border-0"
                      >
                        <FiLogOut size={28} style={{ color: "#e28f2c" }} />
                      </button>
                    </Link>
                  </li>
                ) : null}
                {store.auth ? (
                  <li className="nav-item dropdown">
                    <Link to={`/perfil/${store.userInfo.user_id}`}>
                      <button
                        type="button"
                        className="btn btn-sm mx-2 border-0"
                      >
                        <AiOutlineUser size={28} style={{ color: "#e28f2c" }} />
                      </button>
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <Link to="/login">
                      <button
                        type="button"
                        className="btn btn-sm mx-2 border-0"
                      >
                        <AiOutlineUser size={28} style={{ color: "#e28f2c" }} />
                      </button>
                    </Link>
                  </li>
                )}
                <li className="nav-item active">
                  <Link to="/cesta">
                    <button type="button" className="btn btn-sm me-2 border-0">
                      <GiShoppingBag size={28} style={{ color: "#e28f2c" }} />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {store.productosCesta.length}
                        <span className="visually-hidden"></span>
                      </span>
                    </button>
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
