const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            registro: false,
            registroProducto: false,
            auth: false,
            errorAuth: false,
            artistas: [],
            productos: [],
            productoSelect: {},
            userInfo: {},
            productosCesta: [],
        },
        actions: {
            // Registro
            registro: (nombre, apellidos, email, password, artista) => {
                try {
                    // fetching data from the backend
                    fetch(process.env.BACKEND_URL + "/api/registration", {
                        method: "POST",
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
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((response) => {
                        if (response.status === 200) {
                            setStore({
                                registro: true,
                            });
                        }
                        response.json();
                        setStore({
                            registro: false,
                        });
                    });
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            // Registro de producto
            registroProducto: (
                nombre,
                tecnica,
                precio,
                imagenSelect,
                descripcion
            ) => {
                console.log(getStore().userInfo);
                try {
                    // fetching data from the backend
                    fetch(process.env.BACKEND_URL + "/api/producto", {
                        method: "POST",
                        body: JSON.stringify({
                            nombre: nombre,
                            tecnica: tecnica,
                            precio: precio,
                            foto_producto: imagenSelect,
                            descripcion: descripcion,
                            vendedor_user_id: userInfo.user_id,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((response) => {
                        if (response.status === 200) {
                            setStore({
                                registroProducto: true,
                            });
                        }
                        response.json();
                        setStore({
                            registroProducto: false,
                        });
                    });
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
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
                    if (
                        !localStorage.getItem("productSelect") ||
                        Object.keys(localStorage.getItem("productSelect")).length === 0
                    ) {
                        const resp = await fetch(
                            process.env.BACKEND_URL + "/api/login",
                            options
                        );
                        if (resp.status === 200) {
                            setStore({
                                auth: true,
                            });
                        } else {
                            setStore({
                                errorAuth: true,
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
                    } else {
                        setStore({
                            userInfo: JSON.parse(localStorage.getItem("userInfo")),
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // logoutButtonNavbar
            logout: () => {
                setStore({
                    auth: false,
                    userInfo: {},
                });
                sessionStorage.removeItem("token");
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
                        process.env.BACKEND_URL + "/api/producto",
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
                tecnica,
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
                            tecnica: tecnica,
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
                    console.log("prprprselect");
                }
            },

            añadirACesta: async () => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: getStore().userInfo.user_id,
                        producto_id: getStore().productoSelect.id,
                        peticion: "post_cesta",
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
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_user: getStore().userInfo.user_id,
                        peticion: "get_cesta",
                    }),
                };
                try {
                    if (
                        !localStorage.getItem("cesta") ||
                        localStorage.getItem("cesta").length === 0
                    ) {
                        const resp = await fetch(
                            process.env.BACKEND_URL + "/api/cesta",
                            options
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
        },
    };
};
export default getState;