import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Importo librerias de paypal
import ScrollToTop from "./component/scrollToTop";

import { Inicio } from "./pages/inicio";
import { Login } from "./pages/login";
import { Registro } from "./pages/registro";
import { Perfil } from "./pages/perfil.jsx";
import { Producto } from "./pages/producto";
import { SubirProducto } from "./pages/subirProducto";
import { ConfiguracionUsuario } from "./pages/configuracion.jsx";
import { Cesta } from "./pages/cesta";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "EUR",
      }}
    >
      <div>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Navbar />
            <Routes>
              <Route element={<Inicio />} path="/" />
              <Route element={<Login />} path="/login" />
              <Route element={<Registro />} path="/registro" />
              <Route element={<Perfil />} path="/perfil/user_id" />
              <Route element={<Producto />} path="/producto/:theid" />
              <Route element={<SubirProducto />} path="/subirProducto/" />
              <Route element={<Cesta />} path="/cesta/user_id" />
              <Route
                element={<ConfiguracionUsuario />}
                path="/configuracion/:theid"
              />
              <Route element={<h1> Not found! </h1>} />
            </Routes>
            <Footer />
          </ScrollToTop>
        </BrowserRouter>
      </div>
    </PayPalScriptProvider>
  );
};

export default injectContext(Layout);
