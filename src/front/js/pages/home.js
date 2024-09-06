import React, { useContext } from "react";
import { Context } from "../store/appContext";
import línea from "../../img/línea.png"
import yeti from "../../img/yeti.png"
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="d-flex">
			<div className="d-flex vh-100 justify-content-center align-items-center container row col-6" style={{ marginLeft: "100px" }}>
				<div>
					<h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontSize: "80px", fontWeight: "bold" }}>Sign in</h1>
					<img src={línea} style={{ zIndex: 0 }} />
					<h3 className="px-5 fw-normal">Book your material</h3>
					<h6 className="px-5 fw-light" style={{ marginTop: "80px" }}>If you do not yet have an account</h6>
					<div className="px-5">
						<button type="button" className="btn btn-primary fw-light" style={{ backgroundColor: "#4F9CF9", border: "none" }}>
							Sign up <i className="fa-solid fa-arrow-right fa-sm" />
						</button>
					</div>
				</div>
				<img src={yeti} style={{ zIndex: 0, width: "300px", bottom: "200px", left: "550px" }} className="position-absolute" />
			</div>

			<div className="container col-3 row d-flex justify-content-center align-items-center container" style={{marginLeft: "80px"}}>
				<form>
					<h2 className="fw-light mb-3">Sign in</h2>
					<div className="mb-5">
						<input type="email" className="form-control form-control-lg fw-light fs-6 input" style={{backgroundColor: "#D3E7FF"}} id="email" placeholder="Enter email" />
					</div>
					<div className="mb-3">
						<input type="password" className="form-control form-control-lg fw-light fs-6 input" style={{backgroundColor: "#D3E7FF"}} id="password" placeholder="Enter password" />
						<div id="forgotPassword" className="form-text text-end">Forgot your password?</div>
					</div>
					<button type="submit" className="btn btn-primary btn-lg fw-light mt-3 btn-login" style={{ backgroundColor: "#4F9CF9", border: "none", width: "100%" }}>Login</button>
				</form>
			</div>
		</div>
	);
};

