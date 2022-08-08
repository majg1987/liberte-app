/** Importo las librerias para crear alert de registro erroneo */
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      registro: false,
      registroError: false,
      registroProducto: false,
      registroProductoError: false,
      errorAñadirProducto: false,
      okAñadirProducto: false,
      yaAñadidoProducto: false,
      configuracionOk: false,
      configuracionError: false,
      mailOk: false,
      mailError: false,
      auth: false,
      errorAuth: false,
      errorNoLogin: false,
      cambioCesta: false,
      precioCesta: true,
      artistas: [],
      artista: {},
      artistaGaleria: [],
      artistaGaleriaFiltered: [],
      productos: [],
      productoSelect: {},
      userInfo: {},
      productosCesta: [],
      pedido: [],
      direccion: {},
      configuracion: {},
      numeroProductosCesta: [],
    },
    actions: {
      // Alerts
      notify: (mensaje) =>
        toast.warn(mensaje, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom,
        }),

      notifyOk: (mensaje) =>
        toast.info("🦄 " + mensaje, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom,
        }),

      notifyError: (mensaje) =>
        toast.error(mensaje, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom,
        }),

      // Reinicio valor errorNoLogin a false
      errorNoLogin: (reset = false) => {
        if (reset) {
          // Reinicio valor errorNoLogin a false
          setStore({ errorNoLogin: false });
        } else {
          setStore({ errorNoLogin: true });
        }
      },

      // Reinicio valor emailOk a false
      emailOkReset: () => {
        setStore({
          mailOk: false,
        });
      },

      // Reinicio valor emailError a false
      emailErrorReset: () => {
        setStore({
          mailError: false,
        });
      },

      // Recuperacion de Password mediante correo electrónico
      RecuperacionPassword: async (email) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        };
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/recuperarPassword",
            options
          );
          if (response.status === 200) {
            setStore({
              mailOk: true,
            });
          } else {
            setStore({
              mailError: true,
            });
          }
        } catch (error) {
          console.log(error);
          setStore({
            mailError: true,
          });
        }
      },

      // Reinicio valor registroError a false
      registroErrorReset: () => {
        setStore({
          registroError: false,
        });
      },

      // Registro
      registro: async (nombre, apellidos, email, password, artista) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellidos,
            email: email,
            password: password,
            artista: artista,
            nacimiento: null,
            foto_usuario: null,
            descripcion: null,
          }),
        };
        try {
          // fetching data from the backend
          const response = await fetch(
            process.env.BACKEND_URL + "/api/registration",
            options
          );
          if (response.status === 200) {
            setStore({
              registro: true,
            });
          }
          const data = await response.json();
          setStore({
            registro: false,
          });
        } catch (error) {
          console.log(error);
          setStore({
            registroError: true,
          });
        }
      },

      // Reinicio valor registroProducto a false
      registroProductoReset: () => {
        setStore({
          registroProducto: false,
        });
      },
      // Reinicio valor registroProductoError a false
      registroProductoErrorReset: () => {
        setStore({
          registroProductoError: false,
        });
      },

      // Registro de producto
      registroProducto: async (
        nombre,
        fechaAlta,
        categoria,
        precio,
        imagenSelect,
        dimensiones,
        descripcion
      ) => {
        let bearer = `Bearer ${sessionStorage.getItem("token")}`;
        const store = getStore();
        const user_info = store.userInfo;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            nombre: nombre,
            fecha_alta: fechaAlta,
            categoria: categoria,
            precio: precio,
            foto_producto: imagenSelect,
            vendido: false,
            dimensiones: dimensiones,
            descripcion: descripcion,
            vendedor_user_id: user_info.id,
            pedido_id: null,
          }),
        };
        try {
          // fetching data from the backend
          const response = await fetch(
            process.env.BACKEND_URL + "/api/producto",
            options
          );
          if (response.status === 200) {
            setStore({
              registroProducto: true,
            });
          }
          const data = await response.json();
          data.msg === "Missing Authorization Header" &&
            alert("Debes iniciar sesión para publicar un producto");
        } catch (error) {
          console.log("Error loading message from backend", error);
          setStore({
            registroProductoError: true,
          });
        }
      },

      reloadWindow: () => {
        if (
          sessionStorage.getItem("token") &&
          localStorage.getItem("userInfo")
        ) {
          setStore({
            auth: true,
            userInfo: JSON.parse(localStorage.getItem("userInfo")),
          });
        }
      },

      // Reinicio valor errorAuth a false
      errorAuth: () => {
        setStore({
          errorAuth: false,
        });
      },

      // Fecth de Login
      login: async (email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            options
          );
          if (resp.status === 200) {
            setStore({
              auth: true,
            });
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.token); // accedemos a la key acces_token de data

          setStore({
            userInfo: data.user_info,
          });

          const userInfoStrfy = JSON.stringify(getStore().userInfo);
          localStorage.setItem("userInfo", userInfoStrfy);
          // return true; // Devuelve true para que se ejecute la acción que llamamos en Login
        } catch (error) {
          console.log(error);
          setStore({
            errorAuth: true,
          });
        }
      },
      // logoutButtonNavbar
      logout: () => {
        setStore({
          auth: false,
          userInfo: {},
        });
        sessionStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cesta");
        setStore({ productosCesta: [] });
      },
      //searchBar
      search: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/artistas"
          );
          const data = await response.json();
          setStore({
            artistas: data,
          });
        } catch (error) {
          console.log("Error loading message from /api/artistas", error);
        }
      },
      perfil_artista: async (id) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/perfil_artista?id=${id}`
          );
          const data = await response.json();
          setStore({
            artista: data,
          });
        } catch (error) {
          console.log("Error loading message from /api/perfil_artista", error);
        }
      },
      perfil_galeria: async (id, filters) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/perfil_galeria?id=${id}`
          );

          const data = await response.json();

          if (data.length > 0) {
            const data_filtered = data.filter((obra) => {
              if (
                (filters.precio_min !== ""
                  ? obra.precio >= filters.precio_min
                  : true) &&
                (filters.precio_max !== ""
                  ? obra.precio <= filters.precio_max
                  : true) &&
                (filters.categoria !== ""
                  ? obra.categoria === filters.categoria
                  : true) &&
                obra.vendido === filters.vendido
              ) {
                return obra;
              }
            });
            setStore({
              artistaGaleria: data,
              artistaGaleriaFiltered: data_filtered,
            });
          }
        } catch (error) {
          console.log("Error loading message from /api/perfil_galeria", error);
        }
      },
      // Productos Inicio
      productosInicio: async () => {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/productosInicio",
            options
          );
          const data = await resp.json();
          setStore({
            productos: data,
          });
        } catch (error) {
          console.log(error);
        }
      },
      // ProductSelect
      productoSelect: (
        id,
        nombre,
        img,
        precio,
        descripcion,
        dimensiones,
        categoria,
        nombreArtista,
        fotoArtista
      ) => {
        if (
          !localStorage.getItem("productSelect") ||
          Object.keys(localStorage.getItem("productSelect")).length === 0
        ) {
          setStore({
            productoSelect: {
              id: id,
              nombre: nombre,
              img: img,
              precio: precio,
              descripcion: descripcion,
              dimensiones: dimensiones,
              categoria: categoria,
              nombreArtista: nombreArtista,
              fotoArtista: fotoArtista,
            },
          });

          const prctStrfy = JSON.stringify(getStore().productoSelect);
          localStorage.setItem("productSelect", prctStrfy);
        } else {
          setStore({
            productoSelect: JSON.parse(localStorage.getItem("productSelect")),
          });
        }
      },

      // Reinicio valor errorAñadirProducto a false
      errorAñadirProductoReset: () => {
        setStore({
          errorAñadirProducto: false,
        });
      },

      // Reinicio valor okAñadirProducto a false
      okAñadirProductoReset: () => {
        setStore({
          okAñadirProducto: false,
        });
      },

      // Reinicio valor yaAñadidoProducto a false
      yaAñadidoProductoReset: () => {
        setStore({
          yaAñadidoProducto: false,
        });
      },

      añadirACesta: async (user_id, producto_id) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            producto_id: producto_id,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/cesta",
            options
          );
          if (resp.status === 200) {
            setStore({
              okAñadirProducto: true,
              cambioCesta: true,
            });
          } else if (resp.status == 208) {
            setStore({ yaAñadidoProducto: true });
          }
          const data = await resp.json();
        } catch (error) {
          setStore({ errorAñadirProducto: true });
          console.log(error);
        }
      },

      obtenerCesta: async (user_id) => {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + `/api/cesta?user_id=${user_id}`
          );
          const data = await resp.json();

          let suma = 0;
          for (let precios in data.result) {
            suma += data.result[precios].precio;
          }
          setStore({
            productosCesta: data.result,
            precioCesta: suma,
            numeroProductosCesta: data.result.length,
            cambioCesta: false,
          });
        } catch (error) {
          console.log(error);
        }
      },

      borrarProductoCesta: async (user_id, producto_id) => {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            producto_id: producto_id,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/cesta",
            options
          );
          getActions().obtenerCesta(user_id);
        } catch (error) {
          console.log(error);
        }
      },
      obtenerDireccion: async () => {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL +
              `/api/direccion?user_id=${getStore().userInfo.id}`,
            options
          );
          const data = await resp.json();
          setStore({
            direccion: data.result,
            configuracion: data.result.user_id,
          });

          const direccionStrfy = JSON.stringify(getStore().direccion);
          localStorage.setItem("direccion", direccionStrfy);
        } catch (error) {
          console.log(error);
          setStore({
            direccion: JSON.parse(localStorage.getItem("direccion")),
          });
        }
      },

      // Reinicio valor configuracionOk a false
      configuracionOkReset: () => {
        setStore({
          configuracionOk: false,
        });
      },
      // Reinicio valor configuracionError a false
      configuracionErrorReset: () => {
        setStore({
          configuracionError: false,
        });
      },

      //   Configuracion usuario
      configuracionUsuario: async (
        nombre,
        apellido,
        password,
        artista,
        nacimiento,
        descripcion,
        foto,
        tipo_via,
        nombre_via,
        numero,
        piso,
        puerta
      ) => {
        let bearer = `Bearer ${sessionStorage.getItem("token")}`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            token: sessionStorage.getItem("token"),
            id: getStore().userInfo.id,
            nombre: nombre,
            apellido: apellido,
            password: password,
            artista: artista === "true" ? true : false,
            nacimiento: nacimiento,
            descripcion: descripcion,
            foto_usuario: foto,
            tipo_via: tipo_via,
            nombre_via: nombre_via,
            numero: numero,
            piso: piso,
            puerta: puerta,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL +
              `/api/configuracion?user_id=${getStore().userInfo.id}`,
            options
          );
          if (resp.status === 200) {
            setStore({ configuracionOk: true });
          }
          const data = await resp.json();
          localStorage.removeItem("userInfo");
          setStore({
            userInfo: data.usuario,
            direccion: data.direccion,
          });

          const userInfoStrfy = JSON.stringify(getStore().userInfo);
          const direccionInfoStrfy = JSON.stringify(getStore().direccion);
          localStorage.setItem("userInfo", userInfoStrfy);
          localStorage.setItem("direccion", direccionInfoStrfy);
        } catch (error) {
          console.log(error);
          setStore({ configuracionError: true });
        }
      },
      hacerPedido: async (user_id) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_comprador: getStore().userInfo.id,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/pedido",
            options
          );
          const data = await resp.json();

          getActions().obtenerCesta(getStore().userInfo.id);

          console.log(
            "acabo de ejecutar getActions().obtenerCesta en hacerPedido"
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};
export default getState;
