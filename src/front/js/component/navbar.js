import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNavbar from "../../img/logo.png";
import React, { useContext } from "react";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	//determina si el usuario está logueado.
	//"false" para que inicie como NO logueado
	const [isLogged, setIsLogged] = useState(false);

	//si está logueado cambia el estado y elimina el token, si no lo está envía a inicio para que lo haga
	const handleLogin = () => {
		if (isLogged) {
			setIsLogged(false);
			localStorage.removeItem("jwt-token");
			navigate("/");
		} else {
			navigate("/")
		}
	};

	const noCart = (name) => {
		actions.deleteItem(name);
	};

	return (
		<nav className="navbar" style={{ backgroundColor: "#043873" }}>
			<div className="container">
				<Link to="/">
					<img src={logoNavbar} />
				</Link>

				<button onClick={handleLogin} type="button" className="btn" style={{ backgroundColor: "#FFE492" }}>
					{/*cambia el texto del botón según el estado*/}
					{isLogged ? "Logout" : "Login"}
				</button>
				<div className="btn-group position-absolute top-50 end-0 translate-middle-y me-5" style={{ zIndex: "1" }}>
					<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
						Order
						<span class="badge text-bg-secondary">{count}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
						{
							store.cart.length > 0 ? (
								store.cart.map((item, index) => (
									<li className="dropdown-item d-flex" key={index}>
										<div className="p-2" onClick={() => noCart(item[0])}>
											<i className="fa-solid fa-trash" />
										</div>
									</li>
								))
							) : (
								<li className="dropdown-item">No items</li>
							)
						}
					</ul>
				</div>
			</div>
		</nav>
	);
};
