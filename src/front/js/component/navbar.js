import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNavbar from "../../img/logo.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [isLogged, setIsLogged] = useState(false);
	const count = store.selected.length;
	const token = localStorage.getItem("jwt_token");

	// Verificar si el usuario está logueado
	useEffect(() => {
		setIsLogged(!!token);
	}, [token]);

	// Obtener las iniciales del usuario
	const getUserInitials = () => {
		if (store.user && store.user.firstName && store.user.lastName) {
			const firstNameInitial = store.user.firstName.charAt(0).toUpperCase();
			const lastNameInitial = store.user.lastName.charAt(0).toUpperCase();
			const initials = `${firstNameInitial}${lastNameInitial}`;

			console.log("Initials of the user:", initials); // Imprimir las iniciales en la consola
			return initials;
		}
		console.log("User data is missing or incomplete."); // Si no hay datos del usuario
		return '';
	};

	// Manejar Login/Logout
	const handleLogin = () => {
		if (isLogged) {
			setIsLogged(false);
			localStorage.removeItem("jwt_token");
			navigate("/"); // Redirigir al inicio después del logout
		} else {
			navigate("/"); // Redirigir al inicio si no está logueado
		}
	};

	// Eliminar elemento del carrito
	const noCart = (id) => {
		actions.deleteSelected(id);
	};

	return (
		<nav className="navbar" style={{ backgroundColor: "#043873" }}>
			<div className="container d-flex">
				<Link to="/">
					<img src={logoNavbar} style={{ width: "200px" }} alt="Logo" />
				</Link>
				<div className="d-flex align-items-center ms-auto gap-2">
					{/* Mostrar las iniciales del usuario en un círculo si está logueado */}
					{token && store.user && store.user.firstName && store.user.lastName ? (
						<div className="d-flex align-items-center">
							<div
								style={{
									backgroundColor: "#4F9CF9",
									color: "#fff",
									borderRadius: "50%",
									width: "40px",
									height: "40px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize: "16px",
									fontWeight: "bold",
									marginRight: "10px"
								}}
							>
								{getUserInitials()}
							</div>

							<div className="btn-group">
								<button
									type="button"
									className="btn dropdown-toggle"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									style={{ backgroundColor: "#4F9CF9", color: "#fff" }}
								>
									Perfil
								</button>
								<ul className="dropdown-menu dropdown-menu-end">
									<li>
										<Link className="dropdown-item" to="/changepasswordlogged">
											Change Password
										</Link>
									</li>
									<li>
										<button className="dropdown-item" onClick={handleLogin}>
											Logout
										</button>
									</li>
								</ul>
							</div>
						</div>
					) : (
						<span>User data is missing or incomplete</span>
					)}

					{/* Botón de Login/Logout */}
					{!token && (
						<button onClick={handleLogin} type="button" className="btn ms-auto" style={{ backgroundColor: "#FFE492" }}>
							{token ? "Logout" : "Login"}
						</button>
					)}

					{/* Carrito de compras */}
					{token && (
						<div className="btn-group top-50 end-0 me-5" style={{ zIndex: "1" }}>
							<button
								type="button"
								className="btn dropdown-toggle"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								style={{ backgroundColor: "#4F9CF9" }}
							>
								Order
								<span className="badge" style={{ color: "black" }}>{count}</span>
							</button>

							<ul className="dropdown-menu dropdown-menu-end">
								{store.selected.length > 0 ? (
									store.selected.map((selected, index) => (
										<li className="dropdown-item d-flex" key={index}>
											<div className="me-auto p-2">
												{selected[0]}
											</div>
											<div className="p-2" onClick={() => noCart(selected[0])}>
												<i className="fa-solid fa-trash" />
											</div>
											<div>
												<button
													type="button"
													className="btn btn-secondary m-2"
													style={{ backgroundColor: "#4F9CF9" }}
													onClick={() => navigate("/formPedido")}
												>
													Order
												</button>
											</div>
										</li>
									))
								) : (
									<li className="dropdown-item">No items</li>
								)}
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
