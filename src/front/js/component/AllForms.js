import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import linea from "./../../img/linea.png";
import "../../styles/AllForms.css";

const AllForms = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Estado para el valor del buscador.
  const [errorMessage, setErrorMessage] = useState("");
  const [forms, setForms] = useState([]);

  const token = localStorage.getItem("jwt_token"); // Obtiene el token de autenticación almacenado.
  const apiUrl = process.env.BACKEND_URL;

  const getFormByEmail = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/all_forms?email=${email}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`¡Error HTTP! Estado: ${response.status}`);
      }
      const data = await response.json();
      if (data.data.length === 0) {
        setErrorMessage(`No se encontraron formularios asociados a este email: ${email}`);
      } else {
        setForms(data.data); // Actualiza el estado con los formularios obtenidos
        setErrorMessage(""); // Limpia el mensaje de error si se encuentran formularios
      }
    } catch (error) {
      console.error("Error al obtener los formularios", error);
      alert("Error al obtener los formularios/Usuario no registrado!");
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    getFormByEmail();
  };

  return (
    <div>
      <div className="container mt-auto p-3 d-flex flex-column min-vh-100">
        <div className="row justify-content-start text-start mb-4 col-6">
          <div className="col-12">
            <h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontSize: "80px", fontWeight: "bold" }}>User's Forms</h1>
            <img src={linea} style={{ zIndex: 0 }} alt="linea" />
          </div>
        </div>
        <div className='align center'>
          <p style={{ color: "lightgray", marginBottom: "5px" }}>Search for forms by the user's email</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control form-control-lg fw-light fs-6 input"
            style={{ backgroundColor: "#D3E7FF" }}
            id="search"
            placeholder="User's email here"
          />
        </form>
        {/* Renderizar los formularios */}
        <div className="mt-4">
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul className="no-bullets">
              {forms.map((form) => (
                <li className="list d-flex justify-content-between" style={{ backgroundColor: "#FFE492" }} key={form.id}>

                  <p className="data"><strong>Form ID:</strong> {form.id}</p>
                  <p className="data"><strong>Date:</strong> {form.date}</p>
                  <p className="data"><strong>User name:</strong> {form.user_name}</p>
                  <p className="data"><strong>User lastName:</strong> {form.user_last_name}</p>

                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );


};

export default AllForms;
