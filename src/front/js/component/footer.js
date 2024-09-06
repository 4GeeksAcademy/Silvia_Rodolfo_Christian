import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="footer container-fluid">
		<div className="row px-5 d-flex">
			// Sección de los nombres y redes sociales
			<div className="col-3 d-flex flex-column justify-content-center order-1">
				<h6><strong>Nosotros</strong></h6>
				<ul className="list-unstyled">
					<li className="d-flex align-items-center">
						<span className="name">Antonio Buigues García</span> 
						<span className="social-icons d-flex">
							<a href="#"><i className="fa-brands fa-github"></i></a>
							<a href="#"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li className="d-flex align-items-center">
						<span className="name">Christian David Villar Colodro</span>
						<span className="social-icons d-flex">
							<a href="#"><i className="fa-brands fa-github"></i></a>
							<a href="#"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li className="d-flex align-items-center">
						<span className="name">Rodolfo D’alessandro</span>
						<span className="social-icons d-flex">
							<a href="#"><i className="fa-brands fa-github"></i></a>
							<a href="#"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li className="d-flex align-items-center">
						<span className="name">Silvia González Moraga</span>
						<span className="social-icons d-flex">
							<a href="#"><i className="fa-brands fa-github"></i></a>
							<a href="#"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
				</ul>
			</div>
			
			// Sección del logo
			<div className="col-9 d-flex justify-content-end align-items-center order-2">
				<div className="footer-logo">
					<img src="Logo sin fondo.png" alt="ASINCRO Logo" className="img-fluid" style="max-width: 150px;"/>
				</div>
			</div>
		</div>
	</div>
	</footer>
);
