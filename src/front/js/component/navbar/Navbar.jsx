import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar.jsx";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
//import UseAnimations from "react-useanimations";
import { Context } from "../../store/appContext";

import yellow from "../../../img/yellow.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light bg-gradient">
        <div className="container-fluid justify-content-around position-relative">
          <div className="navbar-brand ms-4">
            <Link to="/">
              <img
                src={yellow}
                style={{ width: "80%", height: "70%" }}
                alt="Liberte"
              />
            </Link>
          </div>
          <button
            className="navbar-toggler me-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              style={{ color: "#e28f2c" }}
            ></span>
            {/*  <UseAnimations
              animationKey="menu"
              size={30}
              style={{ cursor: "pointer", padding: 100 }}
            /> */}
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active d-inline position-absolute top-50 start-50 translate-middle">
                <SearchBar />
              </li>

              <div className="d-flex d-inline position-absolute top-50 end-0 translate-middle-y me-4">
                {store.auth ? (
                  <li className="nav-item dropdown">
                    <Link to="/">
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
                    <Link to={`/perfil/${store.userInfo.user_id}`}>
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
                        <AiOutlineUser size={28} style={{ color: "#e28f2c" }} />
                      </button>
                    </Link>
                  </li>
                )}

                <li className="nav-item active">
                  <Link to="/cesta">
                    <button type="button" className="btn btn-sm me-2 border-0">
                      <AiOutlineShoppingCart
                        size={28}
                        style={{ color: "#e28f2c" }}
                      />
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
