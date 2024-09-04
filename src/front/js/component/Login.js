import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${apiUrl}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.jwt_token) {
                localStorage.setItem("jwt_token", data.jwt_token);
                navigate('/private');
            } else {
                alert('Error de autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Usuario no registrado');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                />
            </label>
            <label>Contraseña:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />
            </label>
            <Link to="/signup">Click para Registrate
                <button type="submit" className="btn btn-outline-primary">Register</button>
            </Link>
        </form>
    )
}

export default Singup