import React, { Component, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; //Permite crear enlaces de navegación entre páginas.
import linea from "../../img/linea.png"

export const FormPedido = () => {
	const [search, setSearch] = useState(""); //Estado para guardar el valor del buscador. setSearch es la función para actualizar este valor.
	const [password, setPassword] = useState(""); //Crea un estado similar para la contraseña.
	const navigate = useNavigate(); //Crea una función que se puede usar para redirigir a otras páginas.
	const apiUrl = process.env.BACKEND_URL; //Obtiene la URL base de la API desde las variables de entorno.

	const handleSubmit = async (event) => { //Función que se ejecuta cuando el usuario envía el formulario.
		event.preventDefault(); //Evita que el formulario se envíe de manera predeterminada, lo cual recargaría la página.

		try {
			const response = await fetch(`${apiUrl}login`, { //Envía una solicitud POST a la URL de inicio de sesión de la API.
				method: "POST",
				headers: {
					"Content-Type": "application/json" //El cuerpo de la solicitud está en formato JSON.

				},
				body: JSON.stringify({ //El cuerpo de la solicitud contiene el email y la contraseña convertidos a JSON.
					email,
					password
				})
			});

			if (!response.ok) { //Si la respuesta de la API no es exitosa (código de estado no es 200), lanza un error.
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json(); //Convierte la respuesta de la API en formato JSON.

			if (data.jwt_token) { //Si jwt_token existe:
				localStorage.setItem("jwt_token", data.jwt_token); //Guarda el token JWT en el almacenamiento local del navegador.
				navigate('/demo'); //HAY QUE MODIFICAR!
			} else {
				alert('Error de autenticación'); //Muestra un mensaje si hay un problema con el inicio de sesión.
			}
		} catch (error) {
			console.error('Error en la solicitud:', error); //Captura errores y muestra un mensaje si algo sale mal.
			alert('Usuario no registrado');
		}
	};
	return (
	<div className="flex-grow-1 py-4">
		<div className="d-flex flex-column min-vh-100">
			<div className="d-flex justify-content-center align-items-center container row col-6" style={{ marginLeft: "100px" }}>
				<div>
					<h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontSize: "80px", fontWeight: "bold" }}>Order</h1>
					<img src={línea} style={{ zIndex: 0 }} />
					<h3 className="px-5 fw-normal">Book your material</h3>
					<p style={{color: "lightgray"}}>Recuerda que tienes un máximo de 5 productos</p>
					
					<form onSubmit={handleSubmit}>
						<input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className="form-control form-control-lg fw-light fs-6 input" style={{ backgroundColor: "#D3E7FF" }} id="search" placeholder="Search here" />
					</form>
					<div className="px-5">
						<button type="button" className="btn btn-primary fw-light" style={{ backgroundColor: "#4F9CF9", border: "none" }}>
							Order
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	);
};
