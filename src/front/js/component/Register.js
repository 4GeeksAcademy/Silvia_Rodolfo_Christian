import React, { useState } from 'react'
import linea from "../../img/linea.png"
import yeti from "../../img/yeti.png"
import { useNavigate } from 'react-router-dom';
import "../../styles/registerStyles.css";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(""); //Estado para guardar el valor del email que el usuario ingresa. setemail es la función para actualizar este valor.
    const [password, setPassword] = useState(""); //Crea un estado similar para la contraseña.
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const apiUrl = process.env.BACKEND_URL;

    const signUp = async (event) => { //Función que se ejecuta cuando el usuario envía el formulario.
        event.preventDefault(); //Evita que el formulario se envíe de manera predeterminada, lo cual recargaría la página.

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/register`, { //Envía una solicitud POST a la URL de registro de la API.
                method: "POST",
                headers: {
                    "Content-Type": "application/json" //El cuerpo de la solicitud está en formato JSON.
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });
            if (!response.ok) { //Si la respuesta de la API no es exitosa (código de estado no es 200), lanza un error.
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); //Convierte la respuesta de la API en formato JSON.

            if (data.msg === "New User Created") { //Si la respuesta indica que el usuario fue creado:
                console.log(data);

                navigate('/'); //Redirige al usuario a la página de inicio de sesión.
            } else {
                alert("Error al crear usuario"); //Si algo salió mal, muestra una alerta.
            }
        } catch (error) { //Captura y maneja cualquier error que ocurra durante el proceso.
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema al registrar. Inténtalo de nuevo."); //Si algo salió mal, muestra una alerta.
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row vh-100 align-items-center justify-content-center">
            <div className="text-center text-md-start col-12 col-md-6 d-flex flex-column justify-content-center align-items-md-start position-relative">
                <h1 className="mb-n1 px-md-5 display-4 font-weight-bold" style={{ fontSize: "80px", fontWeight: "bold" }}>Sign up</h1>
                <img src={linea} className="mt-2mx-md-5 my-2 img-fluid" style={{ zIndex: 0, maxWidth: "100%", height: "auto" }} alt="Linea decorativa" />
                <h3 className="px-md-5 fw-normal">Book your material</h3>

                {/* Imagen del yeti alineada a la derecha y más cerca */}
                <div className="yeti-img-container ">
                    <img src={yeti} style={{ zIndex: 0 }} className=" img-fluid yeti-img" alt="Yeti" />
                </div>
            </div>


            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                <form onSubmit={signUp}  className="w-100 p-4 p-md-5">
                    <h2 className="fw-light mb-4">Sign up</h2>
                    <div className="form-group mb-4">
                        <input type="text" className="form-control form-control-lg fw-light fs-6 input" style={{ backgroundColor: "#D3E7FF" }} id="firstName" placeholder="Your first name" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required />
                    </div>
                    <div className="form-group mb-4">
                        <input type="text" className="form-control form-control-lg fw-light fs-6 input" style={{ backgroundColor: "#D3E7FF" }} id="lastName" placeholder="Your lastname" value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required />
                    </div>
                    <div className="form-group mb-4">
                        <input type="email" className="form-control form-control-lg fw-light fs-6 input" style={{ backgroundColor: "#D3E7FF" }} id="email" placeholder="Your email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className="mform-group mb-4">
                        <input type="password" className="form-control form-control-lg fw-light fs-6 input" style={{ backgroundColor: "#D3E7FF" }} id="password" placeholder="Your password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <div className="form-group mb-4">
                        <input type="password" className="form-control form-control-lg fw-light fs-6 input" style={{ backgroundColor: "#D3E7FF" }} id="confirmPassword" placeholder="Confirm password" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />
                    </div>
                    <button type="submit" className="btn btn-login btn-primary btn-lg w-100 fw-light" style={{ backgroundColor: "#4F9CF9", border: "none" }}>Save</button>
                </form>
            </div>
        </div >
    );
};

export default Register;