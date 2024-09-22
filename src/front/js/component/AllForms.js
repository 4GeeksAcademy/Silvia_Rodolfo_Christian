import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import linea from "./../../img/linea.png";

const AllForms = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // Estado para el valor del buscador.
  const [errorMessage, setErrorMessage] = useState("");
  const [forms, setForms] = useState([]);

  const token = localStorage.getItem("jwt_token"); // Obtiene el token de autenticación almacenado.
  const apiUrl = process.env.BACKEND_URL;  // Asegúrate de usar REACT_APP_BACKEND_URL

  const getFormByEmail = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      console.log(`Enviando solicitud a: ${apiUrl}/all_forms?email=${search}`);
      const response = await fetch(`${apiUrl}/all_forms?email=${search}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`¡Error HTTP! Estado: ${response.status}`);
      }
      const data = await response.json();
      if (data.data.length === 0) {
        setErrorMessage(`No se encontraron formularios asociados a este email: ${search}`);
      } else {
        setForms(data.data); // Actualiza el estado con los formularios obtenidos
        setErrorMessage(""); // Limpia el mensaje de error si se encuentran formularios
      }
      console.log(data);
    } catch (error) {
      console.error("Error al obtener los formularios", error);
      alert("Error al obtener los formularios");
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
          <div className='align center'>
            <p style={{ color: "lightgray" }}>Search for forms by the user's email</p>

            <form onSubmit={handleSubmit}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                className="form-control form-control-lg fw-light fs-6 input"
                style={{ backgroundColor: "#D3E7FF" }}
                id="search"
                placeholder="User's email here"
              />
            </form>
          </div>
          {/* Renderizar los formularios */}
          <div className="mt-4">
            {errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul>
                {forms.map((form) => (
                  <li key={form.id}></li> // Ajusta según la estructura de tus datos
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>

  );


};

export default AllForms;
