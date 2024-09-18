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
			deleteSelected: (id) => {
				const store = getStore();
				setStore({ selected: store.selected.filter(selected => selected[0] !== id) });
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
			getUser: (usertype) => {
				const store = getStore();
				fetch(`${store.apiUrl}/user/${usertype}`)
					.then(response => response.json())
					.then((data) => {
						setStore({ user: data.results })
					})
					.catch(() => { });
			},
			getUserType: async () => {
				const store = getStore();
				const response = await fetch(`${store.apiUrl}/stock`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				setStore({ usertype: data.usertype });
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

			},
			/*getArticle: (id) => {
				const store = getStore();
				fetch(store.apiUrl + "/stock/" + id)
					.then(response => response.json())
					.then(data => {
						console.log(data);
						data.stock.forEach((objeto) => {
							if (objeto.id == idContact) {
								document.getElementById("name").value = objeto.name;
								document.getElementById("phone").value = objeto.phone;
								document.getElementById("email").value = objeto.email;
								document.getElementById("address").value = objeto.address;
							}
						});
					})
					.catch((err) => { err })
			},*/
		}
	};
};

export default getState;
