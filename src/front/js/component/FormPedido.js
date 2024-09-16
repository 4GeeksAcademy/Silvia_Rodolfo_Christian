import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; //Permite crear enlaces de navegación entre páginas.
import linea from "./../../img/linea.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCalendar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CardPedido } from "./CardPedido";




export const FormPedido = () => {
	const [search, setSearch] = useState(""); // Estado para el valor del buscador
	const [pedidos, setPedidos] = useState([]); // Estado para guardar los pedidos (búsquedas)
	const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
	const [pendingPedido, setPendingPedido] = useState(null); // Estado para el pedido pendiente
	const [currentDate, setCurrentDate] = useState(""); // Estado para guardar la fecha actual
	const navigate = useNavigate(); //Para redirigir a otras páginas
	const apiUrl = process.env.BACKEND_URL; // URL base de la API desde las variables de entorno
	const [initialDate, setInitialDate] = useState("");
	const [finalDate, setFinalDate] = useState("");
	const [quantity, setQuantity] = useState(0);
	const { detail_id } = useParams(); //Accedemos a los parámetros dinámicos de la URL como "detail_id".
	const token = localStorage.getItem("jwt_token"); //Obtiene el token de autenticación almacenado.

	const items = ["monitor", "teclado", "cable", "mouse", "camara"];

	const addForm = async (event) => {
		event.preventDefault();
		console.log("Token:", token);
		if (!token) { //Si no hay token:
		  navigate('/login'); //Redirige al usuario a la página de inicio de sesión.
		  return; //Termina la ejecución de la función fetchData si no hay un token.
		}
		if (!initialDate || !finalDate) { //Validar ambas fechas.
		  alert('Por favor selecciona ambas fechas.');
		  return;
		}
		try {
		  const response = await fetch(`${apiUrl}form`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  "Authorization": `Bearer ${token}` //Autorizamos al usuario a hacer la solicitud
			},
			body: JSON.stringify({
			  initialDate,
			  finalDate,
			  quantity
			})
		  });
		  if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		  const data = await response.json();
		  if (data.msg === "Form and details created successfully") {
			navigate('/stock'); //PREGUNTAR Y MODIFICAR(PÁGINA PRINCIPAL?)
		  } else {
			alert("Error al crear formulario")
		  }
		} catch (error) {
		  console.error("Error en la solicitud", error);
		  alert("Error al crear formulario. Inténtalo de nuevo");
		}
	  };
	  const updateForm = async () => {
		if (!token) {
		  navigate('/login');
		  return;
		}
		if (!initialDate || !finalDate) { //Validar ambas fechas.
		  alert('Por favor selecciona ambas fechas.');
		  return;
		}
		try {
		  const response = await fetch(`${apiUrl}form/${detail_id}`, {
			method: "PUT",
			headers: {
			  "Content-Type": "application/json",
			  "Authorization": `Bearer ${token}` //Autorizamos al usuario a hacer la solicitud
			},
			body: JSON.stringify({
			  initialDate,
			  finalDate,
			  quantity
			})
		  });
		  if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		  const data = await response.json();
		  if (data.msg === "DetailForm updated successfully") {
			navigate('/stock'); //PREGUNTAR Y MODIFICAR(PÁGINA PRINCIPAL?)
		  } else {
			alert("Error al actualizar formulario")
		  }
		} catch (error) {
		  console.error("Error en la solicitud", error);
		  alert("Error al actualizar el formulario. Inténtalo de nuevo");
		}
	  }

	// Función para obtener la fecha actual y formatearla a dd.mm.yyyy
	useEffect(() => {
		const today = new Date();
		const day = String(today.getDate()).padStart(2, '0');
		const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
		const year = today.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;
		setCurrentDate(formattedDate); // Guardamos la fecha formateada en el estado
	}, []);

	// Función que abre el modal
	const openModal = () => {
		setShowModal(true); // Mostrar modal
	};

	// Función que cierra el modal y añade el pedido si el usuario confirma
	const closeModal = (addPedido) => {
		setShowModal(false); // Cerrar modal
		if (addPedido && pendingPedido) {  // Añadir el pedido pendiente solo si el usuario lo confirma
			setPedidos([...pedidos, { descripcion: pendingPedido, cantidad: 1 }]); // Agregar pedido
		}
		setPendingPedido(null); // Limpiar el pedido pendiente
	};

	// Función que maneja la búsqueda y muestra el modal
	const handleSearch = (event) => {
		event.preventDefault(); // Evita el comportamiento por defecto del submit

		if (search.trim() !== "") { // Solo si hay texto en el campo de búsqueda
			setPendingPedido(search); // Guardar el pedido pendiente
			openModal(); // Mostrar modal
		}
	};

	// Función para eliminar un pedido de la lista
	const eliminarPedido = (index) => {
		// Filtrar los pedidos eliminando el que tiene el id que recibimos
		const nuevosPedidos = pedidos.filter((_, i) => i !== index);
		setPedidos(nuevosPedidos); // Actualizar el estado con la nueva lista
	};

	// Función para actualizar la cantidad de un pedido
	const actualizarCantidad = (index, nuevaCantidad) => {
		const nuevosPedidos = [...pedidos];
		nuevosPedidos[index].cantidad = nuevaCantidad; // Actualizamos la cantidad directamente
		setPedidos(nuevosPedidos); // Actualizar el estado con la nueva cantidad
	};


	// Función para el conteo de productos pedidos
	function countPedidos() {
		const totalPedidos = pedidos.reduce((total, pedido) => total + pedido.cantidad, 0);
		let maxPedidos = 5;
		let quedanTantosPedidos = maxPedidos - totalPedidos;

		if (quedanTantosPedidos === 0) {
			return <span style={{ color: "red" }}>Has alcanzado el máximo de productos por pedir.</span>;
		}
		if (quedanTantosPedidos === 1) {
			return <span style={{ color: "orange" }}>Queda 1 producto.</span>;
		}
		if (quedanTantosPedidos > 1) {
			return <span>Quedan {quedanTantosPedidos} productos.</span>;
		}
	}

	return (
		<div>
			<div className="container mt-auto p-3 d-flex flex-column min-vh-100">

				<div className="row justify-content-start text-start mb-4 col-6">
					<div className="col-12">
						<h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontSize: "80px", fontWeight: "bold" }}>Order</h1>
						<img className="mt-2" src={linea} />
					</div>
				</div>

				{/* Información de la orden */}
				<div className="row justify-content-center mb-4">
					<div className="col-md-3 text-center">
						<h6 style={{ color: "#043873" }}><strong>Order #XXXXXX</strong></h6> {/* -------------------- Conectar el número de Order con la BBDD*/}

					</div>
					<div className="col-md-3 text-center">
						<h6 style={{ color: "#043873" }}><strong>{currentDate}</strong></h6>
					</div>
					<div className="col-md-3 text-center">
						<h6 style={{ color: "#043873" }}><strong>NAME LASTNAME</strong></h6>
					</div>
				</div>
				<p style={{ color: "lightgray" }}>Recuerda que tienes un máximo de 5 productos. {countPedidos()}</p>

				{/* Barra de búsqueda */}
				<div className="row mb-4">
					{/* Input de búsqueda */}

					<div className="col-12 col-md-9">
						<form onSubmit={handleSearch}>
							<div className="input-group">
								<input
									list="item-options"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									type="search"
									className="form-control form-control-lg fw-light fs-6 input"
									style={{ backgroundColor: "#D3E7FF" }}
									id="search"
									placeholder="Search here" />

								{/* Lista de opciones */}
								<datalist id="item-options">
									{items.map((item, index) => (
										<option key={index} value={item} />
									))}
								</datalist>
								{/* Icono de búsqueda con evento onClick */}
								<button className="input-group-text" style={{ backgroundColor: "#4F9CF9", cursor: "pointer" }} onClick={handleSearch} >
									<FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#043873" }} />
								</button>
							</div>
						</form>
						{/* Modal */}
						{showModal && (
							<div className="modal fade show" style={{ display: "block" }}>
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h1 className="modal-title fs-5" id="staticBackdropLabel">Resultado de la búsqueda</h1>
											<button type="button" className="btn-close" onClick={() => closeModal(false)}></button>
										</div>
										<div className="modal-body">
											Has buscado: <strong>{pendingPedido}</strong>
											<p>¿Deseas añadir este producto a tu pedido?</p>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" onClick={() => closeModal(false)}>Cerrar</button>
											<button type="button" className="btn btn-primary" onClick={() => closeModal(true)}>Añadir a pedido</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="col-12 col-md-3 text-md-end text-center mt-3 mt-md-0">
						<button type="submit" className="btn btn-primary fw-light align-text-center" style={{ backgroundColor: "#4F9CF9", border: "none", width: "150px" }} >
							<strong>Order</strong>
						</button>
					</div>
				</div>
				{/* Lista de Artículos generados a partir de las búsquedas */}
				<div className="col-12 mb-3" >
					{pedidos.map((pedido, index) => (
						<CardPedido key={index} descripcion={pedido.descripcion} cantidad={pedido.cantidad} onDelete={() => eliminarPedido(index)}
							onCantidadChange={(nuevaCantidad) => actualizarCantidad(index, nuevaCantidad)} />
					))}
				</div>
			</div >
		</div>

	);
};