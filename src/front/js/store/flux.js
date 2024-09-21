const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			apiUrl: process.env.BACKEND_URL,
			article: [],
			usertype: [],
			selected: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			deleteSelected: (description) => {
				const store = getStore();
				setStore({ selected: store.selected.filter(selected => selected[0] !== description) });
			},
			addSelected: (elemento) => {
				const store = getStore();
				setStore({ selected: [...store.selected, elemento] });
			},
			getStock: () => {
				const store = getStore();
				const token = localStorage.getItem("jwt_token")
				fetch(`${store.apiUrl}/stock`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token //authorization token
					}
				})
					.then(response => response.json())
					.then((data) => {
						console.log(data);
						setStore({ article: data })
					})
					.catch(() => { });
			},
			getUser: async () => {
				//obtiene datos de usuario por id
				const store = getStore();
				const token = localStorage.getItem("jwt_token")
				try {
					// Petición para obtener toda la información del usuario
					const response = await fetch(`${store.apiUrl}/user`, {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token 
						}
					});

					const data = await response.json();
					
					setStore({
						usertype: data.data.usertype
					});
					
				} catch (error) {
					console.error('Error al obtener el usuario:', error);
				}
			},
			deleteArticle: (id) => {
				console.log("Intentando eliminar artículo con ID:", id);

				const store = getStore();
				const actions = getActions();
				fetch(`${store.apiUrl}/stock/${id}`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
						accept: "application/json",
					},
				})
					.then(response => {
						if (response.ok) {
							console.log("Artículo eliminado exitosamente.");
							actions.getStock(); // Actualiza la lista de artículos
						} else {
							console.error("Error al eliminar el artículo.");
						}
					})
					.catch((err) => { err })

			}
		}
	};
};

export default getState;
