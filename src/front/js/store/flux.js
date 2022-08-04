/** Importo las librerias para crear alert de registro erroneo */
import {
    ToastContainer,
    toast,
    Zoom
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            registro: false,
            registroError: false,
            registroProducto: false,
            registroProductoError: false,
            mailOk: false,
            mailError: false,
            auth: false,
            errorAuth: false,
            artistas: [],
            productos: [],
            productoSelect: {},
            userInfo: {},
            productosCesta: [],
            pedido: [],
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

            // Reinicio valor emailOk a false
            emailOkReset: () => {
                setStore({
                    mailOk: false
                });
            },
            // Reinicio valor emailError a false
            emailErrorReset: () => {
                setStore({
                    mailError: false
                });
            },

            // Recuperacion de Password mediante correo electrónico
            RecuperacionPassword: async (email) => {
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email
                    })
                }
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/recuperarPassword",
                        options);
                    if (response.status === 200) {
                        setStore({
                            mailOk: true
                        })
                    } else {
                        setStore({
                            mailError: true
                        })
                    }
                } catch (error) {
                    console.log(error);
                    setStore({
                        mailError: true
                    })
                }
            },

            // Reinicio valor registroError a false
            registroErrorReset: () => {
                setStore({
                    registroError: false
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
                        registroError: true
                    });
                }
            },

            // Reinicio valor registroProducto a false
            registroProductoReset: () => {
                setStore({
                    registroProducto: false
                });
            },
            // Reinicio valor registroProductoError a false
            registroProductoErrorReset: () => {
                setStore({
                    registroProductoError: false
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
                        vendedor_user_id: user_info.user_id,
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
                    const data = await reponse.json();
                    data.msg === "Missing Authorization Header" &&
                        alert("Debes iniciar sesión para publicar un producto");
                } catch (error) {
                    console.log("Error loading message from backend", error);
                    setStore({
                        registroProductoError: true
                    });
                }
            },

            reloadWindow: () => {
                if (
                    sessionStorage.getItem("token") &&
                    localStorage.getItem("userInfo")
                ) {
                    console.log("jojo");
                    setStore({
                        auth: true,
                        userInfo: JSON.parse(localStorage.getItem("userInfo")),
                    });
                }
            },

            // Reinicio valor errorAuth a false
            errorAuth: () => {
                setStore({
                    errorAuth: false
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
                        console.log(resp.status);
                        setStore({
                            auth: true,
                        });
                    }
                    const data = await resp.json();
                    console.log(data);
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
            //perfilArtista -- galeria
            producto_galeria: async (user_id) => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + `/api/producto?user_id=${user_id}`
                    );
                    const data = await response.json();
                    setStore({
                        artistaGaleria: data,
                    });
                } catch (error) {
                    console.log(
                        "Error loading message from /api/productosGaleria",
                        error
                    );
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

            añadirACesta: async () => {
                console.log(getStore().userInfo.user_id);
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: getStore().userInfo.user_id,
                        producto_id: getStore().productoSelect.id,
                    }),
                };
                try {
                    const resp = await fetch(
                        process.env.BACKEND_URL + "/api/cesta",
                        options
                    );
                    if (resp.status === 200) {
                        console.log("producto-añadido");
                    }
                    const data = await resp.json();
                } catch (error) {
                    console.log(error);
                }
            },

            obtenerCesta: async () => {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                try {
                    if (
                        !localStorage.getItem("cesta") ||
                        localStorage.getItem("cesta").length === 0
                    ) {
                        const resp = await fetch(
                            process.env.BACKEND_URL +
                            `/api/cesta?user_id=${getStore().userInfo.user_id}`
                        );
                        const data = await resp.json();

                        setStore({
                            productosCesta: data.result,
                        });

                        const cestaStrfy = JSON.stringify(getStore().productosCesta);
                        localStorage.setItem("cesta", cestaStrfy);
                    } else {
                        setStore({
                            productosCesta: JSON.parse(localStorage.getItem("cesta")),
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            //   Configuracion usuario
            configuracionUsuario: async (
                nombre,
                apellido,
                email,
                artista,
                nacimiento,
                descripcion,
                foto
            ) => {
                let bearer = `Bearer ${sessionStorage.getItem("token")}`;
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: bearer,
                    },
                    body: JSON.stringify({
                        id: getStore().userInfo.user_id,
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        artista: artista === "true" ? true : false,
                        nacimiento: nacimiento,
                        descripcion: descripcion,
                        foto_usuario: foto,
                    }),
                };
                try {
                    const resp = await fetch(
                        process.env.BACKEND_URL + "/api/configuracion",
                        options
                    );
                    const data = await resp.json();
                    console.log("usuarioModi", data);
                    localStorage.removeItem("userInfo");
                    setStore({
                        userInfo: data.result,
                    });
                    const userInfoStrfy = JSON.stringify(getStore().userInfo);
                    localStorage.setItem("userInfo", userInfoStrfy);
                } catch (error) {
                    console.log(error);
                }
            },
            // Pedido
            pedido: async () => {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                try {
                    const resp = await fetch(
                        process.env.BACKEND_URL +
                        `/api/pedido?user_id=${getStore().userInfo.user_id}`,
                        options
                    );
                    const data = await resp.json();

                    setStore({
                        pedido: data.result,
                    });
                    const pedidoStrfy = JSON.stringify(getStore().pedido);
                    localStorage.setItem("pedido", pedidoStrfy);
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
};
export default getState;