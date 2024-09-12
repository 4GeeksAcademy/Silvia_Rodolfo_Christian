import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para la navegación
import linea from "../../img/linea.png"
import yeti from "../../img/yeti.png"
const ForgotPassword = () => {
    const [email, setEmail] = useState(""); // Estado para el email del usuario
    const [message, setMessage] = useState(""); // Estado para mensajes de éxito o error
    const navigate = useNavigate();
    const apiUrl = process.env.BACKEND_URL; // URL del backend

    const handleForgotPassword = async (event) => {
        event.preventDefault(); // Prevenir comportamiento por defecto del formulario

        try {
            const response = await fetch(`${apiUrl}/forgot-password`, { // Ruta para restablecer contraseña
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Respuesta de la API

            if (data.msg === "Reset link sent") {
                setMessage("A reset password link has been sent to your email.");
                setTimeout(() => {
                    navigate("/login"); // Redirigir a la página de inicio de sesión después de un tiempo
                }, 3000);
            } else {
                setMessage("Error: Could not send reset link.");
            }
        } catch (error) {
            console.error("Error in request:", error);
            setMessage("There was a problem sending the reset link. Please try again.");
        }
    };

    return (
        <div className="d-flex">
            <div className="d-flex vh-100 justify-content-center align-items-center container row col-6" style={{ marginLeft: "100px" }}>
                <div>
                    <h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontSize: "80px", fontWeight: "bold" }}>Forgot Password</h1>
                    <img src={linea} style={{ zIndex: 0 }} />
                    <h3 className="px-5 fw-normal">Enter your email to reset your password</h3>
                </div>
                <img src={yeti} style={{ zIndex: 0, width: "300px", bottom: "200px", left: "550px" }} className="position-absolute" />
            </div>

            <div className="container col-3 row d-flex justify-content-center align-items-center" style={{ marginLeft: "80px" }}>
                <form onSubmit={handleForgotPassword}>
                    <h2 className="fw-light mb-3">Reset Password</h2>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control form-control-lg fw-light fs-6 input"
                            style={{ backgroundColor: "#D3E7FF" }}
                            id="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {message && <div className="mb-3 alert alert-info">{message}</div>}
                    <button type="submit" className="btn btn-primary btn-lg fw-light mt-3 btn-login" style={{ backgroundColor: "#4F9CF9", border: "none", width: "100%" }}>
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
