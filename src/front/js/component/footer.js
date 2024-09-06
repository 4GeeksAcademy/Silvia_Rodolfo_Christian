import React, { Component } from "react";
import "./../../styles/footer.css";
import Logo_sin_fondo from "./../../img/Logo_sin_fondo.png";

export const Footer = () => (
	<footer className="footer mt-auto p-3">
		<div className="container px-5 d-flex flex-wrap">
			{/* Sección de los nombres y redes sociales */}
			<div className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex flex-column justify-content-center">
				<h6><strong>Nosotros</strong></h6>
				<ul className="list-unstyled">
					<li className="d-flex align-items-center">
						<span className="name">Antonio Buigues García</span> 
						<span className="social-icons d-flex">
							<a href="https://github.com/AntonioBG89" aria-label="GitHub de Antonio Buigues García" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
							<a href="http://www.linkedin.com/in/antoniobg89" aria-label="LinkedIn de Antonio Buigues García" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li className="d-flex align-items-center">
						<span className="name">Christian David Villar Colodro</span>
						<span className="social-icons d-flex">
							<a href="https://github.com/ChristianDVillar" aria-label="GitHub de Christian David Villar Colodro" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
							<a href="https://www.linkedin.com/in/christian-david-villar-colodro-5b004121/" aria-label="LinkedIn de Christian David Villar Colodro" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li className="d-flex align-items-center">
						<span className="name">Rodolfo D'alessandro</span>
						<span className="social-icons d-flex">
							<a href="https://github.com/Elroro23" aria-label="GitHub de Rodolfo D'alessandro" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
							<a href="http://www.linkedin.com/in/rodolfo-d-alessandro-13874a220" aria-label="LinkedIn de Rodolfo D'alessandro" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li className="d-flex align-items-center">
						<span className="name">Silvia González Moraga</span>
						<span className="social-icons d-flex">
							<a href="https://github.com/SilviaMoraga" aria-label="GitHub de Silvia González Moraga" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
							<a href="https://www.linkedin.com/in/silviagmoraga/" aria-label="LinkedIn de Silvia González Moraga" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
				</ul>
			</div>
			
			{/* Sección del logo */}
			<div className="col-12 col-sm-6 col-md-6 col-lg-8 d-flex justify-content-sm-end justify-content-center align-items-center">
				<div className="footer-logo">
					<img src={Logo_sin_fondo} alt="ASINCRO Logo" className="img-fluid" style={{maxWidth: "250px"}}/>
				</div>
			</div>
		</div>
	</footer>
);
