import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar.jsx";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import UseAnimations from "react-useanimations";
import { Context } from "../../store/appContext";

import yellow from "../../../img/yellow.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top navbar-expand-sm navbar-light bg-light">
        <div className="container d-flex justify-content-around position-relative">
          <div className="navbar-brand m-0">
            <Link to="/inicio">
              <img
                src={yellow}
                style={{ width: "80%", height: "70%" }}
                alt="Liberte"
              />
            </Link>
          </div>
          <button className="navbar-toggler">
            <UseAnimations
              animationKey="menu"
              size={30}
              style={{ cursor: "pointer", padding: 100 }}
            />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active d-inline position-absolute top-50 start-50 translate-middle">
                <SearchBar />
              </li>

              <div className="d-flex d-inline position-absolute top-50 start-100 translate-middle">
                {store.auth ? (
                  <li className="nav-item dropdown">
                    <Link to="/inicio">
                      <button
                        onClick={actions.logout}
                        type="button"
                        className="btn btn-sm mx-2 border-0"
                      >
                        <FiLogOut size={28} />
                      </button>
                    </Link>
                  </li>
                ) : null}
                {store.auth ? (
                  <li className="nav-item dropdown">
                    <Link to="/perfil">
                      <button
                        type="button"
                        className="btn btn-sm mx-2 border-0"
                      >
                        <AiOutlineUser size={28} />
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
                        <AiOutlineUser size={28} />
                      </button>
                    </Link>
                  </li>
                )}

                <li className="nav-item active">
                  <Link to="/cart">
                    <button type="button" className="btn btn-sm me-2 border-0">
                      <AiOutlineShoppingCart size={28} />
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
