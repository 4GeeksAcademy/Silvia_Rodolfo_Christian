import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNavbar from "../../img/logo.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	//determina si el usuario está logueado.
	//"false" para que inicie como NO logueado
	const [isLogged, setIsLogged] = useState(false);
	const count = store.selected.length;
	const token = localStorage.getItem("jwt_token");

	//comprueba si hay token
	useEffect(() => {
		setIsLogged(!!token);
	}, [token]);

	//si está logueado cambia el estado y elimina el token, si no lo está envía a inicio para que lo haga
	const handleLogin = () => {
		if (isLogged) {
			setIsLogged(false);
			localStorage.removeItem("jwt_token");
			navigate("/");
		} else {
			navigate("/");
		}
	};

	const noCart = (description) => {
		actions.deleteSelected(description);
	};

	return (
		<nav className="navbar" style={{ backgroundColor: "#043873" }}>
			<div className="container d-flex">
				<Link to="/">
					<img src={logoNavbar} style={{ width: "200px" }} />
				</Link>
				<div className="d-flex align-items-center ms-auto gap-2">
					<button onClick={handleLogin} type="button" className="btn ms-auto" style={{ backgroundColor: "#FFE492" }}>
						{/*cambia el texto del botón según el estado*/}
						{token ? "Logout" : "Login"}
					</button>

					{token && (
						<div className="btn-group top-50 end-0 me-5" style={{ zIndex: "1" }}>
							<button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#4F9CF9" }}>
								Order
								<span className="badge" style={{ color: "black" }}>{count}</span>
							</button>

							<ul className="dropdown-menu dropdown-menu-end">
								{
									store.selected.length > 0 ? (
										store.selected.map((selected, index) => (
											<li className="dropdown-item d-flex" key={index}>
												<div className="me-auto p-2">
													{selected[0]}
												</div>
												<div className="p-2" onClick={() => noCart(selected[0])}>
													<i className="fa-solid fa-xmark" />
												</div>
											</li>
										))
									) : (
										<li className="dropdown-item">No items</li>
									)
								}
								{store.selected.length > 0 &&(
									<button type="button" className="btn btn-secondary m-2" style={{ backgroundColor: "#4F9CF9" }} onClick={() => navigate("/formPedido")}>
										Order
									</button>)
								}
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
