const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            registro: false,
            auth: false,
            errorAuth: false,
            artistas: [],
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
                            foto: null,
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
                    // console.log(data);
                    sessionStorage.setItem("token", data.access_token.token); // accedemos a la key acces_token de data

                    // return true; // Devuelve true para que se ejecute la acción que llamamos en Login
                } catch (error) {
                    console.log(error);
                }
            },
            // Funcion para salir de logout
            logout: () => {
                setStore({
                    auth: false
                });
            },
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
        },
    };
};

export default getState;