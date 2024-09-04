import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div class="footer container-fluid">
		<div class="row px-5 d-flex">
			// Sección de los nombres y redes sociales
			<div class="col-3 d-flex flex-column justify-content-center order-1">
				<h6><strong>Nosotros</strong></h6>
				<ul class="list-unstyled">
					<li class="d-flex align-items-center">
						<span class="name">Antonio Buigues García</span> 
						<span class="social-icons d-flex">
							<a href="#"><i class="fa-brands fa-github"></i></a>
							<a href="#"><i class="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li class="d-flex align-items-center">
						<span class="name">Christian David Villar Colodro</span>
						<span class="social-icons d-flex">
							<a href="#"><i class="fa-brands fa-github"></i></a>
							<a href="#"><i class="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li class="d-flex align-items-center">
						<span class="name">Rodolfo D’alessandro</span>
						<span class="social-icons d-flex">
							<a href="#"><i class="fa-brands fa-github"></i></a>
							<a href="#"><i class="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
					<li class="d-flex align-items-center">
						<span class="name">Silvia González Moraga</span>
						<span class="social-icons d-flex">
							<a href="#"><i class="fa-brands fa-github"></i></a>
							<a href="#"><i class="fa-brands fa-linkedin"></i></a>
						</span>
					</li>
				</ul>
			</div>
			
			// Sección del logo
			<div class="col-9 d-flex justify-content-end align-items-center order-2">
				<div class="footer-logo">
					<img src="Logo sin fondo.png" alt="ASINCRO Logo" class="img-fluid" style="max-width: 150px;"/>
				</div>
			</div>
		</div>
	</div>
	</footer>
);
