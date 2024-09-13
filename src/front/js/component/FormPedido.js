import React, { Component, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; //Permite crear enlaces de navegación entre páginas.
import linea from "./../../img/linea.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCalendar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CardPedido } from "./CardPedido";




export const FormPedido = () => {
	const [search, setSearch] = useState(""); // Estado para el valor del buscador
	const [pedidos, setPedidos] = useState([]); // Estado para guardar los pedidos (búsquedas)
	const navigate = useNavigate(); //Para redirigir a otras páginas
	const apiUrl = process.env.BACKEND_URL; // URL base de la API desde las variables de entorno

	// Función que agrega la búsqueda a la lista de pedidos
	const handleSearch = (event) => {
		event.preventDefault(); // Evita el comportamiento por defecto
		if (search.trim() !== "") { // Solo agrega si el campo de búsqueda no está vacío
			setPedidos([...pedidos, search]); // Agrega el valor de búsqueda al array de pedidos
			setSearch(""); // Limpia el campo de búsqueda después de agregarlo
		}
	};

	function countPedidos(){
		let maxPedidos = 5;
		let quedanTantosPedidos = maxPedidos - pedidos.length;
		if (quedanTantosPedidos === 0) return <span style={{color: "red"}}>Has alcanzado el máximo de productos por pedir.</span>;
		if (quedanTantosPedidos === 1) return <span style={{color: "orange"}}>Queda 1 producto.</span>;
		if (quedanTantosPedidos > 1) return <span>Quedan {quedanTantosPedidos} productos.</span>;
	};

	/* const handleOrder = (event) => {
		
	} */

	return (
		<div>
			<div className="container mt-auto p-3 d-flex flex-column min-vh-100">

				<div className="align-items-center row col-6" style={{ marginLeft: "100px" }}>

					<h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontSize: "80px", fontWeight: "bold" }}>Order</h1>
					<img className="mt-2" src={linea} />
					<h3 className="px-5 fw-normal">Book your material</h3>
				</div>

				{/* Información de la orden */}
				<div className="row align-items-center mt-4 mb-4 col-12 col-sm-10">
					<div className="col-3">
						<h6 style={{ color: "#043873" }}><strong>Order #XXXXXX</strong></h6>

					</div>
					<div className="col-3 text-center">
						<h6 style={{ color: "#043873" }}><strong>DATE</strong></h6>
					</div>
					<div className="col-2 text-end">
						<h6 style={{ color: "#043873" }}><strong>NAME LASTNAME</strong></h6>
					</div>
				</div>
				<p style={{ color: "lightgray" }}>Recuerda que tienes un máximo de 5 productos. {countPedidos()}</p>

				{/* Barra de búsqueda */}
				<div className="row mb-3">

					<div className="col-10">
						<form onSubmit={handleSearch}>
							<div className="input-group">
								<input
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									type="search"
									className="form-control form-control-lg fw-light fs-6 input"
									style={{ backgroundColor: "#D3E7FF" }}
									id="search"
									placeholder="Search here" />
									{/* Icono de búsqueda con evento onClick */}
								<span className="input-group-text" style={{ backgroundColor: "#D3E7FF", cursor: "pointer" }} onClick={handleSearch} >
									<FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#043873" }} />
								</span>
							</div>
						</form>
					</div>

					<div className="col-2 text-end m-auto">
						<button type="submit" className="btn btn-primary fw-light align-text-center" style={{ backgroundColor: "#4F9CF9", border: "none", width: "150px" }} >
							<strong>Order</strong>
						</button>
					</div>
				</div>
				{/* Lista de Artículos generados a partir de las búsquedas */}
				<div>
          {pedidos.map((pedido, index) => (
            <CardPedido key={index} descripcion={pedido} />
          ))}
        </div>
			</div >
		</div>

	);
};