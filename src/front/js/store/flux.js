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
            productoSelect: [/* {
                img: "https://picsum.photos/id/1027/200",
                nombreArtista: "Erika Hanns",
                tituloObra: "Autorretrato",
                precio: 250,
                id: 1,
            }, {
                img: "https://picsum.photos/id/1027/200",
                nombreArtista: "John Hanns",
                tituloObra: "Autorretrata",
                precio: 300,
                id: 2,
            }, {
                img: "https://picsum.photos/id/1027/200",
                nombreArtista: "Helen Hanns",
                tituloObra: "Autorretratx",
                precio: 300,
                id: 3,
            }, {
                img: "https://picsum.photos/id/1027/200",
                nombreArtista: "James Hanns",
                tituloObra: "Autorretrat",
                precio: 300,
                id: 4,
            } */],

            userInfo: {},
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
            registroProducto: (nombre,
                tecnica,
                precio,
                imagenSelect,
                descripcion) => {

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
                            vendedor_user_id: userInfo.user_id
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
                        userInfo: data.user_info
                    });
                    // return true; // Devuelve true para que se ejecute la acción que llamamos en Login
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
                    if (resp.status === 200) {
                        console.log("hola");
                    }
                    const data = await resp.json();
                    console.log(data, "data");
                    setStore({
                        productos: data,
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            // ProductSelect
            productoSelect: (img, nombreArtista, precio, id) => {
                setStore({
                    productoSelect: {
                        img: img,
                        nombreArtista: nombreArtista,
                        precio: precio,
                        id: id,
                    },
                });
            },
        },
    };
};
export default getState;